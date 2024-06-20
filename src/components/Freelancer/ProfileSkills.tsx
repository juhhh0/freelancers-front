import { gql, useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { AuthType } from "../../utils/types/types";

const NEW_SKILL = gql`
  mutation NewSkill($id: ID!, $user: UpdateUserInput!) {
    updateUser(id: $id, user: $user) {
      skills
    }
  }
`;

export default function ProfileSkills({
  userSkills,
  userId,
  auth
}: {
  userSkills: string[];
  userId: string;
  auth: AuthType | null
}) {
  const [skills, setSkills] = useState(userSkills);
  const [newSkill, setNewSkill] = useState("");
  const newSkillRef = useRef<HTMLInputElement>(null);

  const [updateUser] = useMutation(NEW_SKILL, {
    refetchQueries: ["GetUser"],
  });

  const submit = async () => {
    const { data } = await updateUser({
      variables: {
        id: userId,
        user: {
          skills: [...skills, newSkill],
        },
      },
    });
    if (data) {
      console.log(data);
      setSkills(data.updateUser.skills);
      newSkillRef.current!.value = "";
    }
  };
  return (
    <>
      <ul className="flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => (
          <li key={index} className="bg-gray-600 p-1 w-fit rounded-md text-xs">
            {skill}
          </li>
        ))}
        { auth?.id === userId &&
          <li>
            <form
              action=""
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <input
                type="text"
                ref={newSkillRef}
                name="newSkill"
                placeholder="add a new skill"
                className="bg-gray-600 p-1 rounded-md text-xs"
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <span className="absolute right-1">+</span>
            </form>
          </li>
        }
      </ul>
    </>
  );
}
