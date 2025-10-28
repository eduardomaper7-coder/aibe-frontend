import useSWR from "swr";
import { Location } from "@/lib/types";
import { getLocations } from "@/services/gbp";

export default function useLocations(accountId?: string) {
  const key = accountId ? ["locations", accountId] : null;
  const { data, error, isLoading, mutate } = useSWR<Location[]>(
    key,
    () => getLocations(accountId!)
  );
  return { locations: data ?? [], error, isLoading, mutate };
}
