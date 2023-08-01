import React from "react";
import Button from "../button";
import { Link } from "react-router-dom";

const CardNode = (props) => {
  const { data, onDelete, onEdit } = props;
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="px-4 py-2">
        <h1 className="text-gray-900 font-bold text-2xl uppercase">
          {data.nama}
        </h1>
        <Link
          className=" text-sm mt-1"
          to={`https://www.google.co.id/maps/place/${data.lokasi}`}
          target="_BLANK"
        >
          {data.lokasi}
        </Link>
      </div>

      <div className="flex justify-end px-4 py-2">
        <Button
          title="Edit"
          className="bg-sky-100 hover:bg-sky-50 text-white text-sm font-bold py-1 px-3 rounded-full mr-2"
          onClick={() => onEdit(data._id)}
        />

        <Button
          title="Hapus"
          className="bg-red-700 hover:bg-red-500 text-white text-sm font-bold py-1 px-3 rounded-full"
          onClick={() => onDelete(data._id)}
        />
      </div>
    </div>
  );
};

export default CardNode;
