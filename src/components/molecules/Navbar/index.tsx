/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown, MenuProps, Space } from "antd";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { icons } from "../../../assets";
import { MenuNavbar } from "../../../types/MenuNavbar";

type Props = { className?: string };

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const { className } = props;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokenSession: any = localStorage.getItem("token");
  const menuSession: any = localStorage.getItem("menu");

  const menu = [
    {
      title: "Home",
      isActive: true,
      redirect: "/",
      isShouldLogin: false,
      visible: true,
    },
    {
      title: "Tourists",
      isActive: false,
      redirect: "/tourism-list",
      isShouldLogin: true,
      visible: true,
    },
    {
      title: "Sign Up / Login",
      isActive: false,
      redirect: "/login",
      isShouldLogin: false,
      visible: tokenSession ? false : true,
    },
  ];

  const handleLogout = useCallback(() => {
    localStorage.setItem("token", "");
    window.location?.reload();
  }, []);

  const items: MenuProps["items"] = [
    {
      label: (
        <p className="text-black" onClick={() => navigate("/profile")}>
          Profile
        </p>
      ),
      key: "0",
    },
    {
      label: (
        <p className="text-black" onClick={handleLogout}>
          Logout
        </p>
      ),
      key: "1",
    },
  ];

  const onChange = useCallback(
    (route: string, menu: string) => {
      localStorage.setItem("menu", menu);

      navigate(route);
    },
    [navigate]
  );

  return (
    <div
      className={"flex w-full bg-white items-center justify-between px-12 ".concat(
        className || ""
      )}
    >
      <img
        src={icons.Logo}
        alt="logo"
        className="cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="flex gap-16">
        {menu?.map((item: MenuNavbar, index: number) => (
          <p
            key={index}
            className={`${
              menuSession === item.title
                ? "text-red-600 hover:text-red-800"
                : "text-[#8C8585] hover:text-black"
            } ${item.visible ? "visible" : "hidden"} cursor-pointer`}
            onClick={() => onChange(item.redirect, item.title)}
          >
            {item.title}
          </p>
        ))}
        {tokenSession && (
          <Dropdown menu={{ items }}>
            <p
              className="text-[#8C8585] hover:text-black"
              onClick={(e) => e.preventDefault()}
            >
              <Space>
                <DownOutlined />
              </Space>
            </p>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Navbar;
