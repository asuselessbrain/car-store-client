import { useGetSingleUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
const UserProfile = () => {
    const { data, isLoading } = useGetSingleUserQuery(undefined);
    
      if (isLoading) return <Loader />;
    
      const profile = data?.data;

    return(
        <section>
            
        </section>
    )
}

export default UserProfile;