import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { IoFilter } from "react-icons/io5";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import FilterSection from "./FilterSection";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SkeletonCard } from "@/components/ui/skeleton-card";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import ReactSearchBox from "react-search-box";
import { useEffect, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
const AllPets = () => {
    const axiosPublic = useAxiosPublic()
    const [search, setSearch] = useState([])
    const [filteredSearch, setFilteredSearch] = useState([])
    const { isPending, error, data: pets } = useQuery({
        queryKey: ['petData'],
        queryFn: () =>
            axiosPublic.get('pets').then((res) => { return res.data })
    })
    useEffect(() => {
        const dataArray = pets?.map(item => ({
            key: item.name,
            value: item.name
        }))
        setSearch(dataArray)
        setFilteredSearch(pets)
    }, [pets])
    const handleSearch = data => {
        const filteredData = pets.filter(pet => pet.name === data)
        setFilteredSearch(filteredData);
    }
    return (
        <div className="w-full space-y-4">
            <div className="bg-primary h-48 rounded-lg flex flex-col items-center justify-center">
                <h1 className="text-5xl text-white font-bold text-center">Available Pets</h1>
                <p className=" text-gray-400 text-center">Browse the list of available pets</p>
            </div>
            <div className="mx-auto space-y-4 h-24">
                <div className="flex relative items-center justify-end gap-4 w-full">
                    <div className="w-1/2 mx-auto relative">
                        <div className="absolute z-30 w-full">
                            <ReactSearchBox
                                placeholder="Search"
                                data={search}
                                autoFocus={true}
                                clearOnSelect={true}
                                onSelect={(record) => handleSearch(record.item.value)}
                            />
                        </div>
                    </div>
                    <div className="absolute right-52 z-40 top-1/2">
                        <Button onClick={() => setFilteredSearch(pets)} className="inline-flex gap-2 items-center"><GrPowerReset />Reset</Button>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-end">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Date</SelectItem>
                        <SelectItem value="dark">Popularity</SelectItem>
                        <SelectItem value="system">Price</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex gap-8 font-primary">
                <div className="basis-1/5 w-full">
                    <FilterSection />
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-3 gap-4">
                        {
                            isPending ?
                                <>
                                    <SkeletonCard className="rounded-full" />
                                    <SkeletonCard className="rounded-full" />
                                    <SkeletonCard className="rounded-full" />
                                    <SkeletonCard className="rounded-full" />
                                    <SkeletonCard className="rounded-full" />
                                    <SkeletonCard className="rounded-full" />
                                </>
                                :
                                <>
                                    {
                                        filteredSearch ? filteredSearch.map(pet => (
                                            <>
                                                <Card>
                                                    <CardHeader>
                                                        <div className="space-y-4">
                                                            <img className="rounded-xl h-52 w-full object-cover" src={pet.image} alt="" />
                                                            <div className="flex justify-between items-center w-full">
                                                                <div className="space-y-4 w-full">
                                                                    <div className="flex justify-between items-center w-full">
                                                                        <div>
                                                                            <CardTitle>{pet.name}</CardTitle>
                                                                        </div>
                                                                        <div className="hover:cursor-pointer flex items-center gap-2">
                                                                            <span className="text-[#FD7E14]">{pet.interactionCount}</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                                <path d="M17.3651 3.84166C16.9395 3.41583 16.4342 3.07803 15.8779 2.84757C15.3217 2.6171 14.7255 2.49847 14.1235 2.49847C13.5214 2.49847 12.9252 2.6171 12.369 2.84757C11.8128 3.07803 11.3074 3.41583 10.8818 3.84166L9.99847 4.725L9.11514 3.84166C8.25539 2.98192 7.08933 2.49892 5.87347 2.49892C4.65761 2.49892 3.49155 2.98192 2.6318 3.84166C1.77206 4.70141 1.28906 5.86747 1.28906 7.08333C1.28906 8.29919 1.77206 9.46525 2.6318 10.325L3.51514 11.2083L9.99847 17.6917L16.4818 11.2083L17.3651 10.325C17.791 9.89937 18.1288 9.39401 18.3592 8.83779C18.5897 8.28158 18.7083 7.6854 18.7083 7.08333C18.7083 6.48126 18.5897 5.88508 18.3592 5.32887C18.1288 4.77265 17.791 4.26729 17.3651 3.84166Z" stroke="#FD7E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <CardDescription>{pet.shortDescription}</CardDescription>
                                                                    <CardDescription className="text-sm text-gray-600">Age: {pet.age}</CardDescription>
                                                                    <CardDescription className="text-sm text-gray-600">Location: {pet.location}</CardDescription>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Link to={'/details'}><Button className="w-full">View Details</Button></Link>
                                                    </CardHeader>
                                                </Card>
                                            </>
                                        )) :
                                            <><h1>No Search Result...</h1></>
                                    }
                                </>
                        }

                    </div>
                </div>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default AllPets;