import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();
    let product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });
    if (!product) {
      return new NextResponse(JSON.stringify({ msg: "Product not Found" }), {
        status: 400,
      });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("[Product_ID GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
