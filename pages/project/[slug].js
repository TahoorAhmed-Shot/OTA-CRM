import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function slug({ setProgress, viewRoles, tostError, tostSuccess }) {
  const ref = useRef();
  const router = useRouter();
  const { slug } = router.query;
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const [slugProject, setslugProject] = useState();
  const [toggel, settoggel] = useState(false);
  const [formValue, setValue] = useState({
    project_id: "",
    amount: "",
  });

  const onChange = (e) => {
    setValue({ ...formValue, [e.target.name]: e.target.value });
  };
  let singelProject = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      // console.log(response);
    });
    setProgress(30);
    let url = `${HOST}/api/admin/projects/${slug}`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let res = await fetch(url, params);
    setProgress(60);
    let data = await res.json();
    setProgress(80);
    setslugProject(data);
    console.log(data);
    setProgress(100);
  };

  

  const handelInvoice = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {});
    let url = `${HOST}/api/admin/invoices`;
    let params = {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        project_id: formValue.project_id,
        amount: formValue.amount,
      }),
    };
    let res = await fetch(url, params);
    if (res.ok) {
      tostSuccess("Invoice Created successfully");
      setTimeout(()=>{
       router.push("/viewInvoice")
      })
    }else{
     tostError("Error")
    }
  };
 
  useEffect(() => {
    singelProject();
  }, [router.query]);

  return (
    <>
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
      <main ref={ref} className="pt-8 pb-16 lg:pt-16 lg:pb-24 dark:bg-gray-900">
        <div className="flex justify-start px-4 mr-auto max-w-screen-lg ">
          {slugProject &&
            Object.keys(slugProject).map((item) => {
              console.log(slugProject[item]);
              return (
                <article
                  key={slug}
                  className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
                >
                  <header className="mb-4 lg:mb-6 not-format">
                    <address className="flex items-center mb-6 not-italic">
                      <div className="inline-flex items-center mr-3 text-sm text-gray-700 dark:text-white">
                        <div>
                          <a
                            rel="author"
                            className=" sm:text-4xl text-3xl font-bold text-gray-700 dark:text-white"
                          >
                            {slugProject[item].name}
                          </a>
                          <p className="text-base font-light text-gray-500 dark:text-gray-400">
                            Graphic Designer, educator & CEO Flowbite
                          </p>
                          <p className="text-base font-light text-gray-500 dark:text-gray-400">
                            <time>
                              {/* {item.created_at.split("").slice(0, 10)} */}
                            </time>
                          </p>
                        </div>
                      </div>
                    </address>
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-700 lg:mb-6 lg:text-4xl dark:text-white">
                      Description :-
                    </h1>
                  </header>
                  <p className="lead">
                    {slugProject[item].project_description}
                  </p>
                  {/* <div className="my-8">
                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                      Description :-
                    </h1>
                    <p>
                      Before going digital, you might benefit from scribbling
                      down some ideas in a sketchbook. This way, you can think
                      things through before committing to an actual design
                      project.
                    </p>
                    <p>
                      But then I found a{" "}
                      <a href="https://flowbite.com">
                        component library based on Tailwind CSS called Flowbite
                      </a>
                      . It comes with the most commonly used UI components, such
                      as buttons, navigation bars, cards, form elements, and
                      more which are conveniently built with the utility classes
                      from Tailwind CSS.
                    </p>
                  </div> */}
                  <div className="my-16 sm:mx-0 mx-4 flex justify-center">
                    <button
                      onClick={() => {
                        settoggel(true);
                        ref.current.classList.add("blur-sm");
                        setValue({
                          project_id: JSON.stringify(slugProject[item].id),
                          amount: formValue.amount,
                        });
                      }}
                      className="text-white mx-2 flex align-middle sm:my-0 mt-1 uppercase bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg sm:text-xl  text-base items-center sm:px-4 sm:py-2 px-3 py-2 text-center"
                    >
                      <span className=" align-middle mx-2 ">
                        Create Invoice
                      </span>
                    </button>

                    <Link href={"/viewInvoice"} className="text-white mx-2 flex align-middle sm:my-0 mt-1 uppercase bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg sm:text-xl text-base  items-center sm:px-4 sm:py-2 px-3 py-2 text-center">
                      <span className=" align-middle mx-2 ">view Invoice</span>
                    </Link>
                  </div>
                </article>
              );
            })}
        </div>
      </main>
      {toggel && (
        <span className="fixed inset-0 z-10 overflow-y-auto  ">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left  shadow-2xl shadow-slate-600 transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <form className="rounded px-8 pt-6 pb-2 mb-1">
         
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    amount
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="amount"
                    type="number"
                    placeholder="amount"
                    name="amount"
                    value={formValue.amount}
                    onChange={onChange}
                  />
                </div>
              </form>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={() => {
                    handelInvoice();
                    ref.current.classList.remove("blur-sm");
                    settoggel(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-2 py-1 text-base font-normalont-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create
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

export default slug;
