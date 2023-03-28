import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEdit } from "react-icons/fa";
function profile({
  viewRoles,
  userName,
  userEmail,
  userId,
  tostSuccess,
  setkey,
}) {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const router = useRouter();

  useEffect(() => {}, [router.query]);
  const [toggel, settoggel] = useState(false);
  const ref = useRef();
  const [formValue, setValue] = useState({
    name: "",
    email: "",
  });

  let updateCoustomer = () => {
    ref.current.classList.add("blur-sm");
    settoggel(true);
    setValue({
      name: userName.value,
      email: userEmail.value,
    });
  };

  const onChange = (e) => {
    let value = e.target.value;
    setValue({ ...formValue, [e.target.name]: value });
  };

  const handelUpdateProfile = async (Id) => {
    let url = `${HOST}/api/admin/users/${Id.value}`;
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
    let value = await res.json();
    if(res.status == 200){ 
      localStorage.setItem("name", value.data.user.name);
      tostSuccess(value.message);
      setTimeout(() => { 
        window.location.reload(); 
      }, 1000);
    }
  
  };

  return (
    <>
      <div className="bg-blue-900 from-blue-700 bg-gradient-to-r rounded-br-full shadow-xl shadow-slate-600  ">
        <div className="flex flex-col text-center w-full   p-4 mb-2 ">
          <h1 className="sm:text-4xl text-3xl uppercase font-semibold  title-font  text-white">
            {viewRoles.value}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed font-normal text-white text-sm">
            CEO
          </p>
        </div>
      </div>
      <div ref={ref} className="flex items-center  my-9  w-full justify-center">
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
        <div className="lg:w-1/2  xl:w-1/2 md:w-8/12 mx-auto p-6  bg-slate-200 shadow-xl rounded-lg ">
          <div className="w-11 h-11 rounded-full my-2   ml-auto text-slate-900 text-center    font-semibold">
            <i
              onClick={updateCoustomer}
              className=" m-auto cursor-pointer text-2xl "
            >
              <FaEdit></FaEdit>
            </i>
          </div>

          <div className="  rounded-lg mx-auto ">
            <div className="  bottom-0  ">
              <button className="rounded-full flex mx-auto z-10">
                <img
                  className="w-28 h-28  rounded-full "
                  src="https://www.sukhothai.in/wp-content/uploads/2016/07/male-passport-size-2.jpg"
                />
              </button>
        
            </div>
            <div className="mt-5">
              <h3 className="text-center uppercase font-bold sm:text-3xl text-2xl text-slate-900 leading-8">
                {userName.value}
              </h3>

              <div className="relative flex flex-col my-6  mx-2 h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-xl bg-clip-border">
                <div className="p-3 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                  <div className="flex flex-wrap -mx-3">
                    <div className="flex items-center text-lg w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                      <div
                        data-target="tooltip"
                        className="px-2 py-1 text-center text-white bg-black rounded-lg text-size-sm hidden"
                        role="tooltip"
                        data-popper-placement="top"
                      >
                        Edit Profile
                        <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-auto px-3 my-2 mx-2">
                  <hr className="h-px mt-2 bg-transparent bg-gradient-horizontal-light" />
                  <ul className="flex flex-col pl-0  rounded-md text-lg my-6   ">
                    <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-size-sm text-inherit">
                      <strong className="text-slate-700">Full Name:</strong>{" "}
                      &nbsp;
                      {userName.value}
                    </li>

                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-size-sm text-inherit">
                      <strong className="text-slate-700">Email:</strong> &nbsp;
                      {userEmail.value}
                    </li>

                   
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-full max-w-full px-3 lg-max:mt-6 xl:w-4/12 mb-4 draggable"
        draggable="true"
      ></div>
      {toggel && (
        <span className="fixed inset-0 z-10 overflow-y-auto  ">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left  shadow-2xl shadow-slate-600 transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form className="w-full max-w-lg p-8">
                <div className="flex flex-wrap -mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="ddress"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="name"
                      type="text"
                      name="name"
                      value={formValue.name}
                      onChange={onChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className="w-full px-3 ">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="country"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-city"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={formValue.email}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </form>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => {
                    settoggel(false);
                    handelUpdateProfile(userId);
                    ref.current.classList.remove("blur-sm");
                  }}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-base font-normalont-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  update
                </button>
                <button
                  onClick={() => {
                    ref.current.classList.remove("blur-sm");
                    settoggel(false);
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

export default profile;
