"use client";

import apiClient from "@/lib/axios";
import useSWR from "swr";
import { ProductType } from "@/types/myProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import ViewModeBtn from "./ViewModeBtn";
import ProductList from "./ProductList";
import PreLoader from "../Common/PreLoader";

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

const ProductView = () => {
  const { data, error, isLoading, mutate } = useSWR("/products", fetcher);
  const products = data as ProductType[];

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"latest" | "price-low" | "price-high">(
    "latest"
  );

  if (isLoading) return <PreLoader/>;
  if (error) return <p>Error: {error.message || "An error occurred"}</p>;

  // Sort products based on price
  const sortedProducts = [...(products || [])].sort((a, b) => {
    if (sortBy === "latest") return 0; // No sorting for "latest" (assumes API default order)

    if (sortBy === "price-low") {
      return a.price - b.price; // Ascending order (low to high)
    }

    if (sortBy === "price-high") {
      return b.price - a.price; // Descending order (high to low)
    }

    return 0;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <Select
          value={sortBy}
          onValueChange={(value) =>
            setSortBy(value as "latest" | "price-low" | "price-high")
          }
        >
          <SelectTrigger className="w-[180px] bg-muted/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest Products</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
        <ViewModeBtn viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      <ProductList
        products={sortedProducts}
        viewMode={viewMode}
        mutate={mutate}
      />
    </div>
  );
};

export default ProductView;
