import { Home, Profile, SignIn, SignUp } from "@/pages";
import Forget from "./pages/forget";
import Otp from "./pages/otp";
import ChangePass from "./pages/changePass";
import University from "./pages/university";
import DetailUniversity from "./pages/detailUniversity";
import Chat from "./pages/chat";
import ChatTest from "./pages/chatTest";
 
export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "chat",
    path: "/chatbot",
    element: <Chat />,
  },
  {
    name: "profile",
    path: "/university",
    element: <University />,
  },
  {
    name: "profile",
    path: "/university/:id",
    element: <DetailUniversity />,
  },
  // {
  //   name: "Sign In",
  //   path: "/sign-in",
  //   element: <SignIn />,
  //   layout:LoginLayout
  // },
  // {
  //   name: "Sign Up",
  //   path: "/sign-up",
  //   element: <SignUp />,
  // },
  // {
  //   name: "Forget",
  //   path: "/forget",
  //   element: <Forget />,
  // },
  // {
  //   name: "OTP",
  //   path: "/otp",
  //   element: <Otp />,
  // },
  // {
  //   name: "Change Password",
  //   path: "/change-pass/:id",
  //   element: <ChangePass />,
  // },
  {
    name: "Docs",
    href: "https://www.material-tailwind.com/docs/react/installation",
    target: "_blank",
    element: "",
  },
];

export default routes;
