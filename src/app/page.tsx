"use client";
import Header from "@/componants/Header";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Note } from "./types";

export default function Home() {
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

  const onSubmit = (values: Note, { resetForm }: any) => {
    console.log(values);

    // reset form on submit
    resetForm();
  };
  return (
    <main>
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
                <button type="submit" className="indigo-button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      {/* form box end */}
    </main>
  );
}
