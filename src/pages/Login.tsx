import {
  Button,
  TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main>
      <Navbar />
      <form
        action=""
        className="user-form"
      >
        <TextField type="email" variant="outlined" label="Email" />
        <TextField type="password" variant="outlined" label="Password" />
        <div className="w-full flex justify-between items-center">
          <span>
            No account?{" "}
            <Link className="underline" to={"/signup"}>
              Sign up
            </Link>
          </span>
          <Button className="w-fit">Login</Button>
        </div>
      </form>
    </main>
  );
}
