"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const getCollections = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log("[get Collections]", error);
    }
  };
  useEffect(() => {
    getCollections();
  }, []);
  console.log(collections);

  return (
    <div>
      {/* {collections.map((value) => (
        <div></div>
      ))} */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
        tempora.
      </p>
    </div>
  );
}
