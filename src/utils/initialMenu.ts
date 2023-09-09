// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initialMenu = (token: any) => [
  {
    title: "Home",
    isActive: false,
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
    visible: token ? false : true,
  },
];
