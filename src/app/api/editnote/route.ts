import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

ConnectToMongoDB();

// update note endpoint
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { _id, title, description } = reqbody;

    // note update where _id is
    const updatedNote = await NoteModel.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true }
    );

    // error when note id not found
    if (!updatedNote) {
      return NextResponse.json(
        {
          status: false,
          message: "Note not found.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: updatedNote,
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
