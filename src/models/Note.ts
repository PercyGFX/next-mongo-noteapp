import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// const NoteModel = mongoose.model("note", NoteSchema);

export default mongoose.models["note"] || mongoose.model("note", NoteSchema);
