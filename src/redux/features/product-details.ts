import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

type InitialState = {
  value: Product;
};

const initialState = {
  value: {
    name: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    id: "",
    images: [],
    color: [],
    size: [],
  },
} as InitialState;

export const productDetails = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    updateproductDetails: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },
  },
});

export const { updateproductDetails } = productDetails.actions;
export default productDetails.reducer;
