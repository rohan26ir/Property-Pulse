import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAuth from "./useAuth";

const useAcceptedAgreements = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { refetch, data: acceptedAgreements = [] } = useQuery({
    queryKey: ["acceptedAgreements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements?email=${user.email}&status=accepted`);
      return res.data;
    },
    enabled: !!user?.email, // Only fetch if user email exists
  });

  return [acceptedAgreements, refetch];
};

export default useAcceptedAgreements;
