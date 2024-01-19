import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

ConnectToMongoDB();

// add note endpoint
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { title, description } = reqbody;

    return NextResponse.json(
      {
        status: true,
        message: description,
      },
      { status: 401 }
    );
  } catch (error) {
    console.log(error);
  }
}
