import React from "react";
import {
  formatDateTime,
  formatTransactionHashTable,
} from "../../Utils/helpers";

const TableDetailOutput = ({ detailOutput }) => {
  return (
    <div>
      <div className="mt-5 bg-white overflow-hidden shadow rounded-lg border">
        <div className="lg:py-5 px-4 py-3">
          <h3 className="text-lg leading-6 font-medium text-green-700">
            Thông tin chung
          </h3>
        </div>
        <div className="border-t border-gray-200 lg:px-4 lg:py-5 sm:p-0 px-5 py-1">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="lg:py-3 py-1 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
                Mã Transaction
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {formatTransactionHashTable({
                  str: detailOutput.tx,
                  a: 8,
                  b: 5,
                })}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">Thời gian</dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {formatDateTime(detailOutput.time)}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
                Sản lượng (kg)
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {detailOutput.amount}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
              Số lượng lượng sản phẩm
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {detailOutput.quantity}
              </dd>
            </div>
            <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-700">
                Nhà cung cấp
              </dt>
              <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                {detailOutput.distributerWithAmount?.map((data, index) => (
                  <p key={index}>
                    {data.distributer.name} <br />
                  </p>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-5 lg:text-2xl font-bold text-green-400 pl-2">
        Thông tin nhà cung cấp
      </div>
      {detailOutput?.distributerWithAmount.map((dataDistributer, index) => (
        <div
          className="mt-5 bg-white overflow-hidden shadow rounded-lg border"
          key={index}
        >
          <div className="lg:py-5 px-4 py-3">
            <h3 className="text-lg leading-6 font-medium text-green-700">
              {dataDistributer.distributer.name}
            </h3>
          </div>
          <div className="border-t border-gray-200 lg:px-4 lg:py-5 sm:p-0 px-5 py-1">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">Số lượng sản phẩm </dt>
                <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                  {dataDistributer.quantity}
                </dd>
              </div>
              <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">Email</dt>
                <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                  {dataDistributer.distributer.email}
                </dd>
              </div>
              <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">Địa chỉ</dt>
                <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                  {dataDistributer.distributer.address}
                </dd>
              </div>
              <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-700">Mô tả</dt>
                <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                  {dataDistributer.distributer.description}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableDetailOutput;
