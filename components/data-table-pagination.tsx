import { useEffect } from 'react';
import { Table } from "@tanstack/react-table";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";


import { StoreApi, UseBoundStore } from 'zustand';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface Props<TData> 
{
	table: Table<TData>;
    useStore: UseBoundStore<StoreApi<any>>;
    dataLength: number;
};

export function DataTablePagination<TData>({ table, useStore, dataLength }: Props<TData>) 
{
	const pageSize = useStore((state) => state.pageSize);
	const currentPage = useStore((state) => state.currentPage);
	const setPageSize = useStore((state) => state.setPageSize);
	const setCurrentPage = useStore((state) => state.setCurrentPage);

	useEffect(() => {
		table.setPageSize(pageSize);
	},[pageSize, table]);

	useEffect(() => {
		if(currentPage > (dataLength % pageSize == 0 ? (dataLength / pageSize) : Math.floor(dataLength / pageSize) + 1)) {
			setCurrentPage(1);
		}
	}, [currentPage, dataLength, pageSize])
	
	return (
		<div className="flex items-center justify-between px-2">
			<div className="flex-1 text-sm text-muted-foreground">
				{table.getFilteredSelectedRowModel().rows.length} trên{" "}
				{dataLength} dòng được chọn
			</div>
			<div className="flex items-center space-x-6 lg:space-x-8">
				<div className="flex items-center space-x-2">
					<p className="text-sm font-medium">Số bản ghi / trang</p>
					<Select
						value={`${pageSize}`}
						onValueChange={(value) => {
							let lastPageSize = Number(pageSize);
							setPageSize(Number(value));
							setCurrentPage(Math.floor((currentPage - 1) * lastPageSize / Number(value)) + 1);
							table.setPageIndex(Math.floor((currentPage - 1)* lastPageSize / Number(value)));
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[70px]">
							<SelectValue placeholder={pageSize} />
						</SelectTrigger>
						<SelectContent side="top">
							{[10, 20, 30, 40, 50].map((pageSize) => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center justify-center text-sm font-medium">
					Trang {currentPage} /{" "} {
						(dataLength !== undefined) ? 
						(dataLength % pageSize == 0 ? (dataLength / pageSize) : Math.floor(dataLength / pageSize) + 1) 
						: 1
					}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => {
							table.setPageIndex(0);
							setCurrentPage(1);
						}}
						disabled={currentPage <= 1}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => {
							setCurrentPage(currentPage - 1);
							table.previousPage();
						}}
						disabled={currentPage <= 1}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => {
							setCurrentPage(currentPage + 1);
							table.nextPage();
						}}
						disabled={Number(dataLength) % pageSize == 0 ? 
							currentPage >= Math.floor(Number(dataLength) / pageSize) :
							currentPage > Math.floor(Number(dataLength) / pageSize)
						}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={() => {
							const index = Number(dataLength) % pageSize == 0 ? 
								Math.floor(Number(dataLength) / pageSize) :
								Math.floor(Number(dataLength) / pageSize) + 1;
							table.setPageIndex(index);
							setCurrentPage(index);
						}}
						disabled={Number(dataLength) % pageSize == 0 ? 
							currentPage >= Math.floor(Number(dataLength) / pageSize) :
							currentPage > Math.floor(Number(dataLength) / pageSize)
						}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};
