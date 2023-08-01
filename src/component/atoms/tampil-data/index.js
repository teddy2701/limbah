import React from "react";

const TampilDataLimbah = (props) => {
  const { rataRataLimbah } = props;

  return (
    <div className="mx-5 my-5 py-5 px-5 shadow-lg">
      <p className="text-black text-[9px] font-bold md:text-xl sm:text-sm ">
        Nilai Rata Rata Limbah
      </p>
      <div className="justify-between items-center mt-10 grid-cols-2 grid gap-2 md:gap-4 md:grid-cols-4">
        <div className="bg-blue-500/70 px-1 py-1 sm:px-2 sm:py-2 md:px-3 md:py-3 lg:px-5 lg:py-5 text-center rounded-lg">
          <p className="text-white text-[9px] md:text-[11px] lg:text-[12px]">
            NH3-N
          </p>
          <p className="text-white font-bold text-xl md:text-1xl lg:text-3xl">
            {rataRataLimbah.NH3N.toFixed(2)}
          </p>
        </div>
        <div className="bg-yellow-300/70 px-1 py-1 sm:px-2 sm:py-2 md:px-3 md:py-3 lg:px-5 lg:py-5 text-center rounded-lg">
          <p className="text-white text-[9px] md:text-[11px] lg:text-[12px]">
            COD
          </p>
          <p className="text-white font-bold text-xl md:text-1xl lg:text-3xl ">
            {rataRataLimbah.COD.toFixed(2)}
          </p>
        </div>
        <div className="bg-red-600/70 px-1 py-1 sm:px-2 sm:py-2 md:px-3 md:py-3 lg:px-5 lg:py-5 text-center rounded-lg">
          <p className="text-white text-[9px] md:text-[11px] lg:text-[12px]">
            pH
          </p>
          <p className="text-white font-bold text-xl md:text-1xl lg:text-3xl ">
            {rataRataLimbah.PH.toFixed(2)}
          </p>
        </div>
        <div className="bg-green-600/70 px-1 py-1 sm:px-2 sm:py-2 md:px-3 md:py-3 lg:px-5 lg:py-5 text-center rounded-lg">
          <p className="text-white text-[9px] md:text-[11px] lg:text-[12px]">
            TTS
          </p>
          <p className="text-white font-bold text-xl md:text-1xl lg:text-3xl ">
            {rataRataLimbah.TTS.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TampilDataLimbah;
