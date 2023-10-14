import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Alert from "./Alert";
import { addTask } from "../features/tasksSlice";

function AddTaskBar({ members, projectId }) {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      title: "",
      user_id: "",
      deadline: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      deadline: Yup.string().required("Required"),
      user_id: Yup.string().required("Required"),
    }),
    onSubmit: (taskData) => {
      console.log(taskData);
      dispatch(
        addTask({
          ...taskData,
          user_id: String(taskData.user_id),
          status: "pending",
          project_id: projectId,
        })
      );
    },
  });
  return (
    <div className="">
      <form
        className="flex flex-col items-center 2xl:flex-row 2xl:items-start w-full space-y-8 mt-8 "
        onSubmit={formik.handleSubmit}
      >
        <section className="flex flex-col md:flex-row items-center md:items-start gap-5 w-full">
          <div className="form-control justify-start w-full max-w-xs">
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
              <span className="label-text font-bold">Member:</span>
            </label>
            <select
              id="user_id"
              name="user_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="select select-bordered"
              defaultValue="default"
            >
              <option value="default" disabled>
                Choose a member for this task
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
            {formik.touched.user_id && formik.errors.user_id ? (
              <div className="text-red-400">{formik.errors.user_id}</div>
            ) : null}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-bold">Deadline:</span>
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
            {formik.touched.deadline && formik.errors.deadline ? (
              <div className="text-red-400">{formik.errors.user_id}</div>
            ) : null}
          </div>

          <Alert show={false} type="error" message="alert alert" />
        </section>
        <button className="btn btn-primary btn-block max-w-xs">Add</button>
      </form>
    </div>
  );
}

export default AddTaskBar;
