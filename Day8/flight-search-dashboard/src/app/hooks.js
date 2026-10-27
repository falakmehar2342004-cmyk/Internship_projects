import { useDispatch, useSelector } from "react-redux";

// Shared typed-style hooks: components mein Redux access asaan hota hai.
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;