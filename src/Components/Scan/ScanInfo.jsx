import React from "react";

import { useParams } from "react-router-dom";
import useScan from "./useScan";
import QR from "../../Services/qrService";
import { useNavigate } from "react-router";
import {
  formatDateTime,
  formatTransactionHashTable,
} from "../../Utils/helpers";

const ScanInfo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [qrInfo, setQRInfo] = React.useState(null);
  const projectId = useParams().projectId;
  const privateId = useParams().privateId;
  const {
    projectInfo,
    isSuccessProjectInfo,
    isLoadingProjectInfo,
    allDistributerWithQR,
    isSuccessQR,
    isLoadingQR,
  } = useScan({ projectId });

  const handleScanQR = async ({ projectId, privateId }) => {
    console.log("projectId: ", projectId);
    console.log("privateId: ", privateId);
    setScanned(true);
    try {
      setLoading(true);
      const res = await QR.scanQR({ projectId, privateId });
      if (
        (res.status === 200 &&
          res.data.metadata.message ===
            "QR is already scanned in blockchain") ||
        res.data.metadata.message === "QR is already scanned"
      ) {
        setQRInfo({
          timeScanned: res.data.metadata?.scannedQR?.timeScanned,
          txScan: res.data.metadata?.scannedQR?.txScan,
          firstScan: false,
        });

        console.log("qrInfo: ", {
          timeScanned: res.data.metadata?.scannedQR?.timeScanned,
          txScan: res.data.metadata?.scannedQR?.txScan,
          firstScan: false,
        });
      }

      if (res.status === 200 && !res.data.metadata.message) {
        setQRInfo({
          timeScanned: res.data.metadata?.timeScanned,
          txScan: res.data.metadata?.txScan,
          firstScan: true,
        });
      }
      setLoading(false);
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
      setError(error);
    }
  };

  return (
    <section className="" style={{ paddingTop: "16vh" }}>
      {isSuccessProjectInfo && isSuccessQR && (
        <div className="p-6 bg-grey lg:ml-20 lg:mr-20">
          <div className="bg-white overflow-hidden shadow rounded-lg border">
            <div className="lg:py-5 px-4 py-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-green-700">
                    Thông tin chung
                  </h3>
                </div>
                <div className="ml-4 bg-blue-400 lg:p-2 p-1 rounded-lg flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-white" // Kích thước lớn hơn và màu xanh
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                    />
                  </svg>

                  <h1 className="text-white font-bold italic">
                    Đã được ghi trên blockchain
                  </h1>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 lg:px-4 lg:py-5 sm:p-0 px-5 py-1">
              <dl className="sm:divide-y sm:divide-gray-200">
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Mã truy xuất
                  </dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    <a
                      className="text-blue-800 text-sm italic cursor-pointer hover:text-blue-600"
                      onClick={() => navigate(`/results/${projectInfo.id}`)}
                    >
                      {projectInfo.id}
                    </a>
                  </dd>
                </div>
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Số hiệu dự án Blockchain
                  </dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    {projectInfo.projectIndex} {" "}
                    <a
                      className="text-blue-800 text-sm italic cursor-pointer hover:text-blue-600"
                      onClick={() =>
                        navigate(`/search/index/${projectInfo.projectIndex}`)
                      }
                    >
                      Xem thông tin trên Blockchain
                    </a>
                  </dd>
                </div>
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">Tên cây</dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    {projectInfo.plant.plant_name}
                  </dd>
                </div>
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Nông trại sản xuất
                  </dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    {projectInfo.farm.name}
                  </dd>
                </div>
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">Mô tả</dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    {projectInfo.description}
                  </dd>
                </div>                
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-700">
                    Cửa hàng cung cấp
                  </dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    {allDistributerWithQR.map((distributer) => (
                      <div key={distributer.name}>
                        <h1>{distributer.name}</h1>
                        <br />
                      </div>
                    ))}
                  </dd>
                </div>
                <div className="lg:py-3 py-1 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="">
                    <div className="ml-6 mb-5 text-base font-bold text-white">
                      <button
                        className="bg-green-400 px-4 py-2 rounded-lg hover:bg-green-500"
                        onClick={() => handleScanQR({ projectId, privateId })}
                        disabled={scanned}
                      >
                        Xác nhận mua hàng
                      </button>
                    </div>
                  </dt>
                  <dd className="mt-1 text-sm text-black lg:text-base font-medium sm:mt-0 sm:col-span-2">
                    {isLoadingProjectInfo ||
                      (isLoadingQR && <div>Loading...</div>)}
                    {loading && <div>Scanning QR...</div>}
                    {qrInfo && qrInfo.firstScan && (
                      <div>
                        <h1>QR is scanned for the first time</h1>
                        <h2>Time: {formatDateTime(qrInfo.timeScanned)}</h2>
                        <h2 className="text-blue-800">
                          Transaction:{" "}
                          {formatTransactionHashTable({
                            str: qrInfo.txScan,
                            a: 8,
                            b: 5,
                          })}
                        </h2>
                      </div>
                    )}
                    {qrInfo && !qrInfo.firstScan && (
                      <div>
                        <h1>QR is already scanned</h1>
                        <h2>Time: {formatDateTime(qrInfo.timeScanned)}</h2>
                        <h2 className="text-blue-800">
                          Transaction:{" "}
                          {formatTransactionHashTable({
                            str: qrInfo.txScan,
                            a: 8,
                            b: 5,
                          })}
                        </h2>
                      </div>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ScanInfo;
