export type FormattedVideoPost = {
  id: string;
  title: string;
  description: string;
  url: string;
  upvoteCount: number;
  downVoteCount: number;
  sharedBy?: string;
  createdAt: Date;
};
