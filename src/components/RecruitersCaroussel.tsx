import { gql, useQuery } from '@apollo/client';

const GET_RECRUITERS = gql`
  query GetRecruiters {
    recruiters {
      id
      name
      picture
    }
  }
`;

export default function RecruitersCaroussel() {
    const { loading, error, data } = useQuery(GET_RECRUITERS);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    console.log(data)
  return (
    <section className='mt-10'>
        <h2 className='mb-5 text-2xl font-bold'>They are recruiting !</h2>
        <div className='flex flex-wrap gap-6'>
            {data.recruiters.map((recruiter: any) => (
                <div key={recruiter.id} className='flex flex-col items-center'>
                    <img src={recruiter.picture || 'https://i.pravatar.cc/150?img=68'} className='rounded-full w-20 h-20 object-cover' alt='' />
                    <h2 className='font-bold mt-2'>{recruiter.name}</h2>
                </div>
            ))}
        </div>
    </section>
  )
}
