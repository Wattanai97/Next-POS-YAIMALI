// import { useEffect } from "react";
// import FetchOrders from "@/components/FetchOrders";
// import useFetchHoldOrders from "@/components/FetchHoldOrders";
// import { useOrderCartStore } from "../useOrderCartStore";

// export const shouldRefetchOrder = () => {
//   const { error, fetchHoldOrders, loading } = useFetchHoldOrders();
//   const { cart } = useOrderCartStore();
//   useEffect(() => {
//     if (cart.length > 0) {
//       fetchHoldOrders();
//       FetchOrders();
//     }
//   }, [cart]);
//   return { error, loading };
// };
