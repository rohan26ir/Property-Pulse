import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";
import useAdmin from "./useAdmin";
import useMember from "./useMember";

const useRole = () => {
  const { user, loading } = useContext(AuthContext); // Access user and loading from AuthContext
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isMember, isMemberLoading] = useMember();

  if (loading || isAdminLoading || isMemberLoading) {
    return { role: "Loading..." }; // Return a loading state while data is fetched
  }

  if (isAdmin) {
    return { role: "Manager" }; // If user is admin
  }

  if (isMember) {
    return { role: "Resident" }; // If user is a member
  }

  return { role: "Tenant" }; // Default role for users with no specific role
};

export default useRole;
