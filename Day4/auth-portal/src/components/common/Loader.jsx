
import { LoaderCircle } from "lucide-react";

const Loader = ({ size = 20, text = "Please wait..." }) => {
  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center justify-center gap-2"
    >
      <LoaderCircle
        size={size}
        className="animate-spin"
        aria-hidden="true"
      />

      <span>{text}</span>
    </span>
  );
};

export default Loader;
