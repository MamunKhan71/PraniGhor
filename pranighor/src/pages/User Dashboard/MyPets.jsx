import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
import { Badge } from "@/components/ui/badge"
import useAxiosSecure from "@/hooks/useAxiosSecure"

const MyPets = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, error, data: myPets, isError, isLoading, refetch } = useQuery({
        queryKey: ['myPets'],
        queryFn: async () =>
            await axiosSecure.get(`my-pets?email=${user?.email}`).then((res) => { return res.data })
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
        columnHelper.accessor("category", {
            header: ({ column }) => (
                <Button className="text-left p-0"
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
        columnHelper.accessor("adopted", {
            header: ({ column }) => (
                <Button className="text-left p-0"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Adoption Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => {
                const { adopted } = row.original
                return <Badge>{adopted ? "Adopted" : "Not Adopted"}</Badge>
            },
        }),
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const { _id, name, adopted } = row.original
                const [isAlertOpen, setIsAlertOpen] = useState(false);
                return (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem asChild>
                                    <Link
                                        to={`/dashboard/update-pet/${_id}`}
                                    >
                                        <Button className="w-full text-center h-8">Update</Button>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setIsAlertOpen(true)}>
                                    <Button className="w-full text-center h-8 bg-red-400">Delete</Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem disabled={adopted ? true : false} onSelect={() => handleStatus(_id)}>
                                    <Button className="w-full text-center h-8 bg-green-400">Adopted</Button>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete {name}?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete {name} {" "}
                                        and remove the data from our servers.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(_id)} className="bg-red-400">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
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
        axiosSecure.delete(`delete-pet?email=${user?.email}&id=${id}`)
            .then(() => refetch())
    }
    const handleStatus = id => {
        axiosSecure.patch(`pet-status?email=${user?.email}&id=${id}`)
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

export default MyPets;
