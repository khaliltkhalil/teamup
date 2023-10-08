import React, { useEffect } from "react";
import signupImg from "../resources/signup-page-img.svg";
import Alert from "../components/Alert";
import { Link, Navigate, redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createUser, selectUser } from "../features/userSlice";

function SignUp() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      last_name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be longer than 6 characters")
        .required("Required"),
    }),
    onSubmit: (user) => {
      dispatch(createUser(user));
    },
  });

  return (
    <>
      {user.id && <Navigate to="/" replace={true} />}
      <main className="flex p-10 ">
        <section className="flex flex-col space-y-10 items-center md:w-1/2 w-full">
          <h1 className="text-2xl">Teamup</h1>
          <section>
            <article>
              <p className="text-2xl font-bold">Let's Connect</p>
              <p>Please fill your details to create your account.</p>
            </article>
            <form className="space-y-8 mt-8" onSubmit={formik.handleSubmit}>
              <section className="space-y-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">First Name:</span>
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.first_name}
                  />
                  {formik.touched.first_name && formik.errors.first_name ? (
                    <div className="text-red-400">
                      {formik.errors.first_name}
                    </div>
                  ) : null}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Last Name:</span>
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.last_name}
                  />
                  {formik.touched.last_name && formik.errors.last_name ? (
                    <div className="text-red-400">
                      {formik.errors.last_name}
                    </div>
                  ) : null}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Email:</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-400">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Password:</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-400">{formik.errors.password}</div>
                  ) : null}
                </div>
                <Alert show={false} type="error" message="alert alert" />
              </section>
              <button className="btn btn-primary btn-block">Sign Up</button>
            </form>
            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link className="btn-link" to="/signin">
                Sign In
              </Link>
            </p>
          </section>
        </section>
        <img alt="" className="w-1/2 py-20 hidden md:block" src={signupImg} />
      </main>
    </>
  );
}

export default SignUp;
