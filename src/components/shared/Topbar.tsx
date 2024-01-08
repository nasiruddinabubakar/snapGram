import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <div className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="gap-3 items-center">
          <img src="/assets/images/logo.svg" width={130} height={325} />
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shadcn-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "assets/iamges/profile-placeholder.svg"}
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
