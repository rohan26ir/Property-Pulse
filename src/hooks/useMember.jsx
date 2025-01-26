import { useContext } from 'react';
import { AuthContext } from '../Provider/Provider';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useMember = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: isMember = false, isLoading: isMemberLoading, isError } = useQuery({
    queryKey: [user?.email, 'isMember'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/member/${user.email}`);
      return res.data?.member || false;
    },
  });

  if (isError) {
    console.error('Error fetching member status');
  }

  return [isMember, isMemberLoading];
};

export default useMember;
