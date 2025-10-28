import useSWR from "swr";
import { Review } from "@/lib/types";
import { getReviews } from "@/services/gbp";

export default function useReviews(accountId?: string, locationId?: string) {
  const key = accountId && locationId ? ["reviews", accountId, locationId] : null;
  const { data, error, isLoading, mutate } = useSWR<Review[]>(
    key,
    () => getReviews(accountId!, locationId!)
  );
  return { reviews: data ?? [], error, isLoading, mutate };
}
