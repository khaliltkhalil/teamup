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
    <div>
      <form
        className="flex w-full space-y-8 mt-8 "
        onSubmit={formik.handleSubmit}
      >
        <section className="flex gap-5 w-full">
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
              <span className="label-text">Member:</span>
            </label>
            <select
              name="user_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="select select-bordered"
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>
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
    </div>
  );
}

export default AddTaskBar;
