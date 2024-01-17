import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { sidebarLinks } from "@/constants";
import { INavLink } from "@/types";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="gap-3 items-center">
          <img src="/assets/images/logo.svg" width={170} height={36} />
        </Link>
        <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
          <img
            src={user.imageUrl || "assets/icons/profile-placeholder.svg"}
            className="h-14 2-14 rounded-full"
          />
          <div className="flex flex-col">
            <p className="body-bold">
              {user.name}
              </p>
              <p className="small-regular text-light-3">{user.username}</p>
           
          </div>
        </Link>
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
                key={link.label}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4"
                >
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shadcn-button_ghost"
        onClick={() => signOut()}
      >
        <img src="/assets/icons/logout.svg" />
         <p className=" ml-2 small-medium lg:base-medium"> Logout </p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
