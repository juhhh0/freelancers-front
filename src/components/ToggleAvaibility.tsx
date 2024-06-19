import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/material";

const TOGGLE_AVAIBILITY = gql`
  mutation ToggleAvaibility($id: ID!, $freelancer: UpdateFreelancerInput!) {
    updateFreelancer(id: $id, freelancer: $freelancer) {
      available
    }
  }
`;

export default function ToggleAvaibility({
  available,
  id,
}: {
  available: boolean;
  id: string;
}) {
  const [toggleAvaibility] = useMutation(TOGGLE_AVAIBILITY, {
    refetchQueries: ["GetFreelancer"],
  });

  const submit = () => {
    toggleAvaibility({
      variables: {
        id: id,
        freelancer: {
          available: !available,
        },
      },
    });
  };

  return (
    <div className="absolute top-0 right-0">
      {available ? (
        <Button color="warning" onClick={submit}>
          I'm no longer available
        </Button>
      ) : (
        <Button color="success" onClick={submit}>I'm available</Button>
      )}
    </div>
  );
}
