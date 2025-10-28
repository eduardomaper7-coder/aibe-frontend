import { apiGet, apiPost } from "@/lib/api";
import { Account, Location, Review, ReplyBody } from "@/lib/types";

export const loginWithGoogleUrl = () => "/api/auth/google/login";
export const getAccounts = () => apiGet<Account[]>("/accounts");
export const getLocations = (accountId: string) => apiGet<Location[]>(`/locations?account_id=${encodeURIComponent(accountId)}`);
export const getReviews = (accountId: string, locationId: string) =>
  apiGet<Review[]>(`/reviews?account_id=${encodeURIComponent(accountId)}&location_id=${encodeURIComponent(locationId)}`);
export const postReply = (payload: ReplyBody) => apiPost<{ ok: boolean }>(`/reviews/reply`, payload);
