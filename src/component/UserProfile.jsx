import { useState, useEffect } from "react";

const UserProfile = ({ selectedUser }) => {
  const [posts, setPosts] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (selectedUser) {
      setLoading(true);
      
      // Fetch user posts
      const fetchPosts = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.id}`);
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          console.error("Error fetching posts:", error);
          setErrorMsg("Error fetching posts data");
        }
      };
      
      // Fetch weather data
      const fetchWeather = async () => {
        try {
          const { lat, lng } = selectedUser.address.geo;
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
          );
          const data = await response.json();
          setWeather(data.current_weather);
        } catch (error) {
          console.error("Error fetching weather:", error);
          setErrorMsg("Error fetching weather data");
        }
      };
      
        
      //Loading nanti berhenti kalau kedua fetch selesai
      Promise.all([fetchPosts(), fetchWeather()])
        .finally(() => setLoading(false));
    }
  }, [selectedUser]);

  if (!selectedUser) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <p className="text-xl text-gray-500">Select a user to view details</p>
      </div>
    );
  }

  {errorMsg && (
    <div className="w-full h-[500px] flex justify-center items-center">
      <p className="text-xl font-bold">{errorMsg}</p>
    </div>
  );}
  
  if (loading) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center">
        <p className="text-xl font-bold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-[45px] flex-col flex justify-center items-center text-center">
      
      <div className="flex-col flex justify-center items-center text-center">
        <div className="!h-[70px] w-[70px] p-2 mb-2 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <h3 className="text-3xl font-semibold">
            {selectedUser.name.charAt(0)}
          </h3>
        </div>
        <div className="px-[30px] py-[15px]">
          <h2 className="text-[20px] font-semibold font-sora">
            {selectedUser.name}
          </h2>
          <p className="text-[20px] mb-2">
            <span className="font-semibold font-sora text-xl">
              @{selectedUser.username}
            </span>
          </p>
          <p className="text-[17px] mb-2">
            <span className="font-normal">
              {selectedUser.email} | {selectedUser.address.city} | {selectedUser.website}
            </span>
          </p>
          <div className="flex justify-center mb-4 flex-row">
            <div className="bg-blue-900 text-white px-4 py-2 rounded-lg mr-2 flex flex-row">
              <svg
                width="38px"
                height="38px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M4 12H3V8C3 6.89543 3.89543 6 5 6H9M4 12V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V12M4 12H10M20 12H21V8C21 6.89543 20.1046 6 19 6H15M20 12H14M14 12V10H10V12M14 12V14H10V12M9 6V5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V6M9 6H15"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <div className="ml-2 font-sans font-semibold self-center">
                {selectedUser.company.name}
              </div>
            </div>

            <div className="bg-white text-black px-4 py-2 rounded-lg flex flex-row !justify-center items-center">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <path fill="none" d="M0 0h24v24H0z"></path>{" "}
                    <path
                      fillRule="nonzero"
                      d="M8 5a4 4 0 1 1 8 0v5.255a7 7 0 1 1-8 0V5zm1.144 6.895a5 5 0 1 0 5.712 0L14 11.298V5a2 2 0 1 0-4 0v6.298l-.856.597zM8 16h8a4 4 0 1 1-8 0z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              <div className="font-sans font-semibold self-center">
                {weather ? `${weather.temperature} °C` : "Loading..."}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex w-full">
        <h1 className="font-sora font-semibold text-lg mb-4 !text-left">
          Posts by {selectedUser.name}
        </h1>
      </div>
      <div className="border-b border-gray-200 w-full mb-4"></div>

      {/* Posts*/}
      <ul className="w-full px-4 h-[250px] overflow-auto">
        {posts.map((post) => (
          <li key={post.id} className="w-full py-5 border-b border-gray-200">
            <div className="flex">
              <div className="flex-1">
                <h1 className="text-left font-sora font-semibold text-[18px] mb-2">
                  {post.title}
                </h1>
                <p className="text-left text-[16px] text-gray-800">
                  {post.body}
                </p>

                <div className="flex mt-3 text-xs text-gray-500">
                  <button className="flex items-center mr-4 hover:bg-gray-100 rounded-md px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Comments
                  </button>
                  <button className="flex items-center mr-4 hover:bg-gray-100 rounded-md px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share
                  </button>
                  <button className="flex items-center hover:bg-gray-100 rounded-md px-2 py-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;