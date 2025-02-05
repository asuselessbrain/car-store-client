import { useState } from "react";
import {
  useGetSingleUserQuery,
  useUpdateNameMutation,
} from "../../../redux/fetchers/users/userAPi";
import Loader from "../../shared/Loader";
import { CiEdit } from "react-icons/ci";
import { FieldValues } from "react-hook-form";

const Profile = () => {
  const { data, isLoading } = useGetSingleUserQuery(undefined);
  const [updateName] = useUpdateNameMutation();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <Loader />;

  const profile = data?.data;

  const handleChangeName = async (e: FieldValues) => {
    const name = e.target.value;
    const id = profile?._id;

    const userInfo = {
      name,
      id,
    };

    const res = await updateName(userInfo).unwrap();
    console.log(res);
    setIsEditing(false);
  };
  return (
    <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white dark:bg-gray-700 shadow-xl rounded-lg text-gray-900 dark:text-gray-200">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Mountain"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white dark:border-gray-700 rounded-full overflow-hidden">
        <img
          className="object-cover object-center h-32"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          alt="Woman looking front"
        />
      </div>

      <div className="text-center mt-2">
        {isEditing ? (
          <div className="flex items-center justify-center gap-4">
            <input
              type="text"
              id="name"
              className="bg-gray-700 text-white p-2 border border-gray-900 rounded-full text-center"
              onBlur={handleChangeName}
              defaultValue={profile?.name}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <h2 className="font-semibold text-xl">{profile?.name}</h2>
            <button title="Edit Name" onClick={() => setIsEditing(true)}>
              <CiEdit size={20} />
            </button>
          </div>
        )}

        <p className="text-gray-500 dark:text-gray-400">{profile?.email}</p>
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-600 mx-8 mt-2">
        <button className="block mx-auto rounded-full bg-gray-900 border-2 dark:border-gray-900 dark:bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
