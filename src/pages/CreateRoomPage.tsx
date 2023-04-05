import React from "react";

export default function CreateRoom() {
  return (
    <div className="create-room ">
      <div className="details">
        <input
          type="text"
          className="px-4 py-2 rounded"
          name="room-id"
          id="room-id"
          disabled
          value="room-SAFfdsfgsdds56"
        />
        <button className="ml-2 py-2 px-4 bg-btn-blue rounded">Copy</button>
      </div>
      <div className="wating text-center mt-4">
        Wating for user <span className="mx-2 animate-bounce ">.</span>{" "}
        <span className="mr-2 animate-bounce  ">.</span>{" "}
        <span className=" animate-bounce  ">.</span>
      </div>
    </div>
  );
}
