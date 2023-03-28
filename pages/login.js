import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
function login({ tostSuccess, tostError, setProgress, viewRoles }) {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  let rout = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      rout.push("/");
    }
  }, [rout.query]);
  const [loginForm, setLogin] = useState({
    email: "",
    password: "",
  });

  let onChange = (e) => {
    setLogin({ ...loginForm, [e.target.name]: e.target.value });
  };
  let handle = async (e) => {
    try {
      e.preventDefault();
      axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
        console.log(response);
      });
      setProgress(20);
      let url = `${HOST}/api/login`;
      let data = {
        email: loginForm.email,
        password: loginForm.password,
      };

      let res = await axios.post(url, data);
      setProgress(40);
      let value = await res.data;
      setProgress(60);
      console.log(value.data);
      console.log(value.data.user.id);
      if (value.status) {
        localStorage.setItem("token", value.data.token);
        localStorage.setItem("role", value.data.role);
        localStorage.setItem("name", value.data.user.name);
        localStorage.setItem("email", value.data.user.email);
        localStorage.setItem("id", value.data.user.id);
        tostSuccess("Login Success");
        setProgress(60);
        setTimeout(() => {
          rout.push("");
        }, 1000);
        setProgress(100);
      }
    } catch (error) {
    console.log(error);}
  };
  return (
    <>
      <div className="bg-blue-900 p-6 from-blue-700 bg-gradient-to-r ">
        <div className="flex flex-col text-center w-full   mt-4 mb-2 ">
         
        </div>
      </div>
      <section className="p-4">
        <div className="container py-4 h-full mx-auto">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20 bg-blue-600 p-10 rounded-3xl ">
              <div className=" flex justify-center mb-8">
                <div className="  justify-center ">
                  <Image
                    width={160}
                    height={40}
                    src={"/images/ota.png"}
                  ></Image>
                </div>
              </div>
              <h1 className="my-4 m-auto text-center cursor-pointer text-6xl sm:text-7xl  font-bold   text-white">
                {" "}
                Hello
                <span>
                  {" "}
                  <Link
                    href={"/login"}
                    className="text-white mt-1 mb-8 sm:text-lg  font-normal text-center flex  text-sm "
                  >
                    Sign in to your Account ?
                  </Link>
                </span>
              </h1>

              <form className="my-8" onSubmit={handle}>
                <div className="mb-4">
                  <input
                    type="email"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-blue-600 bg-clip-padding border-2 border-solid border-gray-100 rounded transition ease-in-out m-0 focus:text-gray-100 focus:bg-blue-600 focus:border-blue-600 focus:outline-white"
                    placeholder="Email"
                    name="email"
                    onChange={onChange}
                    value={loginForm.email}
                    htmlFor="email"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-white bg-blue-600 bg-clip-padding border-2 border-solid border-gray-100 rounded transition ease-in-out m-0 focus:text-gray-100 focus:bg-blue-600 focus:border-blue-600 focus:outline-white"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                    value={loginForm.password}
                    htmlFor="password"
                  />
                </div>
                <div className="flex justify-end my-8">
                  <div className=" px-7 sm:py-3 py-2  text-white uppercase font-medium text-2xl leading-snug flex justify-end   focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-700 active:shadow-lg transition duration-150 ease-in-out w-full">
                    <button>Sign in</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default login;
