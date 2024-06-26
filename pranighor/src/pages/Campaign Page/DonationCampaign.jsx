import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TiMediaFastForwardOutline, TiMediaRewindOutline } from "react-icons/ti";
import { TbColumns2, TbColumns3 } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import { Helmet } from "react-helmet";
const DonationCampaign = () => {
    const axiosPublic = useAxiosPublic()
    // const { data: campaigns, isPending, isLoading, error } = useQuery({
    //     queryKey: ['allCampaign'],
    //     queryFn: async () => await axiosPublic.get('campaigns').then((res) => {
    //         return res.data
    //     })
    // })
    const [campaigns, setCampaigns] = useState([])
    const [hasMore, setHasMore] = useState([])
    const [page, setPage] = useState(0)
    const elementRef = useRef(null)
    const onIntersection = (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting && hasMore) {
            fetchMoreItems()
        }
    }
    const fetchMoreItems = async () => {
        const response = await axiosPublic.get(`campaigns?limit=3&skip=${page * 3}`)
        const data = await response.data
        if (data.length === 0) {
            setHasMore(false)
        }
        else {
            setCampaigns(prevCampaign => {
                const mergedData = [...prevCampaign, ...data]
                return mergedData
            })
        }
        setPage(prevPage => prevPage + 1)
    }
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersection)
        if (observer && elementRef.current) {
            observer.observe(elementRef.current)
        }
        return () => {
            if (observer) {
                observer.disconnect()
            }
        }
    }, [campaigns])


    return (
        <div className="space-y-16">
            <Helmet>
                <title>Pranighor | Campaigns</title>
            </Helmet>
            <div className="h-96 w-full relative rounded-xl">
                <img className="h-full w-full object-cover rounded-xl" src="header1.jpg" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent rounded-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold">Donation campaigns</h1>
                </div>
            </div>
            <div className="flex w-full gap-4 justify-end">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest"><div className="inline-flex gap-2 items-center"><TiMediaFastForwardOutline /> Newest</div></SelectItem>
                        <SelectItem value="oldest"><div className="inline-flex gap-2 items-center"><TiMediaRewindOutline /> Oldest</div></SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Layout" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2"><div className="inline-flex gap-2 items-center"><TbColumns2 /> 2 Columns</div></SelectItem>
                        <SelectItem value="3"><div className="inline-flex gap-2 items-center"><TbColumns3 /> 3 Columns</div></SelectItem>
                        <SelectItem value="4"><div className="inline-flex gap-2 items-center"><TbColumns2 /> 4 Columns</div></SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {
                        campaigns?.map(campaign => (
                            <>
                                <Card>
                                    <CardHeader>
                                        <div className="space-y-4">
                                            <img className="rounded-xl h-52 w-full object-cover" src={campaign?.campaignImage} alt={campaign?.campaignName} />
                                            <div className="flex justify-between items-center w-full">
                                                <div className="space-y-4 w-full">
                                                    <div className="flex justify-between items-center w-full">
                                                        <div>
                                                            <CardTitle>{campaign?.campaignName}</CardTitle> {/* Pet Name */}
                                                        </div>
                                                        <div className="hover:cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                <path d="M17.3651 3.84166C16.9395 3.41583 16.4342 3.07803 15.8779 2.84757C15.3217 2.6171 14.7255 2.49847 14.1235 2.49847C13.5214 2.49847 12.9252 2.6171 12.369 2.84757C11.8128 3.07803 11.3074 3.41583 10.8818 3.84166L9.99847 4.725L9.11514 3.84166C8.25539 2.98192 7.08933 2.49892 5.87347 2.49892C4.65761 2.49892 3.49155 2.98192 2.6318 3.84166C1.77206 4.70141 1.28906 5.86747 1.28906 7.08333C1.28906 8.29919 1.77206 9.46525 2.6318 10.325L3.51514 11.2083L9.99847 17.6917L16.4818 11.2083L17.3651 10.325C17.791 9.89937 18.1288 9.39401 18.3592 8.83779C18.5897 8.28158 18.7083 7.6854 18.7083 7.08333C18.7083 6.48126 18.5897 5.88508 18.3592 5.32887C18.1288 4.77265 17.791 4.26729 17.3651 3.84166Z" stroke="#FD7E14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <CardDescription>Maximum Donation: ${campaign?.maxDonation}</CardDescription> {/* Maximum Donation Amount */}
                                                    <CardDescription>Donated Amount: ${campaign?.raisedMoney}</CardDescription> {/* Donated Amount */}
                                                </div>
                                            </div>
                                            <div>
                                                <Link to={`/campaign-details/${campaign?._id}`}>
                                                    <Button className="w-full dark:bg-black dark:text-white">View Details</Button>
                                                </Link>
                                            </div>
                                        </div>

                                    </CardHeader>
                                </Card>
                            </>
                        ))
                    }
                    {
                        hasMore &&
                        <>
                            <div ref={elementRef}>
                                <div>
                                    <div className="flex flex-col space-y-3">
                                        <Skeleton className="h-full w-full rounded-xl" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-52 w-full" />
                                            <Skeleton className="h-6 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-12 w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div ref={elementRef}>
                                <div>
                                    <SkeletonCard className="rounded-full" />
                                </div>
                            </div>
                            <div ref={elementRef}>
                                <div>
                                    <SkeletonCard className="rounded-full" />
                                </div>
                            </div>
                        </>
                    }

                </div>
            </div>
        </div>
    );
};

export default DonationCampaign;