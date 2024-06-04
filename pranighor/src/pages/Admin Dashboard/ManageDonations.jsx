import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { USERS } from "./data";
import { useState } from "react";
import { Link } from "react-router-dom";


const ManageDonations = () => {
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "Serial Number"
        }),
        columnHelper.accessor("firstName", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pet Name",
        }),
        columnHelper.accessor("lastName", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pet Category",
        }),
        columnHelper.accessor("avatar", {
            cell: (info) => <div className="w-full flex items-center justify-center"><img src={info.getValue()} className="h-12 w-12 rounded-full object-cover"></img></div>,
            header: "Pet Image",
        }),
        columnHelper.accessor("age", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Adoption Status",
        }),
        columnHelper.accessor("age", {
            cell: (info) => <div className="inline-flex items-center justify-center gap-4">
                <Link to={'update-pet'} className="btn bg-green-400 py-1 px-2 rounded-md">Update</Link><Link  className="btn bg-red-400 text-white py-1 px-2 rounded-md">Delete</Link><Link  className="btn bg-blue-400 text-white py-1 px-2 rounded-md">Adopted</Link>
            </div>,
            header: "Actions",
        }),

    ]
    const [data] = useState(() => [...USERS]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        <>
            <h1 className="text-center font-semibold text-2xl">My Pets</h1>
            <hr />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (

                        <tr key={headerGroup.id}>

                            {headerGroup.headers.map((header) => (

                                <th key={header.id}>

                                    {flexRender(

                                        header.column.columnDef.header,

                                        header.getContext()

                                    )}

                                </th>

                            ))}

                        </tr>

                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <tr className={`${i % 2 === 0 ? "bg-gray-50" : ""}`} key={row.id}>
                                    {
                                        row.getVisibleCells().map((cell) => (
                                            <td className="text-center" key={cell.id}>
                                                {
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        ) : <></>
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-end gap-4 ">
                <button disabled={!table.getCanPreviousPage()} onClick={() => {
                    table.previousPage()
                }} className="btn bg-gray-50 p-4 disabled:opacity-30">
                    {"<"}
                </button>
                <button disabled={!table.getCanNextPage()} onClick={() => {
                    table.nextPage()
                }} className="btn bg-gray-50 p-4 disabled:opacity-30">
                    {">"}
                </button>
                <span className="flex items-center gap-2">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of {" "} {table.getPageCount()}
                    </strong>
                </span>
            </div>
        </>
    );
};

export default ManageDonations;