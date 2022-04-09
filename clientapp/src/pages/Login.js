import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
        requestOptions
      )
        .then((res) => res.json())
        .then((item) => {
          if ("errors" in item) {
            setErrors(item.errors);
          } else if ("success" in item) {
            localStorage.setItem("token", item.token);
            navigate("/");
          }
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="lg:flex ">
      <div className="lg:w-1/2 xl:max-w-screen-sm">
        <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div className="text-2xl text-green-800 tracking-wide ml-2 font-semibold">
              පොල් මුරේ
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          <h2
            className="text-center text-4xl text-green-900 font-display font-semibold lg:text-left xl:text-5xl
          xl:text-bold"
          >
            Log in
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                  type="email"
                  placeholder="mike@gmail.com"
                />
                {errors.email ? (
                  <p className="text-red-500">{errors.email} !</p>
                ) : null}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <a
                      className="text-xs font-display font-semibold text-green-600 hover:text-green-800
                              cursor-pointer"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </div>
                <input
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-green-500"
                  type="password"
                  placeholder="Enter your password"
                />
                {errors.password ? (
                  <p className="text-red-500">{errors.password} !</p>
                ) : null}
              </div>
              {errors.invalidCredentials ? (
                <h4 className="text-red-500 text-center">
                  {errors.invalidCredentials} !
                </h4>
              ) : null}
              <div className="mt-10">
                <button
                  className="bg-green-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                      font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-green-600
                      shadow-lg"
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
              Don't have an account ?{" "}
              <a className="cursor-pointer text-green-600 hover:text-green-800">
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-green-100 flex-1 h-screen">
        <img
          className="h-screen object-cover "
          src="https://images.unsplash.com/photo-1621442745928-8f8d98021f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80"
          alt="nike shoes"
        />
      </div>
    </div>
  );
}

export default Login;
