import React from "react";
import { Grafik } from "../../atoms";

const NilaiNH = (props) => {
  const { data } = props;
  const dataGratik = data.map((item) => item.NH3N);
  const labelGrafik = data.map((item) => item.date);
  return (
    <div className="mx-1 my-1 py-2 px-2 lg:mx-3 lg:my-3 lg:py-3 lg:px-3 md:mx-2 md:my-2 md:py-2 md:px-2 sm:mx-1 sm:my-1 sm:py-1 sm:px-1 shadow-lg">
      <p className="text-black text-[9px] font-bold md:text-xl sm:text-sm">
        NH-3N: {dataGratik[dataGratik.length - 1]}
      </p>
      <Grafik labelGrafik={labelGrafik} dataGrafik={dataGratik} />
    </div>
  );
};

export default NilaiNH;
