import Collection from "@/lib/models/Collection";
import { connectToDB } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();
    let collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse(JSON.stringify({ msg: "Collection not Found" }), {
        status: 400,
      });
    }
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collection_Id Delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    let collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }
    const { title, description, image } = await req.json();
    if (!title && !image) {
      return new NextResponse("Title and Image are required", { status: 400 });
    }
    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );
    await collection.save();
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("[Collection_Id POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unathorized", { status: 401 });
    }
    await connectToDB();
    await Collection.findByIdAndDelete(params.collectionId);
    return new NextResponse("Collections is Deleted", { status: 200 });
  } catch (error) {
    console.log("[Collection_Id Delete]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
