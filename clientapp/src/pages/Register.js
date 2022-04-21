import { ArrowCircleRightIcon } from "@heroicons/react/solid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
function Register() {
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("")

  const toreg2 = () => {
    navigate("/register2", { state: { id: 1, name: "sabaoon" } });
  };

  return (
    <div class="lg:flex ">
      <div class="lg:w-4/5 xl:max-w-screen-sm">
        <div className="h-10"></div>
        <div class="mt-4 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-12 xl:max-w-2xl">
          <h2
            class="text-center text-4xl text-green-900  font-semibold lg:text-left xl:text-3xl
          xl:text-bold mb-8"
          >
            Registration
          </h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors = {};
              let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
              if (!values.fname) {
                errors.fname = "First Name is Required*";
              }
              if (!values.lname) {
                errors.lname = "Last Name is Required*";
              }
              if (!values.utype || values.utype == "Select") {
                errors.utype = "Please Select Buyer or Seller*";
              }
              if (!values.province || values.province == "Select") {
                errors.province = "Please Select Province*";
              }
              if (!values.mobile) {
                errors.mobile = "Mobile Number is Required*";
              } else if (!values.mobile.match(phoneNo)) {
                errors.mobile = "Mobile Number format is incorrect";
              }

              if (values.altMobile && !values.altMobile.match(phoneNo)) {
                errors.altMobile = "Incorrect Mobile number format";
              }

              if (!values.landLine) {
                errors.landLine = "Land Line is Required*";
              } else if (!values.landLine.match(phoneNo)) {
                errors.landLine = "Land Line format is incorrect";
              }

              //email
              if (!values.email) {
                errors.email = "Email is Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              if (!values.password) {
                errors.password = "Password Is Required*";
              } else if (values.password.length < 6) {
                errors.password = "Password Is Too Short*";
              }

              if (!values.passwordConfirm) {
                errors.passwordConfirm = "Confirm Password Is Required*";
              } else if (values.password != values.passwordConfirm) {
                errors.passwordConfirm = "Passwords Not Matching*";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const requestOptions = {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: values.fname+" "+values.lname,
                      type: values.utype,
                      email: values.email,
                      password: values.password,
                      mobile1: values.mobile,
                      mobile2: values.altMobile,
                      landLine: values.landLine,
                      state: values.province
                   
                  }),
                };
                await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/initial-validate`, requestOptions).then((res) => res.json())
                .then((item) => {
                  console.log(item);
                  if( "errors" in item && "email" in item.errors){
                    setEmailError(item.errors.email);
                  }else if("success" in item){
                    if (values.utype == "Seller") {
                        navigate("/registerSeller", {state:values});
                      } else if (values.utype == "Buyer") {
                        navigate("/registerBuyer", {state:values});
                      }
                  }
                });
              } catch (error) {
                console.log(error)
              }
              
              // 
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div class="flex flex-wrap mx-auto mb-6">
                  <a
                    class="
                    inline-flex
                    items-center
                    justify-center
                    w-1/2
                    py-3
                    font-medium
                    leading-none
                    tracking-wider
                    text-green-500
                    bg-gray-100
                    border-b-2 border-green-500
                    rounded-t
                    sm:px-6 sm:w-auto sm:justify-start
                  "
                  >
                    STEP 1
                  </a>
                  <a
                    class="
                    inline-flex
                    items-center
                    justify-center
                    w-1/2
                    py-3
                    font-medium
                    leading-none
                    tracking-wider
                    border-b-2 border-gray-200
                    sm:px-6 sm:w-auto sm:justify-start
                    hover:text-gray-900
                  "
                  >
                    STEP 2
                  </a>
                </div>
                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-6 w-full group">
                    <input
                      type="text"
                      name="fname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fname}
                      id="floating_first_name"
                      class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                        errors.fname ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label
                      for="floating_first_name"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {errors.fname ? (
                        <span className="text-red-600">{errors.fname}</span>
                      ) : (
                        "First Name*"
                      )}
                    </label>
                  </div>
                  <div class="relative z-0 mb-6 w-full group">
                    <input
                      type="text"
                      name="lname"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lname}
                      id="floating_last_name"
                      class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                        errors.lname ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label
                      for="floating_last_name"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {errors.lname ? (
                        <span className="text-red-600">{errors.lname}</span>
                      ) : (
                        "Last Name*"
                      )}
                    </label>
                  </div>
                </div>

                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-4 w-full group">
                    <select
                      class={`block appearance-none w-full bg-gray-200 border  text-gray-700 py-2 mt-5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        errors.utype ? "border-red-500" : "border-gray-200"
                      }`}
                      id="grid-state"
                      name="utype"
                      value={values.utype}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option>Select</option>
                      <option>Buyer</option>
                      <option>Seller</option>
                    </select>
                    <label
                      for="floating_phone"
                      class="absolute text-lg  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mt-1"
                    >
                      {errors.utype ? (
                        <span className="text-red-600">{errors.utype}</span>
                      ) : (
                        "Buyer or Seller*"
                      )}
                    </label>
                  </div>
                  <div class="relative z-0 mb-4 w-full group lg:mt-0 mt-2">
                    <select
                      class={`block appearance-none w-full bg-gray-200 border  text-gray-700 py-2 mt-5 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${
                        errors.province ? "border-red-500" : "border-gray-200"
                      }`}
                      id="grid-state"
                      name="province"
                      value={values.province}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option>Select</option>
                      <option>Western</option>
                      <option>Eastern</option>
                      <option>Northern</option>
                      <option>Southern</option>
                      <option>North Western</option>
                      <option>Sabaragamuwa</option>
                      <option>Central</option>
                      <option>Uva</option>
                    </select>
                    <label
                      for="floating_phone"
                      class="absolute text-lg  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 mt-1"
                    >
                      {errors.province ? (
                        <span className="text-red-600">{errors.province}</span>
                      ) : (
                        "Province*"
                      )}
                    </label>
                  </div>
                </div>

                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-6 w-full group">
                    <input
                      type="phone"
                      name="mobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.mobile}
                      id="floating_first_name"
                      class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                        errors.mobile ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label
                      for="floating_first_name"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {errors.mobile ? (
                        <span className="text-red-600">{errors.mobile}</span>
                      ) : (
                        "Mobile Number*"
                      )}
                    </label>
                  </div>
                  <div class="relative z-0 mb-6 w-full group">
                    <input
                      type="phone"
                      name="altMobile"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.altMobile}
                      id="floating_last_name"
                      class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                        errors.altMobile ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label
                      for="floating_last_name"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {errors.altMobile ? (
                        <span className="text-red-600">{errors.altMobile}</span>
                      ) : (
                        "Mobile Alternative"
                      )}
                    </label>
                  </div>
                </div>

                <div class="grid xl:grid-cols-2 xl:gap-6">
                  <div class="relative z-0 mb-6 w-full group">
                    <input
                      type="phone"
                      name="landLine"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.landLine}
                      id="floating_first_name"
                      class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                        errors.landline ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    <label
                      for="floating_first_name"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {errors.landLine ? (
                        <span className="text-red-600">{errors.landLine}</span>
                      ) : (
                        "Land Line*"
                      )}
                    </label>
                  </div>
                  <div class="relative z-0 mb-6 w-full group">
                    <input
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="floating_last_name"
                      class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder=" "
                    />
                    {emailError ? (<p className="text-red-500">{emailError} !</p>):null}
                    
                    <label
                      for="floating_last_name"
                      class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      {errors.email ? (
                        <span className="text-red-600">{errors.email}</span>
                      ) : (
                        "Email*"
                      )}
                    </label>
                  </div>
                </div>

                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    id="floating_password"
                    class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder=" "
                  />
                  <label
                    for="floating_password"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {errors.password ? (
                      <span className="text-red-600">{errors.password}</span>
                    ) : (
                      "Password*"
                    )}
                  </label>
                </div>
                <div class="relative z-0 mb-6 w-full group">
                  <input
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    id="floating_repeat_password"
                    class={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2  appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer ${
                      errors.passwordConfirm
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder=" "
                  />
                  <label
                    for="floating_repeat_password"
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {errors.passwordConfirm ? (
                      <span className="text-red-600">
                        {errors.passwordConfirm}
                      </span>
                    ) : (
                      "Confirm Password*"
                    )}
                  </label>
                </div>

                <button
                  // onClick={toreg2}
                  type="submit"
                  disabled={isSubmitting}
                  class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Next
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      <div class="hidden lg:flex items-center justify-center bg-green-100 flex-1 h-screen">
        <img
          className="h-screen w-full object-cover "
          src="https://images.unsplash.com/photo-1564490292125-2e3c78a0ef44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="nike shoes"
        />
      </div>
    </div>
  );
}

export default Register;
