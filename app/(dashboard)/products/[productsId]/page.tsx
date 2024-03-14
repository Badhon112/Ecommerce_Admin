"use client";
import Loader from "@/components/customui/Loader";
import ProductForm from "@/components/products/ProductForm";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>();
  const getProductDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return loading ? <Loader /> : <ProductForm initialData={productDetails} />;
};

export default ProductDetails;
