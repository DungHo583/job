import {
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { monitorStore } from "../store";

export function CreateForm({ userId, role }: { userId: string; role: string }) {
  const createSchema = z
    .object({
      name: z
        .string()
        .max(250, "Mật khẩu không được vượt quá 250 ký tự")
        .trim()
        .refine((value) => value.trim() !== "", {
          message: "Name không được để trống",
        }),
      email: z
        .string()
        .email("Email không được để trống")
        .refine((value) => value.trim() !== "", {
          message: "Email không được để trống",
        }),
      phone: z
        .string()
        .min(9, "Số điện thoại phải chứa ít nhất 9 ký tự")
        .max(12, "Mật khẩu không được vượt quá 12 ký tự")
        .regex(
          /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g,
          "Phone không hợp lệ"
        ),
      password: z
        .string()
        .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
        .max(12, "Mật khẩu không được vượt quá 12 ký tự")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
          "Mật khẩu bắt buộc phải chứa ký tự in hoa, in thường, số và ký tự đặc biệt"
        ),
      confirmPassword: z
        .string()
        .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
        .max(12, "Mật khẩu không được vượt quá 12 ký tự")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/,
          "Mật khẩu bắt buộc phải chứa ký tự in hoa, in thường, số và ký tự đặc biệt"
        ),
      city: z.string(),
      district: z.string().optional(),
      avatar: z.string().optional(),
      unitId: z.string().optional(),
      role: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu không khớp. Vui lòng nhập lại",
      path: ["confirmPassword"],
    });

  const createForm = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "user", // user | admin
    },
  });

  const hideForm = monitorStore((store) => store.hideForm);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitButton = createForm.handleSubmit(
    async (data: z.infer<typeof createSchema>) => {
      setLoadingBtn(true);

      const dataPayload = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
      };

      await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/accounts/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPayload),
      }).then((res) => {
        if (!res.ok) {
          setLoadingBtn(false);
          return toast.error("Thêm mới tài khoản không thành công");
        }

        setLoadingBtn(false);
        hideForm();
        return toast.success("Thêm mới tài khoản thành công");
      });
    }
  );

  return (
    <>
      <SheetHeader>
        <SheetTitle>Thêm tài khoản mới</SheetTitle>
      </SheetHeader>
      <Form {...createForm}>
        <form action="">
          <FormField
            control={createForm.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Họ tên:</FormLabel>
                <FormControl className="!mt-0">
                  <Input {...field} type="text" placeholder="Name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Email:</FormLabel>
                <FormControl className="!mt-0">
                  <Input {...field} type="text" placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Password:</FormLabel>
                <FormControl className="!mt-0">
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      onPaste={(e: any) => e.preventDefault()}
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="z-10	h-5 w-5 text-gray-500 focus:outline-none cursor-pointer absolute right-0 top-0 mr-3 mt-2"
                    >
                      {showPassword ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Nhập lại password:</FormLabel>
                <FormControl className="!mt-0">
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      onPaste={(e: any) => e.preventDefault()}
                      placeholder="Nhập lại password"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="z-10 h-5 w-5 text-gray-500 focus:outline-none cursor-pointer absolute right-0 top-0 mr-3 mt-2"
                    >
                      {showConfirmPassword ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl className="!mt-0">
                  <Input {...field} type="text" placeholder="Phone" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={createForm.control}
            name="role"
            render={({ field }) => (
              <FormItem className="mb-3">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {role == "root" && (
                      <SelectItem value="admin">Quản trị viên</SelectItem>
                    )}
                    <SelectItem value="user">Người dùng</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <SheetFooter>
        <SheetClose asChild>
          <Button onClick={submitButton} disabled={loadingBtn} type="submit">
            {loadingBtn ? "Đang xử lý..." : "Thêm mới"}
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}
