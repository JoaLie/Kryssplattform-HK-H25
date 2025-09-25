export interface PostComment {
    id: string;
    comment: string;
    username: string;
    timestamp: Date;
}

export interface PostData {
    id: string;
    title: string;
    description: string;
    imageUri?: string;
    comments: PostComment[];
}