import React from "react";
import {
  formatDateTime,
  formatTransactionHashTable,
} from "../../Utils/helpers";

const TableOutput = ({ dataInfoOutput }) => {

  return (
    <div>
      <div className="mt-2 bg-white overflow-hidden shadow rounded-lg border">
        <div className="border-t border-gray-200 lg:px-4 lg:py-5 sm:p-0 px-5 py-1">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="lg:py-3 py-1 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
                Mã Transaction
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {formatTransactionHashTable({
                  str: dataInfoOutput.tx,
                  a: 8,
                  b: 5,
                })}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">Thời gian</dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {formatDateTime(dataInfoOutput.time)}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">Sản lượng (kg)</dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {dataInfoOutput.amount}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
              Số lượng sản phẩm
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {dataInfoOutput.quantity}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
                Nhà cung cấp
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {dataInfoOutput.distributerWithAmount?.map((data, index) => (
                  <p key={index}>
                    {data.distributer.name} <br />
                  </p>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default TableOutput;
