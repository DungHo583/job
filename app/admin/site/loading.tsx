import { ReloadIcon } from "@radix-ui/react-icons";

export default function LoadingPage() {
  return (
    <div className="h-full grid grid-rows-1 items-center justify-center">
      <ReloadIcon
        width="30"
        height="30"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      />
    </div>
  );
}
