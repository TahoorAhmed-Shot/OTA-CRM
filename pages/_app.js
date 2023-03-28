import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
export default function App({ Component, pageProps }) {
  let HOST = process.env.NEXT_PUBLIC_HOST;
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [user, setuser] = useState({ value: null });
  const [viewRoles, setRolesAbility] = useState({ value: null });
  const [userName, setName] = useState({ value: null });
  const [userEmail, setEmail] = useState({ value: null });
  const [userId, setId] = useState({ value: null });
  const [key, setkey] = useState();
  const [userRoles, setRoles] = useState();
  const [userData, setUserData] = useState();
  const [categoryData, setcategoryData] = useState();
  const [coustomerData, setcoustomerData] = useState();
  const [projectData, setProjectData] = useState();
  const [invoiceData, setInvoiceData] = useState();
  const [invoicFiltereData, setInvoiceFilterData] = useState();
  const [userFilterData, setuserFilterData] = useState();
  const [coustomerFilterData, setcoustomerFilterData] = useState();
  const [categoryFilterData, setCategoryFilterData] = useState();
  const [projectFilterData, setpojectFilterData] = useState();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const id = localStorage.getItem("id");
    if (token) {
      setuser({ value: token });
      setkey(Math.random());
    }
    if (role) {
      setRolesAbility({ value: role });
      setkey(Math.random());
    }
    if (name) {
      setName({ value: name });
      setkey(Math.random());
    }
    if (email) {
      setEmail({ value: email });
      setkey(Math.random());
    }
    if (id) {
      setId({ value: id });
      setkey(Math.random());
    }
  }, [router.query]);

  let getData = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      // console.log(response);
    });
    setProgress(20);
    let url = `${HOST}/api/admin/users`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let res = await axios(url, params);
    setProgress(40);
    let data = await res.data;
    setProgress(100);
    setUserData(data.data.users);
    setuserFilterData(data.data.users);
    
  };
    let allproject = async () => {
      axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
        // console.log(response);
      });
      setProgress(30);
      let url = `${HOST}/api/admin/projects`;
      let params = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };

      let res = await axios(url, params);
      setProgress(60);
      let data = await res.data;
      setProgress(80);
      setProjectData(data.projects);
      setpojectFilterData(data.projects);
      setProgress(100);
    };

  let handelroles = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      console.log(response);
    });
    let url = `${HOST}/api/admin/roles`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let res = await axios(url, params);
    let data = await res.data;
    setRoles(data);
  };

  // All categoryData
  let allCategory = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {});
    setProgress(30);
    let url = `${HOST}/api/admin/categories`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    let res = await axios(url, params);
    setProgress(60);
    let data = await res.data;
    setProgress(80);
    setcategoryData(data.categories);
    setCategoryFilterData(data.categories);
  
    setProgress(100);
  };

  // all Coustomers
  let allCoustomer = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      // console.log(response);
    });
    setProgress(30);
    let url = `${HOST}/api/admin/customers`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let res = await axios(url, params);
    setProgress(60);
    let data = await res.data;
    setProgress(80);
    setcoustomerData(data.customers);
    setcoustomerFilterData(data.customers);
    setProgress(100);
  };

  let allInvoice = async () => {
    axios.get(`${HOST}/sanctum/csrf-cookie`).then((response) => {
      // console.log(response);
    });
    setProgress(30);
    let url = `${HOST}/api/admin/invoices`;
    let params = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    let res = await axios(url, params);
    setProgress(60);
    let data = await res.data;
    console.log(data);
    setProgress(80);
    setInvoiceData(data.invoices);
    setInvoiceFilterData(data.invoices);
    setProgress(100);
  };


 
  // Alerts
  let tostSuccess = (value) => {
    toast.success(value, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  let tostError = (value) => {
    toast.error(value, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <Navbar
        key={key}
        setuser={setuser}
        viewRoles={viewRoles}
        user={user}
        setkey={setkey}
      ></Navbar>
      <LoadingBar
        color="black"
        progress={progress}
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />
      <Component
        handelroles={handelroles}
        userRoles={userRoles}
        viewRoles={viewRoles}
        userEmail={userEmail}
        userName={userName}
        userId={userId}
        user={user}
        setkey={setkey}
        {...pageProps}
        tostSuccess={tostSuccess}
        tostError={tostError}
        setProgress={setProgress}
        getData={getData}
        userData={userData}
        categoryData={categoryData}
        coustomerData={coustomerData}
        projectData={projectData}
        invoiceData={invoiceData}
        allCategory={allCategory}
        allCoustomer={allCoustomer}
        allproject={allproject}
        allInvoice={allInvoice}
        setUserData={setUserData}
        setcoustomerData={setcoustomerData}
        setcategoryData={setcategoryData}
        setProjectData={setProjectData}
        setInvoiceData={setInvoiceData}
        userFilterData={userFilterData}
        coustomerFilterData={coustomerFilterData}
        categoryFilterData={categoryFilterData}
        projectFilterData={projectFilterData}
        invoicFiltereData={invoicFiltereData}
      />
      <Footer></Footer>
    </>
  );
}
