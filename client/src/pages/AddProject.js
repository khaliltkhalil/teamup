import React from "react";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import Alert from "../components/Alert";

function AddProject() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      deadline: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      deadline: Yup.string().required("Required"),
    }),
    onSubmit: (projectData) => {
      console.log(projectData);
      //   dispatch(createUser(user));
    },
  });
  return (
    <main className="h-screen">
      <form
        className="flex flex-col items-center w-full space-y-8 mt-8 "
        onSubmit={formik.handleSubmit}
      >
        <section className="space-y-2 flex flex-col items-center w-full">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Title:</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-400">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Description:</span>
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs h-36"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-400">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">deadline:</span>
            </label>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className="input input-bordered w-full max-w-xs"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.deadline}
            />
          </div>

          <Alert show={false} type="error" message="alert alert" />
        </section>
        <button className="btn btn-primary btn-block max-w-xs">Add</button>
      </form>
    </main>
  );
}

export default AddProject;
