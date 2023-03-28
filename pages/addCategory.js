import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Script from "next/script";
const addCategory = ({ getData, userData, tostSuccess, tostError ,viewRoles}) => {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const [toggelCart, setToggelCart] = useState(false);
  const router = useRouter();
  const [formValue, setValue] = useState({
    name: "",
    team_lead: "",
  });

  useEffect(() => {
    getData();
  }, [router.query]);

  const onChange = (e) => {
    setValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handelregister = async (e) => {
    e.preventDefault();

    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      console.log(response);
    });
    // add USER

    try {
      let url = `${HOST}/api/admin/categories`;
      let params = {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: formValue.name,
          team_lead: formValue.team_lead,
        }),
      };
      console.log(url);
      let res = await fetch(url, params);
      console.log(res);
      console.log(params.body);
      if (res.status == "200") {
        tostSuccess("new Category created succesfully");
        setValue({ name: "", team_lead: "" });
          setTimeout(() => {
            router.push("/category");
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
            className="w-full max-w-xl drop-shadow-lg  my-4 "
          >
            <div className="sm:flex sm:flex-wrap sm:-mx-3 sm:mb-6 justify-center ">
              <div className="w-auto  md:w-80 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={onChange}
                  value={formValue.name}
                />
              </div>
            </div>
            <div className="sm:flex sm:flex-wrap sm:-mx-3 sm:mb-3 justify-center my-4">
              <div
                className="w-auto  md:w-80 px-3 mb-6 md:mb-0"
                onClick={() => {
                  {
                    if (toggelCart == false) {
                      setToggelCart(true);
                    } else {
                      setToggelCart(false);
                    }
                  }
                }}
              >
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="Team_lead_id"
                >
                  User
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="text"
                  type="text"
                  placeholder="User_Id"
                  onChange={onChange}
                  value={formValue.team_lead}
                />
              </div>
            </div>

            <div class="z-10 m-auto bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"> 
            {toggelCart &&
              userData.map((value) => {
                return (
                    <ul
                      key={value.id}
                      class="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          onClick={() => {
                            setToggelCart(false);
                            setValue({
                              name: formValue.name,
                              team_lead: value.id,
                            });
                          }}
                          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {value.name}
                        </a>
                      </li>
                    </ul>
                );
              })}
              </div>
            
            <div className="my-8 justify-center flex">
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

export default addCategory;

