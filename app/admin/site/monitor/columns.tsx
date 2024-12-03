"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnAction } from "./column-action";

export type Monitor = {
  id: string;
  date: string;
  sessionId: string;
  sipMethod: string;
  sipFromUser: string;
  sipToUser: string;
  sourceIP: string;
  srcPort: string;
  destinationIP: string;
  dstPost: string;
};

export const columns: ColumnDef<Monitor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="">{formartDate(row.getValue("date"))}</div>
    ),
  },
  {
    accessorKey: "sessionId",
    header: "Session ID",
    cell: ({ row }) => <div className="">{row.getValue("sessionId")}</div>,
  },
  {
    accessorKey: "sipMethod",
    header: "SIP Method",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sipMethod")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "sipFromUser",
    header: "SIP From User",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sipFromUser")}</div>
    ),
  },
  {
    accessorKey: "sipToUser",
    header: "SIP To User",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sipToUser")}</div>
    ),
  },
  {
    accessorKey: "sourceIP",
    header: "Source IP",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sourceIP")}</div>
    ),
  },
  {
    accessorKey: "srcPort",
    header: "Src Port",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("srcPort")}</div>
    ),
  },
  {
    accessorKey: "destinationIP",
    header: "Destination IP",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("destinationIP")}</div>
    ),
  },
  {
    accessorKey: "dstPort",
    header: "Dst Port",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dstPort")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ColumnAction rowId={row.original.id} />;
    },
  },
];

export function formartDate(timestamp: number | string) {
  const date = new Date(timestamp); // Convert milliseconds to seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}
