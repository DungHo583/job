
import { create } from "zustand";

interface State {
    pageSize: number
    currentPage: number
    openForm: boolean
    rowTarget: string
    formMode: "read" | "update" | "create"

    setPageSize: (value: number) => void
    setCurrentPage: (value: number) => void;
    setOpenForm: (open: boolean) => void
    hideForm: () => void
    setRowTarget: (rowId: string) => void
    openReadForm: () => void
    openCreateForm: () => void
    openUpdateForm: () => void
}

export const monitorStore = create<State>((set) => ({
    pageSize: 10,
    currentPage: 1,
    openForm: false,
    rowTarget: "",
    formMode: "read",

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
}))