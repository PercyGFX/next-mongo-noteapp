"use client";
import Header from "@/componants/Header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Note } from "./types";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadEffect, setReloadEffect] = useState<boolean>(false);
  const [editMode, setEditmode] = useState<boolean>(false);

  useEffect(() => {
    // load all notes
    axios.get("/api/allnotes").then((result) => {
      setNotes(result.data.data);
      console.log(result.data.data);
    });
  }, [reloadEffect]);

  // yup validations for the form
  const formvalidation = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  //initial values for the form
  const initialValues = {
    title: "",
    description: "",
  };

  // form submit logic
  const onSubmit = (values: Note, { resetForm }: any) => {
    //show proccesing
    const loadingToast = toast.loading("Posting Note...");
    setLoading(true);

    axios
      .post("/api/addnote", values)
      .then((result) => {
        toast.success("Note added succesfully!");
        setReloadEffect((prev) => !prev);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        // end proccesing
        toast.dismiss(loadingToast);
        setLoading(false);
      });

    // reset form on submit
    resetForm();
  };

  // edit note function
  function handleEdit(_id: string) {}

  // edit note function
  function handleDelete(_id: string) {
    //show proccesing
    const loadingToast = toast.loading("Deleting note...");
    axios
      .post("/api/deletenote", { _id })
      .then((result) => {
        toast.success("Note Deleted succesfully!");
        setReloadEffect((prev) => !prev);
      })
      .catch((error: any) => {
        console.log(error);
        toast.error(error.response.data.message);
      })
      .finally(() => {
        // end proccesing
        toast.dismiss(loadingToast);
      });
  }
  return (
    <main>
      <Toaster />
      <Header />
      {/* form box start */}
      <div className="flex flex-row justify-center my-6  ">
        <div className="bg-white rounded-md shadow-md mx-2 p-4 w-full md:w-6/12 border border-blue-200">
          <p className="text-lg my-2">Add a Note</p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={formvalidation}
          >
            <Form>
              <div>
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="title"
                  className="my-3 indigo-input"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="error text-red-600 text-xs"
                />
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="description"
                  className="indigo-input my-3"
                  rows={4}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error text-red-600 text-xs"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="indigo-button"
                  disabled={loading}
                >
                  {loading ? "Posting..." : "Submit"}
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {/* form box end */}

      <div className=" my-10 mx-4 grid grid-cols-1 md:grid-cols-3 lg:md:grid-cols-4 gap-4">
        {/* card start */}

        {notes && notes.length > 0 ? (
          notes.map((note: Note) => {
            return (
              <div key={note._id} className="bg-white rounded-md p-3 shadow-md">
                <p className=" font-semibold text-lg py-2">{note.title}</p>

                <hr />

                <p className="text-sm my-2 mb-2">{note.description}</p>

                <div className="flex justify-end my-3">
                  <AiFillEdit
                    onClick={() => {
                      handleEdit(note._id ? note._id : "");
                    }}
                    className=" text-2xl mx-2 hover:cursor-pointer  hover:text-sky-900"
                  />
                  <AiFillDelete
                    onClick={() => {
                      handleDelete(note._id ? note._id : "");
                    }}
                    className=" text-2xl hover:cursor-pointer hover:text-sky-900"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div> </div>
        )}

        {/* card end */}
      </div>
    </main>
  );
}
