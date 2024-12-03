import { Input } from "@/components/ui/input";

export function SearchInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input placeholder="Tìm kiếm..." type="text" />
    </div>
  );
}
