import React from "react";
import signupImg from "../resources/signup-page-img.svg";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

function SignUp() {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <main className="flex p-10 ">
        <section className="flex flex-col space-y-10 items-center md:w-1/2 w-full">
          <h1>Logo</h1>
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
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Last Name:</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                  />
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
                    value={formik.values.email}
                  />
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
                    value={formik.values.password}
                  />
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
