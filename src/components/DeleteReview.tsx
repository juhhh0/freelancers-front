import CloseIcon from '@mui/icons-material/Close';
import { gql, useMutation } from '@apollo/client';

const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      id
    }
  }
`;

export default function DeleteReview({id}: {id: string}) {

    const [deleteReview, { data, loading, error }] = useMutation(DELETE_REVIEW, {
        refetchQueries: ["GetFreelancer"],
      });

    const submit = () => { 
        deleteReview({
            variables: {
                id: id
            }
        })
        console.log(data)
    }
    if (loading) return "Submitting...";
    if (error) return `Submission error!`;
  return (
    <div className='absolute top-2 right-2'>
        <button className='rounded-lg flex justify-center items-center' onClick={(e) => {
            e.preventDefault();
            submit();
        }}>
            <CloseIcon className='font-xs' fontSize='inherit'/>
        </button>
    </div>
  )
}
