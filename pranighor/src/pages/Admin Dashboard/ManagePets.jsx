import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import UseAuth from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import useAxiosSecure from "@/hooks/useAxiosSecure"

const ManagePets = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, error, data: myPets, isError, isLoading, refetch } = useQuery({
        queryKey: ['myPets'],
        queryFn: async () =>
            await axiosSecure.get(`all-pets?email=${user?.email}`).then((res) => { return res.data })
    })


    const columnHelper = createColumnHelper()
    const columns = [
        {
            id: "S.No",
            header: "#",
            cell: (info) => <span>{info.row.index + 1}</span>,
            enableSorting: false,
            enableHiding: false,
        },
        columnHelper.accessor("name", {
            header: "Pet Name",
            cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("requestorInfo.requestorName", {
            header: "Requestor Name",
            cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("category", {
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Pet Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: (info) => <span>{info.getValue()}</span>,
        }),
        columnHelper.accessor("image", {
            header: "Pet Image",
            cell: (info) => <div className="w-full flex items-center justify-center"><img src={info.getValue()} className="h-12 w-12 rounded-full object-cover"></img></div>,
        }),
        columnHelper.accessor("status", {
            header: "Adoption Status",
            cell: (info) => (
                <div className="w-48 overflow-x-auto whitespace-nowrap custom-scrollbar">
                    {info.getValue()}
                </div>
            ),
        }),
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const { _id } = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Link to={`/dashboard/update-pet/${_id}`} className="btn bg-orange-400 py-1 px-2 rounded-md w-full text-center">Update</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => handleDelete(_id)} className="btn bg-red-400 text-white py-1 px-2 rounded-md w-full text-center">Delete</Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button onClick={() => handleStatus(_id)} className="btn bg-green-400 text-white py-1 px-2 rounded-md w-full text-center">Adopted</Button>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            enableHiding: false,
        },
    ]

    const data = myPets ?? []

    const [sorting, setSorting] = useState([])
    const [columnFilters, setColumnFilters] = useState([])
    const [columnVisibility, setColumnVisibility] = useState([])
    const [rowSelection, setRowSelection] = useState([])
    const handleDelete = id => {
        axiosPublic.delete(`delete-pet?id=${id}`)
            .then(() => refetch())
    }
    const handleStatus = id => {
        axiosPublic.patch(`pet-status?id=${id}`)
            .then(() => refetch())
    }
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
    if (isError) return <div>Error: {error.message}</div>

    return (
        <div className="w-full">
            <h1 className="text-center font-semibold text-2xl">My Pets</h1>
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
            </div>
        </div>
    )
}

export default ManagePets;
