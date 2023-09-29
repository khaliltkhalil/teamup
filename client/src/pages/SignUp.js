import React from "react";
import signupImg from "../resources/signup-page-img.svg";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

function SignUp() {
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
            <form className="space-y-8 mt-8">
              <section className="space-y-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">First Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Last Name:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Email:</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text font-bold">Password:</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
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
