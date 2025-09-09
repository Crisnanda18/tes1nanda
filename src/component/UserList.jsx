import { useState, useEffect } from "react";

const UserList = ({ onSelect }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUserId(user.id);
    onSelect(user);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="">
      <div className="px-[30px] py-[15px]">
        <h2 className="text-[30px] font-semibold mb-4 font-sora">Users</h2>
      </div>
      {loading ? (
        <div className="flex justify-center text-xl font-bold !px-[30px]">
          Loading Users...
        </div>
      ) : (
        <ul className="px-[30px] overflow-auto h-[500px] w-[380px] max-[1400px]:w-[300px]">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`px-2 py-5 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-all focus:bg-gray-200 ${
                selectedUserId === user.id ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex flex-row items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {user.name.charAt(0)}
                </div>
                <span className="hover:text-[25px] text-[19px] transition-all">
                  {user.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div></div>
    </div>
  );
};
export default UserList;
