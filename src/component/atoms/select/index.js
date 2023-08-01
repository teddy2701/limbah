import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const Pilih = ({ title, arrayData, data, hakAkses, value }) => {
  const animatedComponents = makeAnimated();
  const [cekMulti, setCekMuli] = useState(false);
  const [tutup, setTutup] = useState(false);

  useEffect(() => {
    if (hakAkses === "provinsi") {
      setTutup(true);
    } else {
      setTutup(false);
    }

    if (hakAkses === "madya") {
      setCekMuli(true);
    } else {
      setCekMuli(false);
    }
  });

  return (
    <div className="mb-3">
      <label
        className="block text-xl sm:text-sm md:text-base font-medium text-black"
        htmlFor={title}
      >
        {title}
      </label>
      <Select
        defaultValue={value}
        isDisabled={tutup}
        isMulti={cekMulti}
        components={animatedComponents}
        options={arrayData}
        onChange={(e) => {
          data(e);
        }}
      ></Select>
    </div>
  );
};

export default Pilih;
