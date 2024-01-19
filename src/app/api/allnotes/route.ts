import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

export const fetchCache = "force-no-store";
export const revalidate = false;

ConnectToMongoDB();

// all notes endpoint
export async function GET(request: NextRequest) {
  try {
    const allNotes = await NoteModel.find({});
    return NextResponse.json(
      {
        status: true,
        data: allNotes,
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
