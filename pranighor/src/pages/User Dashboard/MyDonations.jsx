import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import UseAuth from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import useAxiosSecure from "@/hooks/useAxiosSecure";

const MyDonations = () => {

    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { data: myDonations, isPending, isLoading, error, refetch } = useQuery({
        queryKey: ['my-Donations'],
        queryFn: async () => await axiosSecure.get(`my-donations?email=${user?.email}`).then((res) => {
            return res.data
        })
    })
    const calculatePercentage = (raisedMoney, maxDonation) => {
        // console.log(moneyRaised, maxDonations);
        if (maxDonation === 0) return 0;
        const percentage = parseFloat((raisedMoney * 100) / maxDonation);
        return Math.round(percentage);
    };
    const handlePause = (id, status) => {
        let newStatus;
        if (status === "paused") {
            newStatus = "running"
        } else {
            newStatus = "paused"
        }
        axiosSecure.patch(`pause-campaign?id=${id}&newStatus=${newStatus}&email=${user?.email}`)
            .then(() => refetch())
    }
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "Serial Number"
        }),
        columnHelper.accessor("campaignId", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Campaign Id",
        }),
        columnHelper.accessor("donationAmount", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Donation Amount",
        }),
        columnHelper.accessor("progress", {
            cell: ({ row }) => {
                const { donationAmount, maximumDonation } = row.original;
                const percentage = calculatePercentage(donationAmount, maximumDonation);
                return (
                    <ProgressBar
                        bgColor={'#18181b'}
                        height={12}
                        animateOnRender={true}
                        completed={percentage}
                    />
                );
            },
            header: "Progress",
        }),
        columnHelper.accessor("transactionId", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Transaction Id",
        }),
        

    ]


    const data = myDonations ?? []

    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState([])
    const [rowSelection, setRowSelection] = useState([])

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="w-full">
            <h1 className="text-center font-semibold text-2xl">My Donations</h1>
            <hr />

            <div className="rounded-md border my-12">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">

                {
                    table.getFilteredRowModel().rows.length > 10 ?
                        <>
                            <div className="flex-1 text-sm text-muted-foreground">
                                {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
                            </div>
                            <div className="space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                </Button>
                            </div>
                        </> :
                        ""
                }

            </div>
        </div>
    )
}

export default MyDonations
