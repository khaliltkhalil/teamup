import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Alert from "../components/Alert";
import signupImg from "../resources/signup-page-img.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectUser } from "../features/userSlice";

function SignIn() {
  const dispatch = useDispatch();
  const [createUserStatus, setCreateUserStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const user = useSelector(selectUser);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be longer than 6 characters")
        .required("Required"),
    }),
    onSubmit: async (user) => {
      try {
        setCreateUserStatus("loading");
        await dispatch(loginUser(user)).unwrap();
      } catch (err) {
        setErrorMessage(err.message);
        setCreateUserStatus("failed");
        setTimeout(() => {
          setCreateUserStatus("idle");
          setErrorMessage("");
        }, 3000);
      }
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
              <p className="text-2xl font-bold">Welcome back</p>
              <p>Please fill your details to access your account.</p>
            </article>
            <form className="space-y-8 mt-8" onSubmit={formik.handleSubmit}>
              <section className="space-y-2">
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
                <Alert
                  show={createUserStatus === "failed"}
                  type="error"
                  message={errorMessage}
                />
              </section>
              <button
                className="btn btn-primary btn-block"
                disabled={createUserStatus === "loading"}
              >
                {createUserStatus === "loading" ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <p className="text-center mt-2">
              Don't have an account?{" "}
              <Link className="btn-link" to="/signup">
                Sign Up
              </Link>
            </p>
          </section>
        </section>
        <img alt="" className="w-1/2 py-20 hidden md:block" src={signupImg} />
      </main>
    </>
  );
}

export default SignIn;
