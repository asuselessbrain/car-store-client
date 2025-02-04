const Profile = () => {
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
        <h2 className="font-semibold">Sarah Smith</h2>
        <p className="text-gray-500 dark:text-gray-400">Freelance Web Designer</p>
      </div>
      <div className="p-4 border-t border-gray-300 dark:border-gray-600 mx-8 mt-2">
        <button className="w-1/2 block mx-auto rounded-full bg-gray-900 border-2 dark:border-gray-900 dark:bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
          Follow
        </button>
      </div>
    </div>
  );
};

export default Profile;
