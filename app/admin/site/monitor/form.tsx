"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { accountStore } from "./store";
import { match } from "ts-pattern";
import { ReadForm } from "./form/read-form";
import { CreateForm } from "./form/create-form";
import { UpdateForm } from "./form/update-form";
import { Button } from "@/components/ui/button";

export function SheetForm({ userId, role }: { userId: string; role: string }) {
  const formMode = accountStore((store) => store.formMode);
  const openForm = accountStore((store) => store.openForm);
  const setOpenForm = accountStore((store) => store.setOpenForm);
  const openCreateForm = accountStore((store) => store.openCreateForm);

  return (
    <Sheet open={openForm} onOpenChange={setOpenForm}>
      <SheetTrigger asChild>
        <Button variant="default" onClick={openCreateForm}>
          Thêm mới
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-white text-black overflow-auto">
        {match(formMode)
          .with("read", () => <ReadForm userId={userId} />)
          .with("create", () => <CreateForm userId={userId} role={role} />)
          .with("update", () => <UpdateForm userId={userId} />)
          .exhaustive()}
      </SheetContent>
    </Sheet>
  );
}
