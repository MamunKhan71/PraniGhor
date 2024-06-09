import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import UseAuth from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

const ManageUsers = () => {
    const { user } = UseAuth()
    const axiosPublic = useAxiosPublic()
    const { data: myCampaigns, isPending, isLoading, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => await axiosPublic.get(`users`).then((res) => {
            return res.data
        })
    })
    const handleMakeAdmin = id => {
        axiosPublic.patch('make-admin', { id })
            .then(() => refetch())
    }
    const handleRemoveAdmin = id => {
        axiosPublic.patch('remove-admin', { id })
            .then(() => refetch())
    }
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "Serial Number"
        }),
        columnHelper.accessor("userImage", {
            cell: (info) => <div className="w-full flex items-center justify-center"><img src={info.getValue()} className="h-12 w-12 rounded-full object-cover "></img></div>,
            header: "User Profile",
        }),
        columnHelper.accessor("userName", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "User Name",
        }),
        columnHelper.accessor("userEmail", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "User Email",
        }),
        columnHelper.accessor("role", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Role",
        }),
        columnHelper.accessor("Action", {
            cell: ({ row }) => {
                const { _id, role } = row.original
                return (
                    <>
                        {role === "admin" ? (
                            <Button onClick={() => handleRemoveAdmin(_id)}>Remove Admin</Button>
                        ) : (
                            <Button onClick={() => handleMakeAdmin(_id)}>Make Admin</Button>
                        )}
                    </>
                );

            },
            header: "Actions",
        }),

    ]

    const data = myCampaigns ?? []

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
            <h1 className="text-center font-semibold text-2xl">My Campaigns</h1>
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

export default ManageUsers
