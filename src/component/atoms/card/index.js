import React from "react";
import Button from "../button";

const Card = (props) => {
  const { data, onDelete, onEdit } = props;
  const dataNode = data.node;
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-2">
        <h1 className="text-gray-900 font-bold text-2xl ">{data.username}</h1>
        <p className="text-gray-800 text-sm mt-1">{data.hak}</p>
        <p className="text-gray-800 text-sm mt-1">{data.email}</p>
        <p className="text-gray-800 text-sm mt-1">
          {dataNode.map((index) => {
            return index.label + ",";
          })}
        </p>
      </div>
      <div className="flex justify-end px-4 py-2">
        <Button
          onClick={() => onEdit(data._id)}
          title="Edit"
          className="bg-sky-100 hover:bg-sky-50 text-white text-sm font-bold py-1 px-3 rounded-full mr-2"
        />

        <Button
          onClick={() => onDelete(data._id)}
          title="Hapus"
          className="bg-red-700 hover:bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full"
        />
      </div>
    </div>
  );
};

export default Card;
