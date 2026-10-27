import { LoaderCircle } from "lucide-react";

// Small reusable loader for buttons or compact loading states.
export default function Loader({ label = "Loading..." }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
      <LoaderCircle size={18} className="animate-spin" />
      {label}
    </span>
  );
}