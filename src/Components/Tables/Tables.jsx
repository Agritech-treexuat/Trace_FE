import React, { useState } from "react";
import {
  formatDateTime,
  formatDate,
  formatTransactionHashTable,
} from "../../Utils/helpers";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";

const Tables = ({ infoData }) => {
  const [selectedDetetailDeleteExpect, setSelectedDetailExpect] = useState();
  const [openDetailDeleteExpect, setOpenDetailDeleteExpect] = useState(false);
  const handleOpenDetailDeleteExpect = () =>
    setOpenDetailDeleteExpect(!openDetailDeleteExpect);
  return (
    <div>
      {infoData && infoData.length > 0 ? (
        <div className="lg:w-[700px] block w-full overflow-x-auto border rounded-md bg-white">
          <table className="items-center bg-transparent w-full border-2">
            <thead>
              <tr>
                <th className="lg:text-lg lg:px-4 px-2 bg-blueGray-50 text-blueGray-800 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Thời gian
                </th>
                <th className="lg:text-lg lg:px-4 px-2 bg-blueGray-50 text-blueGray-800 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Dự kiến (kg)
                </th>
                <th className="lg:text-lg lg:px-4 px-2 bg-blueGray-50 text-blueGray-800 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
              </tr>
            </thead>

            <tbody>
              {infoData.map((data, index) => (
                <tr key={index}>
                  <th className="lg:text-base lg:px-4 border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                    {formatDateTime(data.time)}
                  </th>
                  <th className="lg:text-base lg:px-4 border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-3 text-left text-blueGray-700 ">
                    {data.amount}
                  </th>
                  <td className="border-t-0 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-3">
                    <button
                      className="bg-green-400 text-white active:bg-green-700 text-xs font-bold uppercase px-2 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        handleOpenDetailDeleteExpect();
                        setSelectedDetailExpect(data);
                      }}
                    >
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="lg:text-2xl text-gray-400 text-base mt-5">
          Không có dữ liệu
        </div>
      )}
      <div>
        <Dialog
          open={openDetailDeleteExpect}
          handler={handleOpenDetailDeleteExpect}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader>Thông tin chi tiết </DialogHeader>
          {selectedDetetailDeleteExpect && (
            <DialogBody className="overflow-y-scroll !px-5 max-h-96">
              <div className="overflow-y-auto">
                <div>
                  <div className="max-w-screen-md text-xs border-b pb-2">
                    <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                      Mã transaction
                    </h3>
                    <p className="lg:text-base font-semibold text-blue-900">
                      {formatTransactionHashTable({
                        str: selectedDetetailDeleteExpect.tx,
                        a: 8,
                        b: 5,
                      })}
                    </p>
                  </div>
                  <div className="lg:text-lg max-w-screen-md text-xs mt-4 border-b pb-2">
                    <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                      Thời gian xóa
                    </h3>
                    <p className="lg:text-base font-semibold text-gray-700">
                      {formatDateTime(selectedDetetailDeleteExpect.time)}
                    </p>
                  </div>
                  <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                    <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                      Sản lượng (kg)
                    </h3>
                    <p className="lg:text-base font-semibold text-gray-700">
                      {selectedDetetailDeleteExpect.amount}
                    </p>
                  </div>
                  <div className="max-w-screen-md text-xs mt-4 border-b pb-2">
                    <h3 className="lg:text-lg text-base font-semibold text-gray-900">
                      Ghi chú
                    </h3>
                    <p className="lg:text-base mt-1 font-medium text-gray-700">
                      {selectedDetetailDeleteExpect.note}
                    </p>
                  </div>
                </div>
              </div>
            </DialogBody>
          )}
          <DialogFooter>
            <Button
              variant="gradient"
              color="red"
              onClick={handleOpenDetailDeleteExpect}
            >
              <span>Thoát</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default Tables;
