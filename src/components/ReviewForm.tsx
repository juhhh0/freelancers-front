import { gql, useMutation } from "@apollo/client";
import { Autocomplete, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { RecruiterType } from "../types/types";

const ADD_REVIEW = gql`
  mutation AddReview($review: AddReviewInput!) {
    addReview(review: $review) {
      comment
      rating
    }
  }
`;

export default function ReviewForm({
  recruiters,
  freelancer,
}: {
  recruiters: RecruiterType[];
  freelancer: string;
}) {
  const [rating, setRating] = useState(3);
  const [recruiter, setRecruiter] = useState<string>();
  const [comment, setComment] = useState("");

  const [addReview, { data, loading, error }] = useMutation(ADD_REVIEW, {
    refetchQueries: ["GetUser"],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const submit = () => {
    console.log(freelancer, recruiter)
    addReview({
      variables: {
        review: {
          comment: comment,
          rating: rating,
          recruiterId: recruiter,
          freelancerId: freelancer,
        },
      },
    });
    console.log(data)
  };


  if (loading) return "Submitting...";
  if (error) return `Submission error!`;

  return (
    <form
      action=""
      className="bg-gray-700 flex flex-col gap-4 p-4 rounded-lg mt-4"
      onSubmit={submit}
    >
      <span>Submit your review</span>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={recruiters}
        sx={{ width: 300 }}
        getOptionLabel={(option: any) => option.name}
        // @ts-ignore
        onChange={(e, value) => {
          setRecruiter(value?.id);
        }}
        renderInput={(params) => <TextField {...params} label="Company" />}
      />
      <TextField
        id="standard-basic"
        label="Comment"
        variant="outlined"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      <Rating
        name="simple-controlled"
        value={rating}
        // @ts-ignore
        onChange={(event, newValue) => {
          setRating(newValue as number);
        }}
      />

      <button
        className="w-fit mx-auto border py-2 px-4 rounded-lg"
        onClick={(e) => {
            e.preventDefault();
            submit();
        }}
      >
        Submit
      </button>
    </form>
  );
}
