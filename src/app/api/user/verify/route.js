import { getDataFromToken } from "@/lib/verifyToken";
import { NextResponse } from "next/server";
import User from "@/model/userModel";
import { connect } from "@/config/dbConfig";

connect();

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const userId = await getDataFromToken(token);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      mesaaage: "User found",
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 400 }
    );
  }
}
