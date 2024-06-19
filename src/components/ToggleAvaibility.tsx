import { gql, useMutation } from "@apollo/client";
import { Button } from "@mui/material";

const TOGGLE_AVAIBILITY = gql`
  mutation ToggleAvaibility($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
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
  const [updateUser] = useMutation(TOGGLE_AVAIBILITY, {
    refetchQueries: ["GetUser"],
  });

  const submit = () => {
    updateUser({
      variables: {
        id: id,
        user: {
          available: !available,
        },
      },
    });
    console.log("heerorr")


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
