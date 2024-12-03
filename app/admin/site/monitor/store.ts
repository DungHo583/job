
import { create } from "zustand";

interface State {
    page: number
    pageSize: number
    openForm: boolean
    rowTarget: string
    formMode: "read" | "update" | "create"

    setPage: (value: number) => void
    setPageSize: (value: number) => void
    setOpenForm: (open: boolean) => void
    hideForm: () => void
    setRowTarget: (rowId: string) => void
    openReadForm: () => void
    openCreateForm: () => void
    openUpdateForm: () => void
}

export const accountStore = create<State>((set) => ({
    page: 1,
    pageSize: 10,
    openForm: false,
    rowTarget: "",
    formMode: "read",

    setPage(value: number) {
        set({ page: value })
    },
    setPageSize(value: number) {
        set({ pageSize: value })
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