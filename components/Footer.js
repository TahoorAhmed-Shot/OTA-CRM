import React from "react";

function Footer() {
  return (
    <>
      <footer className="p-3 mt-52 bg-slate-50 rounded-sm shadow md:flex md:items-center md:justify-between md:p-4 dark:bg-gray-800">
        <span className="text-sm text-blue-600 sm:text-center dark:text-gray-800">
          © 2023 <a className="hover:underline"></a>
          CRM.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-900 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
