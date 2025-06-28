import { useGetSingleUserQuery } from "../../../../redux/fetchers/users/userAPi";
import Loader from "../../../shared/Loader";
const UserProfile = () => {
    const { data, isLoading } = useGetSingleUserQuery(undefined);
    
      if (isLoading) return <Loader />;
    
      const profile = data?.data;

    return(
        <section className="relative overflow-x-auto max-h-[80vh] p-10 bg-white dark:bg-gray-800 shadow-xl rounded-lg text-gray-900 dark:text-gray-200">
            <h3 className="text-3xl font-semibold">User Profile</h3>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 my-6">
              <div className="text-center">
                <img src={profile?.profileImg} alt={profile?.firstName} className="rounded-full w-44" />
                <p className="text-2xl font-semibold">{profile?.firstName} {profile?.lastName}</p>
              </div>
            </div>
        </section>
    )
}

export default UserProfile;