import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const PilihData = (props) => {
  const animatedComponents = makeAnimated();
  const { option, node, data } = props;
  const [selectedNode, setSelectedNode] = useState(option[0]); // Menyimpan nilai node yang terpilih

  const formatTanggalIndonesia = (tanggal) => {
    const today = tanggal instanceof Date ? tanggal : new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [value, setValue] = useState({
    startDate: formatTanggalIndonesia(new Date()),
    endDate: formatTanggalIndonesia(new Date()),
  });

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const IsiDataNode = (newValue) => {
    setSelectedNode(newValue);
  };

  useEffect(() => {
    node(selectedNode, value);
  }, [selectedNode, value]);

  return (
    <div className="flex flex-col items-center justify-between sm:flex-row">
      <div className="w-full sm:w-auto">
        <div className="mx-5 my-5">
          <Select
            defaultValue={selectedNode}
            components={animatedComponents}
            options={option}
            onChange={(e) => {
              IsiDataNode(e);
            }}
          ></Select>
        </div>
      </div>
      <div className="w-full sm:w-auto">
        <div className="mx-5 my-1 sm:my-5 border border-gray-400 rounded-lg">
          <Datepicker value={value} onChange={handleValueChange} />
        </div>
      </div>
    </div>
  );
};

export default PilihData;
