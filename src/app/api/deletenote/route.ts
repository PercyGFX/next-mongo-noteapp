import { ConnectToMongoDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
import NoteModel from "@/models/Note";

ConnectToMongoDB();

// delete note endpoint
export async function POST(request: NextRequest) {
  try {
    const reqbody = await request.json();
    const { _id } = reqbody;

    console.log(_id);

    const deletedNote = await NoteModel.deleteOne({ _id });
    console.log(deletedNote);
    return NextResponse.json(
      {
        status: true,
        data: "Note deleted successfully",
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
