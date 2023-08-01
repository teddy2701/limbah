import React from "react";

const CekKoneksi = ({ title, ...rest }) => {
  return (
    <div className="mb-3">
      <label
        className="block text-xl sm:text-sm md:text-base font-medium text-black"
        for={title}
      >
        {title}
      </label>
      <input
        {...rest}
        className="bg-gray-50 border border-emerald-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
      <span className="text-green-500 text-xs ms-1">Terhubung</span>
      <span className="text-red-500 text-xs ms-1">Tidak terhubung</span>
    </div>
  );
};

export default CekKoneksi;
