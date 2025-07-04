import { useDispatch, useSelector } from "react-redux";

/**
 * Custom hook to use Redux dispatch function
 */
export const useAppDispatch = () => useDispatch();

/**
 * Custom hook to access Redux state
 */
export const useAppSelector = useSelector;
