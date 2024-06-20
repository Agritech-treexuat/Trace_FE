import React from "react";
import { Spinner } from "@material-tailwind/react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="text-center">
        <Spinner className="h-24 w-24 text-green-500 mb-4" />
        <p className="text-lg text-gray-700">Đang tải dữ liệu</p>
      </div>
    </div>
  );
};

export default Loading;
