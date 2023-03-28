import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { validEmail, validPassword } from "./regex.js";
const addUser = ({
  userRoles,
  handelroles,
  tostSuccess,
  tostError,
  viewRoles,
}) => {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const [toggelCart, setToggelCart] = useState(false);
  const router = useRouter();
  const [formValue, setValue] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  
 console.log(formValue);
  useEffect(() => {
    console.log("Hellow");
    handelroles();
  }, [router.query]);

  useEffect(() => {
   if (!localStorage.getItem("token")) {
    router.push("/login")
  }
  }, [router.query]);

  const onChange = (e) => {
    let value=e.target.value

    setValue({ ...formValue, [e.target.name]: value });
    
  };

  

  const handelregister = async (e) => {
    e.preventDefault();
  
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      console.log(response);
    });
    // CREATE USER

    try {
      let url = `${HOST}/api/admin/users`;
      let params = {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
          role: formValue.role,
        }),
      };
      let res = await fetch(url, params);
      console.log(res);
      if (res.status == "200") {
        tostSuccess("new user has been created");
        setValue({ name: "", email: "", password: "", role: "" });
            setTimeout(() => {
              router.push("/users");
            }, 1300);
      }
    } catch (error) {
      console.log(error);
    }
  };


  


  return (
    <>
      <div className="bg-blue-900 p-3 from-blue-700 bg-gradient-to-r rounded-br-full shadow-xl shadow-slate-600 ">
        <div className="flex flex-col text-center w-full   mt-4 mb-2   ">
          <h1 className="sm:text-4xl text-3xl uppercase font-semibold  title-font  text-white">
            {viewRoles.value}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed font-normal text-white text-sm">
            CEO
          </p>
        </div>
      </div>
      <div className="p-4">
        <div className=" flex justify-center my-12">
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
          <form
            onSubmit={handelregister}
            className="w-full max-w-xl drop-shadow-lg  my-4   "
          >
            <div className="sm:flex sm:flex-wrap sm:-mx-3 sm:mb-6 justify-center ">
              <div className="w-auto  md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide  text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 border-blue-600  text-gray-700 border-2  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={onChange}
                  value={formValue.name}
                  required
                  minLength={5}
                  maxLength={40}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={onChange}
                  value={formValue.email}
                  required
                  minLength={5}
                  maxLength={36}
                />
              </div>
            </div>
            <div className="sm:flex sm:flex-wrap sm:-mx-3 sm:mb-3 justify-center my-4">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="password"
                  type="password"
                  placeholder="******************"
                  name="password"
                  onChange={onChange}
                  value={formValue.password}
                  minLength={8}
                  maxLength={30}
                  required
                  
                />
              </div>
            </div>
            <div
              onClick={() => {
                {
                  if (toggelCart == false) {
                    setToggelCart(true);
                  } else {
                    setToggelCart(false);
                  }
                }
              }}
              className="sm:flex sm:flex-wrap sm:-mx-3 sm:mb-3 justify-center my-4"
            >
              <div className="w-1/2 px-3  ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  className="aappearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Role"
                  onChange={onChange}
                  value={formValue.role}
                  required
                />
              </div>
            </div>
            <div class="z-10 m-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              {toggelCart &&
                userRoles.roles.map((roles, index) => {
                  return (
                    <ul
                      key={index}
                      class="py-2 text-sm text-gray-700  dark:text-gray-200"
                    >
                      <li>
                        <a
                          onClick={() => {
                            setToggelCart(false);
                            setValue({
                              name: formValue.name,
                              email: formValue.email,
                              password: formValue.password,
                              role: roles.name,
                            });
                          }}
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {roles.name}
                        </a>
                      </li>
                    </ul>
                  );
                })}
            </div>

            <div className="my-8 sm:mx-0 mx-4">
              <button className="text-white mx-1 flex align-middle sm:my-0 mt-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-xl   items-center sm:px-3 sm:py-2 px-2 py-2 text-center">
                <span className=" align-middle mx-2 ">Create</span>
                <Image
                  className="block mt-1"
                  width={20}
                  height={20}
                  alt={"root"}
                  src={"/images/button.png"}
                ></Image>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default addUser;
