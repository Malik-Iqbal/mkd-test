import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import MkdSDK from "../utils/MkdSDK";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { showToast, GlobalContext } from "../globalContext";

const AdminLoginPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const { dispatch } = React.useContext(AuthContext);
  const { globalDispatch } = React.useContext(GlobalContext);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let sdk = new MkdSDK();
    //TODO
    // sdk.login(data.email,data.password,"admin")
    const response = await sdk.login(data.email, data.password, "admin");
    if (response?.error === false) {
      // if (response && Object.keys(response)?.length > 0) {
      localStorage.setItem("role", response?.role);
      localStorage.setItem("token", response?.token);
      // API call to check user token
      const checkUser = await sdk.check(response?.role);
      if (checkUser?.error === false) {
        // exist move to dashboard page and store userData
        dispatch({
          type: "LOGIN",
          role: response?.role,
          isAuthenticated: true,
        });
        showToast(globalDispatch, "LogedIn Successfully", 4000);
        navigate("/admin/dashboard");
      } else {
        // not exit remove localStorage
        localStorage.removeItem("role", response?.role);
        localStorage.removeItem("token", response?.token);
      }
    }
  
    
    // console.log(responce,"responce-")
  };
  React.useEffect(() => {
    //TODO
    const role = localStorage.getItem("role");
    console.log("role",role)
    if (role) {
      navigate("/admin/dashboard");
    }
  }, []);
  return (
    <div className="w-full max-w-xs mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 "
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="******************"
            {...register("password")}
            className={`shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password?.message ? "border-red-500" : ""
            }`}
          />
          <p className="text-red-500 text-xs italic">
            {errors.password?.message}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            value="Sign In"
          />
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPage;
