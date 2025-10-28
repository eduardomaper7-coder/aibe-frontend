export type Account = { name: string; accountName?: string; [k:string]:any };
export type Location = { name: string; title?: string; locationName?: string; [k:string]:any };
export type Review = {
  reviewId: string;
  reviewer?: { displayName?: string };
  starRating?: "ONE"|"TWO"|"THREE"|"FOUR"|"FIVE";
  comment?: string;
  createTime?: string;
  reviewReply?: { comment?: string } | null;
};
export type ReplyBody = { account_id: string; location_id: string; review_id: string; reply_text: string; };
