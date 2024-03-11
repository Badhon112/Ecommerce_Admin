import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export default function Delete() {
  return (
    <Button className="bg-red-1 text-white">
      <Trash className="h-4 w-4" />
    </Button>
  );
}
