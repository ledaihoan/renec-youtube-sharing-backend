export type VideoPostReactionEvent = {
  videoId: string;
  userId: string;
  type: string;
};

export const VIDEO_POST_REACTION_EVENT_TYPES = {
  INCREASE: 'increase',
  DECREASE: 'decrease',
};
