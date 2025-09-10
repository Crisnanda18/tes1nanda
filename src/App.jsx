// mohon install tailwindcss/vite dulu pak sebelum di run terima kasih

import UserList from "./component/UserList";
import Header from "./component/Header";
import UserProfile from "./component/UserProfile";
import { useState } from "react";
function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  }
  return (
    <>
      <Header />
      <div className="flex p-5 sm:flex-row flex-col">
        <div className="w-1/4">
          <UserList onSelect={handleSelectUser} />
        </div>
        <div className="w-3/4 flex justify-center">
          <UserProfile selectedUser={selectedUser} />
        </div>
      </div>
    </>
  );
}

export default App;
