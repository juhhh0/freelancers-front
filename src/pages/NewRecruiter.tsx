import { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const ADD_RECRUITER = gql`
  mutation AddRecruiter($recruiter: AddRecruiterInput!) {
    addRecruiter(recruiter: $recruiter) {
      name
    }
  }
`;

export default function NewRecruiter() {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");

  const [addRecruiter, { data, loading, error }] = useMutation(ADD_RECRUITER , {
    refetchQueries: ["GetRecruiters"],
  });

  const submit = () => {
    addRecruiter({
      variables: {
        recruiter: {
          name: name,
          picture: picture
        },
      },
    });
    console.log(data)
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error!`;

  return (
    <>
      <Navbar />
      <main>
        <h3 className="mb-4">New freelancer</h3>
        <form action="" className="flex flex-col gap-3">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Picture Url"
            variant="outlined"
            onChange={(e) => {
              setPicture(e.target.value);
            }}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            Submit
          </Button>
        </form>
      </main>
    </>
  );
}
