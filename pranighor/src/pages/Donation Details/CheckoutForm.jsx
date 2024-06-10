import { toast } from "@/components/ui/use-toast";
import UseAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

const CheckoutForm = ({ donationAmount, campaignId }) => {
    const stripe = useStripe()
    const elements = useElements()
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const [transactionId, setTransactionId] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const handlePayment = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email,
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log("error");
        }
        else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                const newTransaction = {
                    campaignId: campaignId,
                    donorName: user?.displayName,
                    donorEmail: user?.email,
                    donationAmount: parseInt(paymentIntent.amount / 100),
                    transactionId: paymentIntent.id,
                }
                axiosSecure.post(`donations?email=${user?.email}`, newTransaction)
                    .then(() => toast({
                        title: "Success!",
                        description: "Donation Successful!!",
                    }))
                    .catch(() => toast({
                        title: "Error!",
                        description: "Something went wrong!!",
                    }))
            }
        }

    }
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: donationAmount })
            .then(res => setClientSecret(res.data.clientSecret))
    }, [axiosSecure, donationAmount])

    return (
        <div className="space-y-6">
            <form onSubmit={handlePayment}>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button type="submit" className="btn bg-primaryCol p-4 rounded-xl w-full mt-6" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;