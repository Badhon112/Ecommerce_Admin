"use client";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/customui/Loader";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<CollectionType | null>();
  const getCollectionDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollection(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getCollectionDetails();
  }, []);

  return loading ? <Loader /> : <CollectionForm initialData={collection} />;
};

export default CollectionDetails;
