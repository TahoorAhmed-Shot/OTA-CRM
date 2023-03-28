import React, { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function users({
  handelroles,
  userRoles,
  tostSuccess,
  tostError,
  setProgress,
  userData,
  getData,
  userFilterData,
  setUserData,
  viewRoles,
}) {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const router = useRouter();
  const [toggel, settoggel] = useState(false);
  const [deleteToggel, setDeleteToggel] = useState(false);
  const [toggelCart, setToggelCart] = useState(false);
  const [query, setQuery] = useState("");
  const [formValue, setValue] = useState({
    name: "",
    email: "",
    roles: "",
    id: "",
  });
  const ref = useRef();

  const onSearch = (e) => {
 
    let getSearchData = e.target.value;
    setQuery(getSearchData);
    if (getSearchData.length > 0) {
      let SearchData = userFilterData.filter((item) => {
        return item.name.toLowerCase().includes(getSearchData.toLowerCase());
      });
      setUserData(SearchData);
    } else {
      setUserData(userFilterData);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getData();
    } else {
      router.push("/login");
    }
  }, [router.query]);

  useEffect(() => {
    if (localStorage.getItem("role") === "admin") {
      handelroles();
    } else {
      router.push("/");
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

  const ChangeRoles = async (userId, roleId) => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      console.log(response);
    });
    try {
      let url = `${HOST}/api/admin/roles/change-role/${userId}/${roleId}`;
      let params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      let res = await fetch(url, params);
      console.log(res.status);
      if (res.status === 200) {
        tostSuccess("Role has been changed");
        getData();
        settoggel(false);
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <>
      <div className="bg-blue-900 p-3 from-blue-700 bg-gradient-to-r rounded-br-full shadow-xl shadow-slate-600  ">
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
              Users
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
                  id="User"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="🍳  Search for Users"
                  value={query}
                  onChange={onSearch}
                />
              </div>
            </form>
            <div className="flex items-center sm:justify-end w-full ">
              <Link
                href={"/addUser"}
                data-modal-toggle="add-product-modal"
                className="text-white bg-blue-800 hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2 text-center sm:ml-auto"
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
                Add Users
              </Link>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto  my-6   ">
          <table className="w-full text-sm text-left text-gray-500  dark:text-gray-400">
            <thead className="text-sm     dark:bg-gray-900 dark:text-gray-800">
              <tr className="border-b border-slate-500 ">
                <th scope="col" className="px-8 py-3 text-center  ">
                  No.
                </th>
                <th scope="col" className="px-6 py-3 "></th>
                <th scope="col" className="px-6 py-3 ">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Roles
                </th>
                <th scope="col" className="px-6 py-3 text-center ">
                  status
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {userData
                ? userData.map((user, index) => {
                    return (
                      <tr
                        key={user.id}
                        className="bg-white border-b border-slate-500 dark:bg-gray-900 text-base font-medium  text-slate-800 dark:border-gray-900"
                      >
                        <td className="px-1 py-4 text-center text-slate-500">
                          {index}
                        </td>
                        <td className=" px-6 py-4 text-gray-500   dark:text-white">
                          <img
                            className="w-14 h-14  rounded-full "
                            src="https://www.sukhothai.in/wp-content/uploads/2016/07/male-passport-size-2.jpg"
                          />
                        </td>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.role_name}</td>
                        <td className="px-6 py-4 text-center  ">
                          {" "}
                          {/* <span className="bg-green-600 sm:px-1.5  animate-pulse px-2 justify-center text-green-200  font-normal text-center text-base  flex py-1 align-middle  rounded-2xl">
                            active
                          </span>{" "} */}
                          <span className="bg-red-600 sm:px-1.5 px-2  animate-pulse flex justify-center text-red-300 font-normal text-center text-base  py-1 align-middle  rounded-2xl">
                            unactive
                          </span>{" "}
                        </td>

                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              Update(user);
                            }}
                            className="text-white mx-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm  inline-flex items-center sm:px-3 sm:py-2 py-2 px-2 text-center"
                          >
                            <svg
                              className="mr-2 h-5 w-5 "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                              <path
                                fillRule="evenodd"
                                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => deleteuser(user)}
                            className="text-white mx-1 sm:my-0 mt-1 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-sm  inline-flex items-center sm:px-3 sm:py-2 px-2 py-2 text-center"
                          >
                            <svg
                              className="mr-2 h-5 w-5 "
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>

      {deleteToggel && (
        <span className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative bg-white rounded-lg  shadow-2xl shadow-slate-600 dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                  <span className="text-red-600 font-normal">
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
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
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
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left  shadow-2xl shadow-slate-600 transition-all sm:my-8 sm:w-full sm:max-w-lg">
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
                 
                      
                        if (toggelCart == false) {
                          setToggelCart(true);
                        } else {
                          setToggelCart(false);
                        }
                      }
                 
                  }
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
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="roles"
                      type="text"
                      value={formValue.roles}
                      onChange={() => {
                        console.log("Text Update");
                      }}
                    />
                  </div>
                </div>
                <div class="z-10 m-auto  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                  {toggelCart &&
                    userRoles.roles.map((roles) => {
                      return (
                        <ul
                          key={roles.id}
                          class="py-2 text-sm  text-gray-700 dark:text-gray-200 "
                        >
                          <li>
                            <a
                              onClick={() => {
                                ref.current.classList.remove("blur-sm");
                                ChangeRoles(formValue.id, roles.id);
                                setToggelCart(false);
                              }}
                              value={roles.name}
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600  dark:hover:text-white"
                            >
                              {roles.name}
                            </a>
                          </li>
                        </ul>
                      );
                    })}
                </div>
              </form>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => {
                    ref.current.classList.remove("blur-sm");
                    settoggel(false);
                    updateUser(formValue.id);
                  }}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-base font-normalont-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
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
