import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FreelancerType } from '../types/types'

export default function FreelancersList({data, filters}: {data: FreelancerType[], filters: string}) {
    const [freelancers, setFreelancers] = useState(data)

    useEffect(() => {
        if (filters === "all") {
            setFreelancers(data)
        } else if (filters === "available") {
            setFreelancers(data.filter((freelancer: FreelancerType) => freelancer.available === true))
        } else if (filters === "not-available") {
            setFreelancers(data.filter((freelancer: FreelancerType) => freelancer.available === false))
        }

    }, [filters])
  return (
    <div className="flex gap-2 flex-wrap mt-6">
    {freelancers.map((freelancer: FreelancerType) => (
      <Link key={freelancer.id} to={`/profile/${freelancer.id}`}>
        <div
          key={freelancer.id}
          className="bg-gray-800 rounded-lg flex flex-col"
        >
          <img
            src={freelancer.picture || "https://i.pravatar.cc/150?img=68"}
            className="rounded-lg w-40 h-40 object-cover"
            alt=""
          />
          <div className="px-4 py-2">
            <h2 className="font-bold">{freelancer.name}</h2>
            <p className="opacity-70">{freelancer.title}</p>
            {freelancer.available ? (
              <p className="text-green-500">Available</p>
            ) : (
              <p className="text-red-500">Not Available</p>
            )}
          </div>
        </div>
      </Link>
    ))}
  </div>
  )
}
