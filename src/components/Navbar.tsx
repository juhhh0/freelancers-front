import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Navbar() {
  const auth: { id: string; role: string } | null = useAuthUser();
  const signOut = useSignOut();

  const navigate = useNavigate();

  const signout = () => {
    signOut();
    navigate("/login");
  };

  return (
    <nav className="h-16 w-full left-0 top-0 py-4 px-4 md:px-0">
      <div className="max-w-4xl mx-auto font-bold text-xl flex gap-2 justify-between">
        <Link to="/">
          <Button>Home</Button>
        </Link>
        <div>
          {auth ? (
            <>
              <Link to={"/profile/" + auth?.id}>
                <Button>Profile</Button>
              </Link>
              <Button onClick={() => signout()}>Sign Out</Button>
            </>
          ) : (
            <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign up</Button>
            </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
