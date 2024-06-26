import { useQuery, gql } from "@apollo/client";
import Navbar from "./components/Navbar";
import Filter from "./components/Freelancer/Filter";
import { useState } from "react";
import FreelancersList from "./components/Freelancer/FreelancersList";
import RecruitersCaroussel from "./components/RecruitersCaroussel";

const GET_FREELANCERS = gql`
  query GetFreelancers {
    freelancers {
      id
      name
      picture
      skills
      available
      title
      reviews {
        rating
      }
    }
  }
`;

export default function App() {
  const { loading, error, data } = useQuery(GET_FREELANCERS);
  const [filters, setFilters] = useState("all");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <Navbar />
      <main>
        <section>
          <h2 className="mb-5 text-2xl font-bold">Our freelancers</h2>
          <Filter setFilters={setFilters} />
          <FreelancersList data={data.freelancers} filters={filters} />
        </section>
        <RecruitersCaroussel/>
      </main>
    </>
  );
}
