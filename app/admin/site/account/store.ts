
import { create } from "zustand";

interface State {
    currentPage: number;
    pageSize: number
    openForm: boolean
    rowTarget: string
    formMode: "read" | "update" | "create"
    refreshData: boolean

    setCurrentPage: (value: number) => void;
    setPageSize: (value: number) => void
    setOpenForm: (open: boolean) => void
    hideForm: () => void
    setRowTarget: (rowId: string) => void
    openReadForm: () => void
    openCreateForm: () => void
    openUpdateForm: () => void
    setRefreshData: (value: boolean) => void
}

export const accountStore = create<State>((set) => ({
    pageSize: 10,
    currentPage: 1,
    openForm: false,
    rowTarget: "",
    formMode: "read",
    refreshData: false,

    setPageSize(value: number) {
        set({ pageSize: value })
    },
    setCurrentPage(currentPage: number) {
        set({ currentPage: currentPage, });
    },
    setOpenForm(open: boolean) {
        set({ openForm: open })
    },
    hideForm() {
        set({ openForm: false })
    },
    setRowTarget(rowId) {
        set({ rowTarget: rowId })
    },
    openReadForm() {
        set({ formMode: "read", openForm: true })
    },
    openCreateForm() {
        set({ formMode: "create", openForm: true })
    },
    openUpdateForm() {
        set({ formMode: "update", openForm: true })
    },
    setRefreshData(refresh) {
        set({ refreshData: refresh })
    }
}))