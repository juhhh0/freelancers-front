import { useState } from "react";
import Navbar from "../components/Navbar";
import { Button, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";

const ADD_FREELANCER = gql`
  mutation AddFreelancer($freelancer: AddFreelancerInput!) {
    addFreelancer(freelancer: $freelancer) {
      name
    }
  }
`;

export default function NewFreelancer() {
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");

  const [addFreelancer, { data, loading, error }] = useMutation(ADD_FREELANCER, {
    refetchQueries: ["GetFreelancers"],
  });

  const submit = () => {
    addFreelancer({
      variables: {
        freelancer: {
          name: name,
          picture: picture,
          title: title,
          skills: skills.split(","),
          available: true,
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
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            id="outlined-basic"
            label="Skills"
            variant="outlined"
            onChange={(e) => {
              setSkills(e.target.value);
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
