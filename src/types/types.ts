export type ReviewType = {
    id: string;
    recruiterId: string;
    freelancerId: string;
    freelancer: FreelancerType;
    recruiter: RecruiterType;
    rating: number;
    comment: string;
}

export type FreelancerType = {
    id: string;
    name: string;
    title: string;
    picture: string;
    skills: string[];
    available: boolean;
    reviews: ReviewType[];
}

export type RecruiterType = {
    id: string;
    name: string;
    picture: string;
    reviews: ReviewType[];
}