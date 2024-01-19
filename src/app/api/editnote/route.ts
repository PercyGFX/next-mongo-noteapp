import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

ConnectToMongoDB();

// add note endpoint
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { _id, title, description } = reqbody;

    const updatedNote = await NoteModel.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return NextResponse.json(
        {
          status: false,
          message: "Note not found with the provided _id.",
        },
        { status: 404 }
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
