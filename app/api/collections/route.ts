import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoDb";
import { auth } from "@clerk/nextjs";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectToDB();
    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return new NextResponse("Bad Request", { status: 400 });
    }
    const existingCollection = await Collection.findOne({ title });
    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }
    const newCollection = await Collection.create({
      title,
      description,
      image,
    });
    await newCollection.save();
    return NextResponse.json(newCollection, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
};
