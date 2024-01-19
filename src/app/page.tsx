"use client";
import Header from "@/componants/Header";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Note } from "./types";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useFormikContext } from "formik";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [reloadEffect, setReloadEffect] = useState<boolean>(false);
  const [editMode, setEditmode] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string>("");
  const formikRef = useRef(null);

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
    if (editMode) {
      const loadingToast = toast.loading("Editing Note...");

      const editNote = {
        _id: currentId,
        title: values.title,
        description: values.description,
      };
      axios
        .post("/api/editnote", editNote)
        .then((result) => {
          toast.success("Note Edited succesfully!");
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

      resetForm();
      setEditmode(false);
      return;
    }
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

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formvalidation,
    onSubmit: onSubmit,
  });

  // edit note function
  function handleEdit(_id: string) {
    const note = notes.find((note) => note._id === _id);

    if (note && formikRef.current) {
      const currentFormik = formikRef.current as {
        setValues: (values: any) => void;
      };

      currentFormik.setValues({
        title: note.title,
        description: note.description,
      });

      setCurrentId(_id);
      setEditmode(true);
    }
  }

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
          <p className="text-lg my-2">{editMode ? "Edit" : "Add"} a Note</p>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={formvalidation}
            innerRef={formikRef}
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
