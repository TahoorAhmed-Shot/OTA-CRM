import React from "react";
import Link from "next/link";
import Image from "next/image";
function dashbord({ viewRoles }) {
  return (
    <>
      <div className="bg-blue-900 p-6 from-blue-700 bg-gradient-to-r ">
        <div className="flex flex-col text-center w-full   mt-4 mb-2 ">
          <h1 className="sm:text-4xl text-3xl uppercase font-semibold  title-font  text-white">
            {viewRoles.value}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed font-normal text-white text-sm">
            CEO
          </p>
        </div>
      </div>

      <div>
        <div className="text-gray-600 body-font">
          <div className="container px-5 py-8  mx-auto ">
            <div className="flex flex-wrap justify-center ">
              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-700   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Client
                </h2>

                <Link href={"/coustomers"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/trophy.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>

              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-500   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Project
                </h2>
                <Link href={"/projects"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/project.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>

              {viewRoles.value === "admin" && (
                <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-700   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                  <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                    Teams
                  </h2>

                  <Link href={"/users"} className=" items-center">
                    <div className=" flex justify-center ">
                      <Image
                        src={"/images/team.png"}
                        width={85}
                        height={90}
                      ></Image>
                    </div>
                  </Link>
                </div>
              )}

              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-500   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Message
                </h2>
                <Link href={"/reports"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/message.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-700   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Category
                </h2>
                <Link href={"/category"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/project.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-500   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Invo
                </h2>
                <Link href={"/reports"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/message.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-700   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Message
                </h2>
                <Link href={"/reports"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/message.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>
              <div className="xl:w-1/5 lg:w-1/3 md:w-1/3 px-8 py-6 mx-4  my-4 w-52 shadow-slate-900 shadow-lg rounded-2xl bg-blue-500   hover:shadow-md  hover:-translate-y-4 hover:bg-blue-800 duration-500 hover:scale-110 border-opacity-60">
                <h2 className="text-2xl text-center sm:text-3xl text-white  font-bold title-font mb-3">
                  Message
                </h2>
                <Link href={"/reports"}>
                  <div className=" flex justify-center ">
                    <Image
                      src={"/images/message.png"}
                      width={85}
                      height={90}
                    ></Image>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default dashbord;
