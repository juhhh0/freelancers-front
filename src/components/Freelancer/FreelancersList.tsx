import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FreelancerType } from "../../utils/types/types";
import { getAverageRating } from "../../utils/utils";
import { Rating } from "@mui/material";

export default function FreelancersList({
  data,
  filters,
}: {
  data: FreelancerType[];
  filters: string;
}) {
  const [freelancers, setFreelancers] = useState(data);

  useEffect(() => {
    if (filters === "all") {
      setFreelancers(data);
    } else if (filters === "available") {
      setFreelancers(
        data.filter(
          (freelancer: FreelancerType) => freelancer.available === true
        )
      );
    } else if (filters === "not-available") {
      setFreelancers(
        data.filter(
          (freelancer: FreelancerType) => freelancer.available === false
        )
      );
    }
  }, [filters]);
  return (
    <div className="flex gap-2 flex-wrap mt-6 justify-center md:justify-normal">
      {freelancers.map((freelancer: FreelancerType) => {
        let averageRating = null;
        if (freelancer.reviews.length > 0) {
          averageRating = getAverageRating(freelancer.reviews);
        }
        return (
          <Link key={freelancer.id} to={`/profile/${freelancer.id}`}>
            <div
              key={freelancer.id}
              className="relative pb-8 bg-gray-800 rounded-lg flex flex-col w-52 flex-1 h-full"
            >
              <img
                src={freelancer.picture || "https://i.pravatar.cc/150?img=68"}
                className="rounded-lg w-full h-40 object-cover"
                alt=""
              />
              <div className="px-4 py-2">
                <h2 className="font-bold">{freelancer.name}</h2>
                <p className="opacity-70">{freelancer.title}</p>
                {averageRating && (
                  <div className="mt-2 flex items-center">
                    <Rating value={averageRating} readOnly />
                    <span className="text-xs opacity-50">({freelancer.reviews.length})</span>
                  </div>
                )}
                {freelancer.available ? (
                  <p className="text-green-500 absolute bottom-2">Available</p>
                ) : (
                  <p className="text-red-500 absolute bottom-2">
                    Not Available
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
