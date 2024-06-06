import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { USERS } from "./data";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import UseAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";


const MyAdoptionRequests = () => {
    const { user } = UseAuth()
    const axiosPublic = useAxiosPublic()
    const { isPending, error, data: myRequests } = useQuery({
        queryKey: ['adoptionRequest'],
        queryFn: async () =>
            await axiosPublic.get(`my-requests?authorEmail=${user?.email}`).then((res) => { return res.data })
    })

    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("", {
            id: "S.No",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "#"
        }),
        columnHelper.accessor("postInfo.petName", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pet Name",
        }),
        columnHelper.accessor("requestorInfo.requestorName", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Requestor Name",
        }),
        columnHelper.accessor("requestorInfo.requestorEmail", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Requestor Email",
        }),
        columnHelper.accessor("requestorInfo.requestorPhone", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Requestor Phone",
        }),
        columnHelper.accessor("requestorInfo.requestorAddress", {
            cell: (info) => (
                <div className="w-48 overflow-x-auto whitespace-nowrap custom-scrollbar">
                    {info.getValue()}
                </div>
            ),
            header: () => (
                <div className="w-48">
                    Requestor Location
                </div>
            ),
        }),
        columnHelper.accessor("age", {
            cell: (info) => <div className="inline-flex items-center justify-center gap-4">
                <Link to={'update-pet'} className="btn bg-green-400 py-1 px-2 rounded-md">Accept</Link><Link className="btn bg-red-400 text-white py-1 px-2 rounded-md">Reject</Link>
            </div>,
            header: "Actions",
        }),

    ]
    const data = myRequests ?? []

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        <>
            <h1 className="text-center font-semibold text-2xl">Adoption Requests</h1>
            <hr />
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (

                        <tr  key={headerGroup.id}>

                            {headerGroup.headers.map((header) => (

                                <th className="pb-4" key={header.id}>

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
                                            <td className="text-center py-2" key={cell.id}>
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

export default MyAdoptionRequests;