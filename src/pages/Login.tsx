import { Button, TextField } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const LOGIN_QUERY = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token
      role
    }
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = useSignIn();
  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation(LOGIN_QUERY);

  const submit = async () => {
    const { data } = await login({
      variables: {
        email: email,
        password: password,
      },
    });

    if (
      !error &&
      signIn({
        auth: {
          token: data.login.token,
          type: "Bearer",
        },
        userState: {
          id: data.login.id,
          role: data.login.role,
        },
      })
    ) {
      navigate("/");
    } else {
      console.log(error?.message);
    }
  };
  return (
    <main>
      <Navbar />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="user-form"
      >
        <TextField
          type="email"
          variant="outlined"
          label="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          type="password"
          variant="outlined"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="w-full flex justify-between items-center">
          <span>
            No account?{" "}
            <Link className="underline" to={"/signup"}>
              Sign up
            </Link>
          </span>
          <Button type="submit" className="w-fit">
            Login
          </Button>
        </div>
        {error && <p>{error.message}</p>}
      </form>
    </main>
  );
}
