import { LoaderCircle } from "lucide-react";

export default function Loader({ text = "Please wait..." }) {
  return (
    <div className="loader-container" role="status">
      <LoaderCircle className="spinner" size={26} />
      <span>{text}</span>
    </div>
  );
}