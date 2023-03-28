import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
export default function project({
  handelroles,
  userRoles,
  tostSuccess,
  tostError,
  setProgress,
  projectData,
  allproject,
  projectFilterData,
  setProjectData,
  viewRoles,
}) {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const ref = useRef();
  const router = useRouter();
  const [toggel, settoggel] = useState(false);
  const [deleteToggel, setDeleteToggel] = useState(false);
  const [toggelCart, setToggelCart] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState([]);
  const [formValue, setValue] = useState({
    name: "",
    email: "",
    roles: "",
    id: "",
  });
  let allstatus = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {});

    let url = `${HOST}/api/admin/project-status`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let res = await axios(url, params);

    let data = await res.data;
    setStatus(data);
  };

  const onSearch = (e) => {
    let getSearchData = e.target.value;
    setQuery(getSearchData);
    if (getSearchData.length > 0) {
      let SearchData = projectFilterData.filter((item) => {
        return item.name.toLowerCase().includes(getSearchData.toLowerCase());
      });
      setProjectData(SearchData);
    } else {
      setProjectData(projectFilterData);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      allstatus();
    } else {
      router.push("/login");
    }
  }, [router.query]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      allproject();
    } else {
      router.push("/login");
    }
  }, [router.query]);

  const onChange = (e) => {
    setValue({ ...formValue, [e.target.name]: e.target.value });
  };

  let Update = (currentUser) => {
    settoggel(true);
    ref.current.classList.add("blur-sm");
    setValue({
      name: currentUser.name,
      email: currentUser.email,
      roles: currentUser.role_name,
      id: currentUser.id,
    });
  };

  let deleteuser = (currentUser) => {
    ref.current.classList.add("blur-sm");
    setDeleteToggel(true);
    console.log(currentUser.id);
    setValue({
      name: currentUser.name,
      id: currentUser.id,
    });
  };

  const DeleteUser = async (userId) => {
    console.log(userId);
    let url = `${HOST}/api/admin/users/${userId}`;
    let params = {
      method: "DELETE",
      headers: {
        "Content-Type": " application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let res = await fetch(url, params);

    if (res.status === 200) {
      tostSuccess("User deleted successfuly");
      getData();
      setDeleteToggel(false);
    }
  };

  const updateUser = async (userId) => {
    console.log(userId);
    let url = `${HOST}/api/admin/users/${userId}`;
    let params = {
      method: "PUT",
      headers: {
        "Content-Type": " application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: formValue.name,
      }),
    };
    let res = await fetch(url, params);

    if (res.status === 200) {
      tostSuccess("User update successfully");
      getData();
      setDeleteToggel(false);
    }
  };
  console.log(status);

  return (
    <>
      <div className="bg-blue-900 p-3 from-blue-700 bg-gradient-to-r rounded-br-full shadow-xl shadow-slate-900  ">
        <div className="flex flex-col text-center w-full   mt-4 mb-2 ">
          <h1 className="sm:text-4xl text-3xl uppercase font-semibold  title-font  text-white">
            {viewRoles.value}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed font-normal text-white text-sm">
            CEO
          </p>
        </div>
      </div>
      <div ref={ref} className="p-4">
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

        <div className="my-2 w-full">
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl text-center text-blue-700 font-bold ">
              Projects
            </h1>
          </div>

          <div className="block sm:flex items-center  md:divide-x md:divide-gray-100 ">
            <form className="sm:pr-3 mb-4 sm:mb-0">
              <label htmlFor="products-search" className="sr-only">
                Search
              </label>
              <div className="mt-1 relative sm:w-64 xl:w-96">
                <input
                  type="text"
                  name="search"
                  id="project"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-900 focus:border-cyan-900 block w-full p-2.5"
                  placeholder="🍳  Search..."
                  value={query}
                  onChange={onSearch}
                />
              </div>
            </form>
            <div className="flex items-center sm:justify-end w-full ">
              <Link
                href={"/addProject"}
                data-modal-toggle="add-product-modal"
                className="text-white bg-blue-900 hover:bg-blue-900 focus:ring-4 focus:ring-blue-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
              >
                <svg
                  className="-ml-1 mr-2 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Add Projects
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-wrap">
          {status &&
            Object.keys(status).map((item) => {
              console.log(status);
              return (
                <div className="flex  mt-8 bg-blue-700 mx-5 w-44 rounded-2xl">
                  <div className="text-white  flex align-middle  bg-orange-500 hover:bg-yellow-500 focus:ring-4 focus:ring-red-200 font-medium rounded-2xl text-xl   items-center px-7 ">
                    <Image
                      className="block"
                      width={25}
                      height={20}
                      alt={"root"}
                      src={"/images/total.png"}
                    ></Image>
                  </div>

                  <div className="text-white focus:ring-4  focus:ring-red-200 mx-1 font-medium text-2xl    ">
                    <div className="text mt-2 mx-1">
                      <p className="text-2xl ">{status[item].projectAll}</p>
                    </div>
                    <span className=" mb-2 font-normal text-sm mx-1 flex ">
                      <p>Total project</p>
                    </span>
                  </div>
                </div>
              );
            })}
          {status &&
            Object.keys(status).map((item) => {
              return (
                <div className="flex  mt-8 bg-blue-700 mx-5  w-44 rounded-2xl">
                  <div className="text-white  flex align-middle  bg-blue-500 hover:bg-blue-500 focus:ring-4 focus:ring-red-200 font-medium rounded-2xl text-xl   items-center px-7 ">
                    <Image
                      className="block"
                      width={25}
                      height={20}
                      alt={"root"}
                      src={"/images/progress.png"}
                    ></Image>
                  </div>

                  <div className="text-white focus:ring-4  focus:ring-red-200 mx-1 font-medium text-2xl    ">
                    <div className="text mt-2 mx-1">
                      <p className="text-2xl ">{status[item].projectPending}</p>
                    </div>
                    <span className=" mb-2 font-normal text-sm mx-1 flex ">
                      <p>in progress</p>
                    </span>
                  </div>
                </div>
              );
            })}
          {status &&
            Object.keys(status).map((item) => {
              return (
                <div className="flex  mt-8 bg-blue-700 mx-5  w-44 rounded-2xl">
                  <div className="text-white  flex align-middle  bg-green-500 hover:bg-green-500 focus:ring-4 focus:ring-red-200 font-medium rounded-2xl text-xl   items-center px-7 ">
                    <Image
                      className="block"
                      width={25}
                      height={20}
                      alt={"root"}
                      src={"/images/complete.png"}
                    ></Image>
                  </div>

                  <div className="text-white focus:ring-4  focus:ring-red-200 mx-1 font-medium text-2xl    ">
                    <div className="text mt-2 mx-1">
                      <p className="text-2xl ">
                        {status[item].projectCompleted}
                      </p>
                    </div>
                    <span className=" mb-2 font-normal text-sm mx-1 flex ">
                      <p>completed</p>
                    </span>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="container px-1 py-8  mx-auto ">
          <div className="flex flex-wrap justify-center ">
            {projectData &&
              projectData.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={`xl:w-1/4 lg:w-1/2 md:w-1/2 w-96  mx-5 my-3  shadow-slate-900 shadow-lg rounded-2xl ${
                      index % 2 !== 0 ? "bg-blue-600 " : "bg-blue-900"
                    } hover:shadow-md  hover:-translate-y-2 hover:bg-blue-700 duration-500 hover:scale-105 border-opacity-60`}
                  >
                    <Link href={`/project/${item.id}`}>
                      <h1 className="text-xs  sm:text-sm text-white my-4 font-medium mx-5 title-font mb-4">
                        {item.created_at.split("").slice(0, 10)}
                      </h1>
                      <h2 className="text-2xl  sm:text-3xl text-slate-100   font-semibold  title-font mt-4 mb-1 mx-5">
                        {item.name}
                      </h2>
                      <div className="flex flex-wrap sm:h-28 h-32  ">
                        <p className="text-lg text-white   font-light   my-1 mx-5">
                          {item.project_description.slice(0, 130)} ....
                        </p>
                      </div>
                    </Link>
                    <div className=" mt-6 mx-5 mb-5 align-middle">
                      <div className=" flex align-middle ">
                        <div>
                          <button className="absolute   z-30   ">
                            <img
                              className="w-9 h-9  rounded-full "
                              src="https://www.sukhothai.in/wp-content/uploads/2016/07/male-passport-size-2.jpg"
                            />
                          </button>
                          <button className=" absolute ml-4 z-20 ">
                            <img
                              className="w-9 h-9  rounded-full "
                              src="https://www.sukhothai.in/wp-content/uploads/2016/07/male-passport-size-2.jpg"
                            />
                          </button>
                          <button className="rounded-full absolute ml-8 z-10">
                            <img
                              className="w-9 h-9  rounded-full "
                              src="https://www.sukhothai.in/wp-content/uploads/2016/07/male-passport-size-2.jpg"
                            />
                          </button>
                          <button className="w-9 h-9 rounded-full  bg-green-600 opacity-100 z-50 ml-14 items-center  text-white  flex p-2 align-middle ">
                            <svg
                              className="m-auto   "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        <button className="py-1.5 px-2 ml-auto bg-white rounded-md text-blue-500 font-semibold text-sm">
                          {item.deadline}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {deleteToggel && (
        <span className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative bg-white rounded-lg  shadow-2xl shadow-slate-900 dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-900 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={() => {
                  ref.current.classList.remove("blur-sm");
                  setDeleteToggel(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-red-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this user{" "}
                  <span className="text-red-900 font-normal">
                    {formValue.name}
                  </span>
                </h3>
                <button
                  onClick={() => {
                    DeleteUser(formValue.id);
                    ref.current.classList.remove("blur-sm");
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-900 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-900 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, sure
                </button>
                <button
                  onClick={() => {
                    ref.current.classList.remove("blur-sm");
                    setDeleteToggel(false);
                  }}
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-gray-900"
                >
                  No cancel
                </button>
              </div>
            </div>
          </div>
        </span>
      )}

      {/* Edit Form */}
      {toggel && (
        <span className="fixed inset-0 z-10 overflow-y-auto  ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left  shadow-2xl shadow-slate-900 transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form className="rounded px-8 pt-6 pb-2 mb-1">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name*
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formValue.name}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    email*
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={formValue.email}
                    onChange={onChange}
                  />
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
                  className="mb-2"
                >
                  <label
                    className="block text-gray-700 text-sm font-semibold mb-2"
                    htmlFor="roles"
                  >
                    roles*
                  </label>
                  <div>
                    <input
                      className="p-2 text-black border"
                      id="roles"
                      type="text"
                      value={formValue.roles}
                      onChange={() => {
                        console.log("Text Update");
                      }}
                    />
                  </div>
                </div>
                {toggelCart &&
                  userRoles.roles.map((roles) => {
                    return (
                      <div
                        key={roles.id}
                        className="w-48 my-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-900 dark:text-white"
                      >
                        <div className="my-1 text-center  cursor-pointer">
                          <p
                            onClick={() => {
                              ref.current.classList.remove("blur-sm");
                              ChangeRoles(formValue.id, roles.id);
                              setToggelCart(false);
                            }}
                            value={roles.name}
                          >
                            {roles.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </form>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-7">
                <button
                  onClick={() => {
                    ref.current.classList.remove("blur-sm");
                    settoggel(false);
                    updateUser(formValue.id);
                  }}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-900 px-2 py-1 text-base font-normalont-medium text-white shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    ref.current.classList.remove("blur-sm");
                    settoggel(false);
                    setToggelCart(false);
                  }}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-2 py-1 text-base font-normalont-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </span>
      )}
    </>
  );
}
