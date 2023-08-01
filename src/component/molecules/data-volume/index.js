import React from "react";
import { Grafik } from "../../atoms";
import { Link } from "react-router-dom";

const DataVolume = (props) => {
  const { option, data } = props;

  const dataGratik = data.map((item) => item.Volume);
  const labelGrafik = data.map((item) => item.date);

  return (
    <div className="mr-5 my-5 py-2 px-2 md:px-5 md:py-5 shadow-lg">
      <div className="flex justify-between">
        <div className="">
          <p className="text-black text-[9px] font-bold lg:text-lg md:text-base sm:text-[10px]">
            {option.label}
          </p>

          <Link
            className=" text-blue-400 text-[7px] font-bold lg:text-base md:text-sm sm:text-[10px]"
            to={`https://www.google.co.id/maps/place/${option.lokasi}`}
            target="_BLANK"
          >
            Lokasi : {option.lokasi}
          </Link>

          <p className="text-black text-[7px] font-bold lg:text-base md:text-sm sm:text-[10px]">
            Jumlah Debit: {dataGratik[dataGratik.length - 1]} Liter
          </p>
        </div>
      </div>
      <Grafik labelGrafik={labelGrafik} dataGrafik={dataGratik} />
    </div>
  );
};

export default DataVolume;
