import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {BiLogIn} from "react-icons/bi"

function Navbar({ user, setkey, setuser }) {
 const [showCart, setshowCart] = useState(false)
  const router = useRouter();
      let handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear();
        router.push("/");
        setkey(Math.random());
        setuser({ value: null });
      };
  
  return (
    <>
      <nav
        className="flex-no-wrap relative flex w-full  items-center justify-between border-b border-blue-600 bg-blue-900  from-blue-700 bg-gradient-to-r py-4  shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start"
        
      >
        <div className="flex w-full flex-wrap items-center justify-between px-6 align-middle">
          <button
            className="block border-0 bg-transparent py-2 px-2.5 text-white hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          <div
            className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
            id="navbarSupportedContent1"
            data-te-collapse-item
          >
            {/* <a
              className="mt-2 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mt-0"
              href="#"
            >
              <img
                src="https://tecdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
                style={{ height: "15px" }}
                alt=""
                loading="lazy"
              />
            </a> */}

            <ul
              className="list-style-none mr-auto  flex flex-col pl-0 lg:flex-row"

            >
              <li className="lg:pr-2" >
                <Link
                  className=" text-slate-100 text-lg font-semibold hover:text-neutral-200 focus:text-neutral-00 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                  href={"/"}

                >
                  Dashboard
                </Link>
              </li>
          
            </ul>
          </div>

          {!user.value ? (
            <div className="relative mx-2 flex items-center text-white ">
              <button
                className="flex items-center mx-1  bg-red-600 py-1.5 px-3 font-semibold  rounded text-sm "
                id="dropdownMenuButton2"
                type="button"
                aria-expanded="false"
              >
                Login
              </button>
              <button
                className="flex items-center mx-1  bg-green-600 py-1.5 px-3 font-semibold  rounded text-sm  "
                id="dropdownMenuButton2"
                role="button"
                aria-expanded="false"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="relative flex items-center">
              <div
                className="relative"
                onMouseOver={() => {
                  setshowCart(true);
                }}
                onMouseLeave={() => {
                  setshowCart(false);
                }}
              >
                <a
                  className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
          
                
                >
                  <img
                    src="https://www.sukhothai.in/wp-content/uploads/2016/07/male-passport-size-2.jpg"
                    className="rounded-full"
                    style={{ height: "29px", width: "29px" }}
                    alt=""
                    loading="lazy"
                  />
                </a>
                {showCart && (
                  <ul
                    className="absolute left-auto right-0 z-[1000] float-left m-0  min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li>
                      <Link
                        className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        href={"/profile"}
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        href={"/resetPassword"}
                      >
                        Reset Password
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="block w-full whitespace-nowrap cursor-pointer bg-transparent py-2 px-4 text-sm font-normal text-red-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
