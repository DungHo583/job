"use client";

import {
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { accountStore } from "../store";
import { Label } from "@/components/ui/label";

export function ReadForm({ userId }: { userId: string }) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const rowTarget = accountStore((store) => store.rowTarget);
  const closeForm = accountStore((store) => store.hideForm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/accounts/read?userId=${rowTarget}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data);
      } catch (error: any) {
        toast.error(`${error}`);
      } finally {
        setLoading(false);
      }
    };
    if (rowTarget) {
      fetchData();
    }
  }, [rowTarget]);

  return (
    <>
      {loading ? (
        <>
          <SheetHeader className="mb-3">
            <SheetTitle></SheetTitle>
            <Skeleton className="h-4 w-[200px]" />
          </SheetHeader>
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[250px]" />
        </>
      ) : (
        <>
          <SheetHeader className="mb-3">
            <SheetTitle>Read Acount</SheetTitle>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="w-full">
            <div className="mb-3">
              <Label>Name</Label>
              <Input
                disabled
                type="text"
                readOnly
                defaultValue={data.name ?? ""}
              />
            </div>
            <div className="mb-3">
              <Label>Email</Label>
              <Input
                disabled
                type="text"
                readOnly
                defaultValue={data.email ?? ""}
              />
            </div>
            <div className="mb-3">
              <Label>Phone</Label>
              <Input disabled type="text" readOnly defaultValue={data.phone} />
            </div>
            <div className="mb-3">
              <Label>Birthday</Label>
              <Input
                disabled
                type="text"
                readOnly
                defaultValue={data.birthday}
              />
            </div>
            <div className="mb-3">
              <Label>Gender</Label>
              <Input disabled type="text" readOnly defaultValue={data.gender} />
            </div>
            <div className="mb-3">
              <Label>Role</Label>
              <Input disabled type="text" readOnly defaultValue={data.role} />
            </div>
            <div className="mb-3">
              <Label>Status</Label>
              <Input disabled type="text" readOnly defaultValue={data.status} />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" onClick={closeForm}>
                Close
              </Button>
            </SheetClose>
          </SheetFooter>
        </>
      )}
    </>
  );
}
