import React, { useState } from 'react'

function forgetPassword() {
   const [formValue, setValue] = useState({
     name: "",
     email: "",
     password: "",
     role: "",
   });

     const onChange = (e) => {
       let value = e.target.value;

       setValue({ ...formValue, [e.target.name]: value });
     };

  return (
    <>
  
<section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[80vh] lg:py-0">
          <h2 class="mb-4 text-2xl font-bold leading-tight tracking-tight text-blue-900 md:text-3xl dark:text-white">
              Forget Password
          </h2>
      <div class="w-full p-6 bg-white rounded-lg  dark:border md:mt-0 sm:max-w-lg dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <form class="mt-6 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
              </div>
              
              
            
              <button type="submit" class="w-full my-20 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Forget Password</button>
          </form>
      </div>
  </div>
</section>
    
    </>
  )
}

export default forgetPassword