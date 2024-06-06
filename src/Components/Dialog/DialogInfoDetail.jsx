import React from "react";
import {
  formatDateTime,
  formatTransactionHashTable,
  renderTypeProcess,
  renderTypePestAndDisease,
} from "../../Utils/helpers";

const DialogInfoDetail = ({ dataDetailInfo }) => {
  return (
    <div className="mb-6">
      <div>
        <div className="max-w-screen-md text-xs border-b pb-2">
          <h3 className="lg:text-lg text-base font-semibold text-gray-900">
            Mã transaction
          </h3>
          <p className="lg:text-base font-semibold text-blue-900">
            {formatTransactionHashTable({
              str: dataDetailInfo.tx,
              a: 8,
              b: 5,
            })}
          </p>
        </div>
        <div className="lg:text-lg max-w-screen-md text-xs mt-4 border-b pb-2">
          <h3 className="lg:text-lg text-base font-semibold text-gray-900">
            Thời gian
          </h3>
          <p className="lg:text-base font-semibold text-gray-700">
            {formatDateTime(dataDetailInfo.time)}
          </p>
        </div>
        <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
          <h3 className="lg:text-lg text-base font-semibold text-gray-900">
            Loại hoạt động
          </h3>
          <p className="lg:text-base font-semibold text-gray-700">
            {renderTypeProcess(dataDetailInfo.type)}
          </p>
        </div>

        {/* Làm đất */}
        {dataDetailInfo?.cultivationActivity && (
          <div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Tên hoạt động
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.cultivationActivity.name}
              </p>
            </div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Mô tả
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.cultivationActivity.description}
              </p>
            </div>
          </div>
        )}
        {/* Bón phân */}
        {dataDetailInfo?.fertilizationActivity && (
          <div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Thời điểm bón
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.fertilizationActivity.fertilizationTime}
              </p>
            </div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Mô tả
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.fertilizationActivity.description}
              </p>
            </div>
          </div>
        )}

        {/* Thuốc trừ sâu */}
        {dataDetailInfo?.pestAndDiseaseControlActivity &&
          dataDetailInfo.pestAndDiseaseControlActivity.solution.length > 0 && (
            <div>
              <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                  Đối tượng
                </h3>
                <p className="lg:text-base mt-1 font-medium text-gray-700">
                  {dataDetailInfo.pestAndDiseaseControlActivity.name}
                </p>
              </div>
              <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                  Kiểu
                </h3>
                <p className="lg:text-base mt-1 font-medium text-gray-700">
                  {renderTypePestAndDisease(
                    dataDetailInfo.pestAndDiseaseControlActivity.type
                  )}
                </p>
              </div>
              <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                  Triệu chứng
                </h3>
                <p className="lg:text-base mt-1 font-medium text-gray-700">
                  {dataDetailInfo.pestAndDiseaseControlActivity.symptoms}
                </p>
              </div>
              <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                  Giải pháp
                </h3>
                {dataDetailInfo.pestAndDiseaseControlActivity.solution.map(
                  (solutionInfo, index) => (
                    <p
                      className="lg:text-base mt-1 font-medium text-gray-700"
                      key={index}
                    >
                      {index + 1} : {""}
                      {solutionInfo}
                    </p>
                  )
                )}
              </div>
            </div>
          )}

        {/* Trồng cây */}
        {dataDetailInfo?.plantingActivity && (
          <div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Mật động
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.plantingActivity.density}
              </p>
            </div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Mô tả
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.plantingActivity.description}
              </p>
            </div>
          </div>
        )}
        {/* Hoạt động khác */}
        {dataDetailInfo?.other && (
          <div>
            <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
              <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                Mô tả
              </h3>
              <p className="lg:text-base mt-1 font-medium text-gray-700">
                {dataDetailInfo.other.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DialogInfoDetail;
