import React, { useState } from "react";
import {
  formatDateTime,
  formatTransactionHashTable,
  renderTypeProcess,
} from "../../Utils/helpers";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import DialogInfoDetail from "../Dialog/DialogInfoDetail";

const DeleteProcess = ({ dataDeleteProcess }) => {
  const [selectedDeleteProcess, setSelectedDeleteProcess] = useState();
  const [openDetailDeleteProcess, setOpenDetailDeleteProcess] = useState(false);
  const handleOpenDetailDeleteProcess = () =>
    setOpenDetailDeleteProcess(!openDetailDeleteProcess);
  return (
    <div>
      {dataDeleteProcess?.length > 0 ? (
        <div className="rounded-md justify-items-center divide-y divide-gray-200">
          {dataDeleteProcess.map((proces, index) => (
            <ul
              className="lg:w-[700px] bg-white shadow border-t border-gray-200"
              key={index}
            >
              <li className="lg:px-6 lg:py-4 px-3 py-2">
                <div className="flex justify-between">
                  <span className="lg:text-2xl font-semibold text-base">
                    {renderTypeProcess(proces.type)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDateTime(proces.time)}
                  </span>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs lg:text-base text-blue-700 mt-1">
                    {formatTransactionHashTable({
                      str: proces.tx,
                      a: 8,
                      b: 5,
                    })}
                  </p>
                  <a
                    className="flex items-center text-xs text-green-700 border border-green-600 lg:py-1 lg:px-3 px-1 py-1 gap-1 rounded inline-flex items-center"
                    onClick={() => {
                      setSelectedDeleteProcess(proces);
                      handleOpenDetailDeleteProcess();
                    }}
                  >
                    <button className="font-medium">Chi tiết</button>
                    <svg
                      className="w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          ))}
        </div>
      ) : (
        <div className="lg:text-2xl text-gray-400 text-base mt-5">
          Không có dữ liệu
        </div>
      )}
      <div>
        <Dialog
          open={openDetailDeleteProcess}
          handler={handleOpenDetailDeleteProcess}
        >
          <DialogHeader>Thông tin chi tiết </DialogHeader>
          {selectedDeleteProcess && (
            <DialogBody>
              <DialogInfoDetail dataDetailInfo={selectedDeleteProcess} />
            </DialogBody>
          )}
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenDetailDeleteProcess}
              className="mr-1"
            >
              <span>Thoát</span>
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default DeleteProcess;
