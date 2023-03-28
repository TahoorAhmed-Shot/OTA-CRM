import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
const addProject = ({
  getData,
  userData,
  tostSuccess,
  tostError,
  categoryData,
  viewRoles,
  allCategory,
}) => {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const [coustomerCart, setcoustomerCart] = useState(false);
  const [categoryCart, setcategoryCart] = useState(false);
  const router = useRouter();
  const [formValue, setValue] = useState({
    name: "",
    managed_by: "",
    assigned_by: "",
    assigned_to: "",
    customer_id: "",
    category_id: "",
    deadline: "",
    project_description: "",
  });

  useEffect(() => {
    getData();
  }, [router.query]);

  useEffect(() => {
    allCategory();
  }, [router.query]);

  const onChange = (e) => {
    setValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handelregister = async (e) => {
    e.preventDefault();
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      console.log(response);
    });
    try {
      let url = `${HOST}/api/admin/projects`;
      let params = {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: formValue.name,
          managed_by: formValue.managed_by,
          assigned_by: formValue.assigned_by,
          assigned_to: formValue.assigned_to,
          customer_id: formValue.customer_id,
          category_id: formValue.category_id,
          deadline: formValue.deadline,
          project_description: formValue.project_description,
        }),
      };
      let res = await fetch(url, params);
      let data = await res.json();
   console.log(data);
      if (res.status == "200") {
        tostSuccess(data.message);
        setValue({
          name: "",
          managed_by: "",
          assigned_by: "",
          assigned_to: "",
          customer_id: "",
          category_id: "",
          deadline: "",
          project_description: "",
        });
        setTimeout(() => {
          router.push("/projects");
        }, 1000);
      } else if (!res.ok) {
        tostError("Invalid Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formValue);
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
      <div className=" p-4  ">
        <div className=" flex justify-center my-12  ">
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
            className="w-full max-w-xl drop-shadow-lg  my-4  "
          >
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  placeholder="name"
                  name="name"
                  onChange={onChange}
                  value={formValue.name}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="company"
                >
                  managed_by
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-100"
                  id="managed_by"
                  type="text"
                  placeholder="managed_by"
                  onChange={onChange}
                  value={formValue.managed_by}
                  name="managed_by"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3  md:w-1/2 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="ddress"
                >
                  assigned_by
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-100"
                  id="assigned_by"
                  type="text"
                  name="assigned_by"
                  placeholder="assigned_by"
                  value={formValue.assigned_by}
                  onChange={onChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  assigned_to
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-100"
                  id="grid-city"
                  type="text"
                  placeholder="assigned_to"
                  name="assigned_to"
                  value={formValue.assigned_to}
                  onChange={onChange}
                />
              </div>
              <div
                onClick={() => {
                  if (coustomerCart == false) {
                    setcoustomerCart(true);
                    setcategoryCart(false);
                  } else {
                    setcoustomerCart(false);
                  }
                }}
                className="w-full md:w-1/2 px-3 mb-6 "
              >
                <label
                  className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  customer_id
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-100"
                  id="grid-city"
                  type="text"
                  placeholder="coustomer"
                  value={formValue.customer_id}
                  onChange={onChange}
                />

                <div className="z-10 m-auto  divide-y  rounded-lg shadow w-auto dark:bg-gray-700">
                  {coustomerCart &&
                    userData &&
                    userData.map((value) => {
                      return (
                        <ul
                          key={value.id}
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <a
                              onClick={() => {
                                setcategoryCart(false);
                                setValue({
                                  name: formValue.name,
                                  managed_by: formValue.managed_by,
                                  assigned_by: formValue.assigned_by,
                                  assigned_to: formValue.assigned_to,
                                  customer_id: value.id,
                                  category_id: formValue.category_id,
                                  deadline: formValue.deadline,
                                  project_description:
                                    formValue.project_description,
                                });
                              }}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {value.name}
                            </a>
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </div>
              <div
                onClick={() => {
                  if (categoryCart == false) {
                    setcategoryCart(true);
                    setcoustomerCart(false);
                  } else {
                    setcategoryCart(false);
                  }
                }}
                className="w-full md:w-1/2 px-3 mb-6 "
              >
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  category_id
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-100  "
                  id="category_id"
                  type="text"
                  placeholder="category"
                  value={formValue.category_id}
                  onChange={onChange}
                />
                <div className="z-10 m-auto  divide-y  rounded-lg shadow w-auto dark:bg-gray-700">
                  {categoryCart &&
                    categoryData &&
                    categoryData.map((value) => {
                      return (
                        <ul
                          key={value.id}
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <li>
                            <a
                              onClick={() => {
                                setcategoryCart(false);
                                setValue({
                                  name: formValue.name,
                                  managed_by: formValue.managed_by,
                                  assigned_by: formValue.assigned_by,
                                  assigned_to: formValue.assigned_to,
                                  customer_id: formValue.customer_id,
                                  category_id: value.id,
                                  deadline: formValue.deadline,
                                  project_description:
                                    formValue.project_description,
                                });
                              }}
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              {value.name}
                            </a>
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </div>
              <div className="w-full m-auto  px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="status"
                >
                  DeadLine
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-100"
                  id="status"
                  type="date"
                  placeholder="status"
                  name="deadline"
                  value={formValue.deadline}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className=" mt-6 md:mb-0 mx-auto">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="status"
              >
                Description
              </label>
              <textarea
                required
                rows={8}
                cols={4}
                className="appearance-none block w-1/2  bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-100"
                id="status"
                type="text"
                placeholder="description"
                name="project_description"
                value={formValue.project_description}
                onChange={onChange}
                maxLength={120}
              />
            </div>
            <div className="flex justify-center mt-8">
              <button className="text-white mx-1 flex align-middle sm:my-0 mt-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-xl   items-center sm:px-3 sm:py-2 px-2 py-2 text-center">
                <span className=" align-middle mx-2 ">Create Project</span>
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

export default addProject;
