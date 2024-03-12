import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }
    await connectToDB()
    await Collection.findByIdAndDelete(params.collectionId)
    return new NextResponse("Collections is Deleted",{status:200})
  } catch (error) {
    console.log("[Collection_Id Delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
