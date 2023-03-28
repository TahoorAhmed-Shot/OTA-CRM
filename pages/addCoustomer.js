import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
const addCoustomer = ({
  getData,
  userData,
  tostSuccess,
  tostError,
  viewRoles,
}) => {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const [toggelCart, setToggelCart] = useState(false);
  const router = useRouter();
  const [formValue, setValue] = useState({
    name: "",
    company_name: "",
    company_address: "",
    company_country: "",
    company_city: "",
    company_phone: "",
    company_email: ""

  });

  useEffect(() => {
    getData();
  }, [router.query]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
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
      let url = `${HOST}/api/admin/customers`;
      let params = {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: formValue.name,
          company_name: formValue.company_name,
          company_address: formValue.company_address,
          company_country: formValue.company_country,
          company_city: formValue.company_city,
          company_phone: formValue.company_phone,
          company_email: formValue.company_email

        }),
      };
      let res = await fetch(url, params);
      let data = await res.json();
      console.log(res);
      if (res.status == "200") {
        tostSuccess("coustomer created succesfully");
        setValue({
          name: "",
          company_name: "",
          company_address: "",
          company_country: "",
          company_city: "",
          company_phone: "",
          company_email: ""
    
        });
             setTimeout(() => {
               router.push("/coustomers");
             }, 1300);
      } else if (!res.ok) {
        tostError("Invalid Credentials");
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
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border-2 border-blue-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={formValue.name}
                  placeholder="Name"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="company"
                >
                  company_name
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="company_name"
                  type="text"
                  onChange={onChange}
                  value={formValue.company_name}
                  name="company_name"
                  placeholder="company"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="ddress"
                >
                  company_address
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="ddress"
                  type="address"
                  name="company_address"
                  value={formValue.company_address}
                  onChange={onChange}
                  placeholder="address"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/2 px-3 mb-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  company_country
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="country"
                  name="company_country"
                  value={formValue.company_country}
                  onChange={onChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="country"
                >
                  company_city
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="city"
                  name="company_city"
                  value={formValue.company_city}
                  onChange={onChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 ">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="phone"
                >
                  company_phone
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500  "
                  id="company_phone"
                  type="text"
                  placeholder="number"
                  name="company_phone"
                  value={formValue.company_phone}
                  onChange={onChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="company_email"
                >
                  company_email
                </label>
                <input
                  required
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="email"
                  type="email"
                  placeholder="email"
                  name="company_email"
                  value={formValue.company_email}
                  onChange={onChange}
                />
              </div>
             
            </div>
            <div className="flex justify-center mt-8">
              <button className="text-white mx-1 flex align-middle sm:my-0 mt-1 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-red-200 font-medium rounded-lg text-xl   items-center sm:px-3 sm:py-2 px-2 py-2 text-center">
                <span className=" align-middle mx-2 ">Create Coustomer</span>
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

export default addCoustomer;
