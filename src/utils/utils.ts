export const getAverageRating = (reviews: {rating: number}[]) => {

    if(reviews?.length === 0) return null;

    const total = reviews.reduce((acc, review) => {
        return acc + review.rating;
    }, 0);

    return total / reviews.length;
} ;