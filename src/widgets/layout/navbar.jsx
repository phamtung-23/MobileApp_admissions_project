import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { IoHomeSharp } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
import { GoDependabot } from "react-icons/go";
import { RiShieldUserLine } from "react-icons/ri";
 

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto text-xl"
        >
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Button>
      </MenuHandler>
    </Menu>
  );
}
 
 
// nav list component
const navListItems = [
  {
    label: "Home",
    icon: IoHomeSharp,
    path: "/home",
  },
  {
    label: "University",
    icon: FaUniversity,
    path: "/university",
  },
  {
    label: "AI Chat",
    icon: GoDependabot,
    path: "/chatbot",
  },
  {
    label: "Profile",
    icon: RiShieldUserLine,
    path: "/profile",
  },
];
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, icon, path }, key) => (
        <Typography
          key={label}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <Link to={path}>
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className="text-gray-900"> {label}</span>
            </MenuItem>
          </Link>
        </Typography>
      ))}
    </ul>
  );
}
 
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  // const  { user } = useContext(AuthContext)


  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold text-xl"
        >
          <Link to={`/home`}>
            Admission Support
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
 
        {/* {!user && 
          <Link to="/sign-in">
            <Button size="sm" variant="text">
              <span>Log In</span>
            </Button>
          </Link>
          } */}
      
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}