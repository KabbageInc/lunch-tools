
export interface Lunch {
    date: string;
    menu: string;
    rating: number;
    comments: Comment[];
    image: string;
}

export interface Comment {
    author: string;
    message: string;
}