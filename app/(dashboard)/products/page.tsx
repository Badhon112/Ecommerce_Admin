"use client";

import { DataTable } from "@/components/customui/DataTable";
import Loader from "@/components/customui/Loader";
import { columns } from "@/components/products/ProductsColums";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const router = useRouter();
  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.log("[Get Products Error]", error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Products</p>
        <Button
          className="bg-blue-1 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Product
        </Button>
      </div>
      <Separator className="my-4 bg-grey-1" />
      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
};

export default Products;
