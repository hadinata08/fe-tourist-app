import { message } from "antd";
import { useCallback, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { icons } from "../../assets";
import LoginPage from "../../components/organisms/LoginPage";
import RegisterPage from "../../components/organisms/RegisterPage";
import { useLogin } from "../../hooks/useLogin";
import { useRegister } from "../../hooks/useRegister";
import { FormLoginInput } from "../../types/FormLoginInput";
import { FormRegisterInput } from "../../types/FormRegisterInput";

const LoginOrRegister = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const storeLogin = useLogin({
    enabled: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      message.success(res.data.message);
      localStorage.setItem("token", res?.data?.data?.Token);
      localStorage.setItem("email", res?.data?.data?.Email);
      localStorage.setItem("id", res?.data?.data?.Id);
      localStorage.setItem("name", res?.data?.data?.Name);

      navigate("/tourism-list");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (res: any) => {
      message.error(res.response.data.message);
    },
  });

  const storeRegister = useRegister({
    enabled: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      message.success(res.data.message);
      setTimeout(() => setIsLogin(true), 500);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (res: any) => {
      message.error(res.response.data.message);
    },
  });

  const onSubmitLogin: SubmitHandler<FormLoginInput> = useCallback(
    async (data) => {
      await storeLogin.handleFetch(data);
    },
    [storeLogin]
  );

  const onSubmitRegister: SubmitHandler<FormRegisterInput> = useCallback(
    async (data) => {
      await storeRegister.handleFetch(data);
    },
    [storeRegister]
  );

  return (
    <div className="flex flex-col">
      <div className=" flex justify-start mx-8 my-4">
        <img
          src={icons.Logo}
          alt="logo"
          width={40}
          height={40}
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="flex w-full justify-center items-center">
        <div>
          <img src={icons.bgLogin} alt="bg-login" />
        </div>
        <div className="flex flex-col text-black">
          <p className=" pb-5 text-2xl font-thin">Welcome !</p>
          <p className=" font-medium text-3xl">
            {isLogin ? "Sign in to" : "Sign up to"}{" "}
          </p>
          <p className=" text-sm">Tourism Tracker</p>

          {isLogin ? (
            <LoginPage onSubmit={onSubmitLogin} />
          ) : (
            <RegisterPage onSubmit={onSubmitRegister} />
          )}
          <p className=" text-center mt-10 font-thin text-sm w-96">
            Don’y have an Account ?{" "}
            <span
              className="font-bold cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
