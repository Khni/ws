import { useGetProfile } from "@/api";

export function useAuthenticatedProfile() {
  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const { data: user, isLoading } = useGetProfile({
    query: {
      staleTime: 10 * 60 * 1000,
      queryKey: ["user", "profile"],
      gcTime: 15 * 60 * 1000, // keep in memory for 15 min after last usage
      refetchOnMount: false, // do not refetch just because the component mounts
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },

    request: {
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    },
  });

  return { user, isLoading };
}
