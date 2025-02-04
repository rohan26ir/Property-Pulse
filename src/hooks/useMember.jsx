import { useContext } from 'react';
import { AuthContext } from '../Provider/Provider';
// import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useMember = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const { data: isMember = false, isLoading: isMemberLoading, isError } = useQuery({
    queryKey: [user?.email, 'isMember'],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/member/${user.email}`);
      return res.data?.member || false;
    },
  });

  if (isError) {
    console.error('Error fetching member status');
  }

  return [isMember, isMemberLoading];
};

export default useMember;
