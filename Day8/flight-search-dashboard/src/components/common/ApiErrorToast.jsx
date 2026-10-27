import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { clearApiError } from "../../features/api/apiErrorSlice";

// Redux mein set hone wala API error toast mein ek baar show hota hai.
export default function ApiErrorToast() {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.apiError.message);

  useEffect(() => {
    if (!message) return;

    toast.error(message);
    dispatch(clearApiError());
  }, [message, dispatch]);

  return null;
}