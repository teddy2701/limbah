import React from "react";

const Input = ({ title, optional, ...rest }) => {
  return (
    <div className="">
      <label
        className="block text-xl sm:text-sm md:text-base font-medium text-black"
        htmlFor={title}
      >
        {title}
        <span className="text-gray-500 text-xs ms-1">{optional}</span>
      </label>
      <input
        {...rest}
        className="bg-gray-50 border border-emerald-500 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      />
    </div>
  );
};

export default Input;
