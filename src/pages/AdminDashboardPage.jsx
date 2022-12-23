import React, { useEffect, useState } from "react";
import { AuthContext, tokenExpireError } from "../authContext";
import MkdSDK from "../utils/MkdSDK";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const data = [
  {
    id: "item-1",
    content: "Item-1",
  },
  {
    id: "item-2",
    content: "Item-2",
  },
  {
    id: "item-3",
    content: "Item-3",
  },
  {
    id: "item-4",
    content: "Item-4",
  },
  {
    id: "item-5",
    content: "Item-5",
  },
  {
    id: "item-6",
    content: "Item-6",
  },
  {
    id: "item-7",
    content: "Item-7",
  },
  {
    id: "item-8",
    content: "Item-8",
  },
  {
    id: "item-9",
    content: "Item-9",
  },
];

const AdminDashboardPage = () => {
  const [allRecords, setAllRecords] = useState([]);
  const [activePageNumber, setActivePageNumber] = useState(1);
  const { dispatch } = React.useContext(AuthContext);
  const [loader, setLoader] = useState(true);
  console.log(allRecords, "--14");

  // logout handler
  const logoutHandler = () => {
    tokenExpireError(dispatch, "TOKEN_EXPIRED");

    localStorage.removeItem("role", response?.role);
    localStorage.removeItem("token", response?.token);
  };

  // pagination handler
  const paginationRecordshandler = async (pageNumber) => {
    let sdk = new MkdSDK();
    let newArray =[]
    setLoader(true);
    const response = await sdk.callRestAPI(
      {
        payload: {},
        page: pageNumber,
        limit: 10,
      },
      "PAGINATE"
    );
    if (response && response.error === false) {
      response.list.map((item,index)=>{
        newArray.push({
        id:`item-${index+1}`,
        content:item.title,
        ...item
        })
        })
        // If(newArray.length >= 0)
        // {
        setAllRecords(newArray)
        // }
      // setAllRecords(response.list);
      setLoader(false);
    } else {
      setLoader(false);
    }
  };
  //  useEffect to get record on when page loads
  useEffect(() => {
    paginationRecordshandler(1);
  }, []);

  // totalPages handler for pagination button
  const activePageHandler = (totalNumb) => {
    paginationRecordshandler(totalNumb);
  };

  // -----dnd------------------------
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

 const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,
  // background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  // padding: grid,
  // width: 250,
});
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      allRecords,
      // items,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });
    setAllRecords(reorderedItems);
    // setItems(reorderedItems);
  };
  // ----------------

  return (
    <div className="w-full flex flex-col items-center  text-white-700 bg-black  p-10">
      <div className="flex justify-between w-11/12 ">
        <lable className=" text-7xl text-gray-400">APP</lable>
        <button
          className="bg-lime-400 hover:bg-lime-700 text-white font-bold py-1 px-6 rounded-full m-2"
          onClick={() => logoutHandler()}
        >
          lOG OUT
        </button>
      </div>

      <div className="w-full text-gray-400 mt-9">
        <div className="flex justify-between items-center w-11/12  ">
          <lable className=" text-4xl">Today’s leaderboard</lable>
          <div className="flex justify-between items-center bg-gray-700 rounded bg-gray-700 m-3 p-2">
            <lable>11:34 </lable>
            <button className="bg-lime-400 text-white py-1 mx-2 px-2 rounded m-1">
              Submissions OPEN
            </button>
            <lable>11:34</lable>
          </div>
        </div>

        <div>
          <div className=" m-2 flex border-red-700 text-gray-400">
            <div className="px-4 w-1/12 py-2">#</div>
            <div className="px-4 w-6/12 py-2  text-gray-400 ">Title</div>
            <div className="px-4 w-3/12 py-2 ">Author</div>
            <div className="px-4 w-2/12 py-2  flex justify-end">Most Liked</div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                >
                  {allRecords?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                       
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging
                            // provided.draggableProps.style
                          )}
                          className="rounded border  border-gray-300 items-center m-2 flex card"
                          key={index}
                        >
                          <div className="px-4 w-1/12 py-2 text-white">
                            {item.id}
                          </div>
                          <div className="px-4 w-6/12 py-2 text-white flex items-center ">
                            <img
                              src={item?.photo}
                              alt="Girl in a jacket"
                              width="130"
                              height="60"
                            />
                            <lable className="px-2 text-base text-gray-400">
                              {item?.title}
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
                              {/* {item?.title} */}
                              {item?.username}
                            </lable>
                          </div>
                          <div className="px-4 w-2/12 py-2 text-white flex justify-end text-gray-400">
                            <label className="text-gray-400">{item.like}</label>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/*  */}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/*  */}
        {/* next and previus buttons */}
        <div style={{ display: "flex" }}>
          <button
            disabled={loader}
            style={{ border: "1px solid blue", margin: "3px" }}
            onClick={() => {
              parseInt(activePageNumber) > 1 &&
                activePageHandler(parseInt(activePageNumber) - 1);
              setActivePageNumber(parseInt(activePageNumber) - 1);
            }}
          >
            Previous
          </button>
          <p style={{ margin: "3px" }}>page number :{activePageNumber}</p>
          <button
            style={{ border: "1px solid green", margin: "3px" }}
            disabled={loader}
            onClick={() => {
              activePageNumber < allRecords?.total;
              activePageHandler(parseInt(activePageNumber) + 1);
              setActivePageNumber(parseInt(activePageNumber) + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
