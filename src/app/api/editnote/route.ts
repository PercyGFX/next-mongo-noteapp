import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

ConnectToMongoDB();

// add note endpoint
export async function PATCH(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { _id, note } = reqbody;

    return NextResponse.json(
      {
        status: true,
        message: "done",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: "Failed. Something is wrong with the server!",
      },
      { status: 401 }
    );
  }
}
