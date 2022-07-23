export interface IComment {
  id: number;
  userId: number;
  content: string;
  like: number;
  dislike: number;
  createdAt: Date;
}

export interface IPosting {
  id: number;
  userId: number;
  views: number;
  title: string;
  content: string;
  comment: IComment[];
  createdAt: Date;
}

export interface IHouseCommunity {
  id: number;
  postings: IPosting[];
}
