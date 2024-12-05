"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { monitorStore } from "./store";

export function ColumnAction({ rowId }: { rowId: string }) {
  const openReadForm = () => {
    monitorStore.getState().openReadForm();
    monitorStore.getState().setRowTarget(rowId);
  };

  // const openUpdateForm = () => {
  //   accountStore.getState().openUpdateForm();
  //   accountStore.getState().setRowTarget(rowId);
  // };

  return (
    <div className="w-full flex justify-end pr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Tuỳ chọn</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={openReadForm}>Xem</DropdownMenuItem>
          {/* <DropdownMenuItem onClick={openUpdateForm}>Sửa</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">Xoá</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
