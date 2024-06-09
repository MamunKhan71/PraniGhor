
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BsStripe } from "react-icons/bs";
export default function PaymentCard() {
    return (
        
        <Card className="w-full p-4">
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                        id="card-number"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        pattern="d{4} d{4} d{4} d{4}"
                        required
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expiration">Expiration Date</Label>
                        <div className="flex gap-2">
                            <Select id="expiration-month">
                                <SelectTrigger>
                                    <SelectValue placeholder="MM" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                                        <SelectItem key={month} value={month.toString().padStart(2, "0")}>
                                            {month.toString().padStart(2, "0")}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select id="expiration-year">
                                <SelectTrigger>
                                    <SelectValue placeholder="YY" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Array.from({ length: 10 }, (_, i) => i + 2023).map((year) => (
                                        <SelectItem key={year} value={year.toString().slice(2)}>
                                            {year.toString().slice(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" type="text" placeholder="123" pattern="d{3}" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="zip-code">Zip Code</Label>
                    <Input id="zip-code" type="text" placeholder="12345" pattern="d{5}" required />
                </div>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full inline-flex gap-2 items-center">
                    <BsStripe />Pay Now
                </Button>
            </CardFooter>
        </Card>
    )
}