import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_USER = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      email
      name
      role
      id
    }
  }
`;

export default function Signup() {
  const [role, setRole] = useState("freelancer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    refetchQueries: ["GetUsers"],
  });

  const submit = async (e: any) => {
    e.preventDefault();
    await addUser({
      variables: {
        user: {
          email: email,
          password: password,
          name: name,
          role: role,
          picture: picture,
          title: title,
        },
      },
    });

    if (!error) {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <form action="" className="user-form" onSubmit={submit}>
          <h2 className="text-2xl font-bold mx-auto">Sign up</h2>
          <TextField
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            label="Email"
            required
          />
          <TextField
            type="password"
            variant="outlined"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl>
            <FormLabel id="role">You are:</FormLabel>
            <RadioGroup
              row
              aria-labelledby="role"
              defaultValue="freelancer"
              name="radio-buttons-group"
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="freelancer"
                control={<Radio />}
                label="A freelancer"
              />
              <FormControlLabel
                value="recruiter"
                control={<Radio />}
                label="A recruiter"
              />
            </RadioGroup>
          </FormControl>

          {role === "freelancer" && (
            <>
              <TextField
                type="text"
                variant="outlined"
                label="Job title"
                onChange={(e) => setTitle(e.target.value)}
                required={role === "freelancer"}
              />
            </>
          )}
          <TextField
            type="text"
            variant="outlined"
            label={role === "freelancer" ? "Name" : "Company Name"}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            type="text"
            variant="outlined"
            label={
              role === "freelancer" ? "Profile Picture" : "Company Picture"
            }
            onChange={(e) => setPicture(e.target.value)}
          />

          <div className="w-full flex justify-between items-center">
            <span>
              Already have an account?{" "}
              <Link className="underline" to={"/login"}>
                Login
              </Link>
            </span>
            <Button type="submit" className="w-fit">
              {loading ? <img src="/spinner.svg" alt="" /> : "Sign up"}
            </Button>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </main>
    </>
  );
}
