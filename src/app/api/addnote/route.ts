import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

ConnectToMongoDB();

// add note endpoint
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { title, description } = reqbody;

    // check if the fields are empty
    if (!title.trim() || !description.trim()) {
      return NextResponse.json(
        {
          status: false,
          message: "Title or description can not be empty!",
        },
        { status: 401 }
      );
    } else {
      const newNote = new NoteModel({
        title,
        description,
      });
      await newNote.save();
      return NextResponse.json(
        {
          status: true,
          message: newNote,
        },
        { status: 200 }
      );
    }
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

export const fetchCache = "force-no-store";
