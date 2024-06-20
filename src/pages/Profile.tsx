import { gql, useQuery } from "@apollo/client";
import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ReviewForm from "../components/Review/ReviewForm";
import DeleteReview from "../components/Review/DeleteReview";
import ToggleAvaibility from "../components/Freelancer/ToggleAvaibility";
import { AuthType, ReviewType } from "../utils/types/types";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import ProfileSkills from "../components/Freelancer/ProfileSkills";

const GET_FREELANCER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      picture
      skills
      role
      available
      title
      reviews {
        id
        comment
        rating
        recruiter {
          id
          name
          picture
        }
      }
    }
  }
`;

export default function Profile() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_FREELANCER, {
    variables: { id },
  });

  const auth: AuthType | null = useAuthUser();


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <Navbar />
      <main>
        <article className="flex gap-3">
          <img
            src={data.user.picture || "https://i.pravatar.cc/150?img=68"}
            alt=""
            className="rounded-lg w-40 h-40 object-cover"
          />
          <div className="relative w-full">
            <h2 className="text-2xl font-bold">{data.user.name}</h2>
            {data.user.role == "freelancer" && <FreelancerInfos data={data} auth={auth} />}
          </div>
        </article>
        {data.user.role == "freelancer" && (
          <article className="pt-10">
            <div className="flex flex-wrap gap-3">
              {data.user.reviews.map((review: ReviewType) => (
                <div
                  key={review.id}
                  className="flex relative gap-2 bg-gray-800 p-3 rounded-lg min-w-xl min-w-[330px]"
                >
                  <img
                    src={review.recruiter.picture}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-bold">{review.recruiter.name}</h5>
                    <Rating name="read-only" value={review.rating} readOnly />
                    <p className="text-slate-300">{review.comment}</p>
                  </div>
                  {auth?.id === review.recruiter.id && (
                    <DeleteReview id={review.id} />
                  )}
                </div>
              ))}
            </div>
          </article>
        )}

        {auth?.role == "recruiter" && (
          <ReviewForm recruiter={auth.id} freelancer={data.user.id} />
        )}
      </main>
    </>
  );
}

const FreelancerInfos = ({
  data,
  auth,
}: {
  data: any;
  auth: AuthType | null;
}) => (
  <>
  <div>
    <h3>{data.user.title}</h3>
    {data.user.available ? (
      <p className="text-green-500">Available</p>
    ) : (
      <p className="text-red-500">Not Available</p>
    )}
  </div>
    <ProfileSkills userId={data.user.id} userSkills={data.user.skills} auth={auth}/>

    {auth?.id === data.user.id && (
      <ToggleAvaibility available={data.user.available} id={data.user.id} />
    )}
  </>
);
