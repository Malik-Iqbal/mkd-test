import React, { useEffect, useState } from "react";
// import girinjacket from "./../Assets/Rectangle1534.png";
// import Avatar from "./../Assets/Avatar.png";
import { AuthContext, tokenExpireError } from "../authContext";
import MkdSDK from "../utils/MkdSDK";



const AdminDashboardPage = () => {
  const [allRecords, setAllRecords] = useState([]);


  const paginationRecordshandler = async (pageNumber) => {
    let sdk = new MkdSDK();
    // setLoader(true);
    const response = await sdk.callRestAPI(
      {
        payload: {},
        page: pageNumber,
        limit: 10,
      },
      "PAGINATE"
    );
    if (response && response.error === false) {
      setAllRecords(response.list);
      // setLoader(false);
    } else {
      // setLoader(false);
    }
  };
  //  useEffect to get record on when page loads
  useEffect(() => {
    paginationRecordshandler(1);
  }, []);

  return (
    <div className="w-full flex flex-col items-center  h-screen text-white-700 bg-black  p-10">
      <div className="flex justify-between w-11/12 ">
        <lable className=" text-7xl">APP</lable>
        <button class="bg-lime-400 hover:bg-lime-700 text-white font-bold py-1 px-6 rounded-full">
          lOG OUT
        </button>
      </div>

      <div className="w-full">
        <div className="flex justify-between  w-11/12 ">
          <lable className=" text-4xl">Today’s leaderboard</lable>
          <div className="flex justify-between items-center bg-gray-700 rounded">
            <lable >11:34 </lable>
            <button class="bg-lime-400 text-white py-1 mx-2 px-2 rounded">
              Submissions OPEN
            </button>
            <lable>11:34</lable>
          </div>
        </div>

        <div>
          <div className=" m-2 flex border-red-700">
            <div className="px-4 w-1/12 py-2 bg-gray-700 ">#</div>
            <div className="px-4 w-6/12 py-2  text-gray-400 ">Title</div>
            <div className="px-4 w-3/12 py-2 ">Author</div>
            <div className="px-4 w-2/12 py-2  flex justify-end">Most Liked</div>
          </div>
          {allRecords?.map((item)=>
          
          <div className="rounded border  border-gray-300 items-center m-2 flex">
            <div class="px-4 w-1/12 py-2 text-white">01</div>
            <div class="px-4 w-6/12 py-2 text-white flex items-center ">
              <img
                src={item?.photo}
                alt="Girl in a jacket"
                width="130"
                height="60"
              />
              <lable className="px-2 text-base text-gray-400">
              {item?.username}
                {/* Rune raises $100,000 for marketing through NFT butterflies sale */}
              </lable>
            </div>
            <div className="px-4 w-3/12 py-2 text-lime-400 flex"> 
            <img
               src={item?.photo}
                alt="Girl in a jacket"
                width="30"
                height="30"
              />
             
              <lable className="px-2 text-gray-400">
              {/* ninjanft */}
               {item?.title}
              </lable>
              </div>
            <div className="px-4 w-2/12 py-2 text-white flex justify-end text-gray-400">
              <label className="text-gray-400">254</label>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
    
  );
};

export default AdminDashboardPage;
