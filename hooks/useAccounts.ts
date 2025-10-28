import useSWR from "swr";
import { Account } from "@/lib/types";
import { getAccounts } from "@/services/gbp";

export default function useAccounts() {
  const { data, error, isLoading, mutate } = useSWR<Account[]>(
    "accounts",
    getAccounts
  );
  return { accounts: data ?? [], error, isLoading, mutate };
}
