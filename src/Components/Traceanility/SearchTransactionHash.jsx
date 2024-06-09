import React, { useState } from "react";
import Web3 from "web3";
import { Spinner } from "@material-tailwind/react";
import { eventMap, eventMapData } from "../../constants";

const SearchTransactionHash = () => {
  const [transactionHash, setTransactionHash] = useState("");
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTransactionInfo = async () => {
    try {
      setLoading(true);
      const jsonRpcURL =
        process.env.REACT_APP_jsonRpcURL || "https://evmos-pokt.nodies.app";

      const web3 = new Web3(jsonRpcURL);
      console.log("transaction hash: ", transactionHash);
      const transaction = await web3.eth.getTransaction(transactionHash);

      if (!transaction) {
        alert("Transaction not found");
        setLoading(false);
        return;
      }

      const receipt = await web3.eth.getTransactionReceipt(transactionHash);
      console.log("recept: ", receipt);
      const logs = receipt.logs
        .map((log) => {
          const eventData = eventMap[log.topics[0]]; // Lấy thông tin về sự kiện từ map
          console.log("event data: ", eventData);

          if (!eventData) return null;

          return {
            name: eventData.name,
            data: web3.eth.abi.decodeLog(
              eventData.dataStructure,
              log.data,
              log.topics
            ),
          };
        })
        .filter(Boolean); // Lọc bỏ các sự kiện không hợp lệ

      let block = await web3.eth.getBlock(Number(transaction.blockNumber));
      let timestamp = Number(block.timestamp);

      setTransactionInfo({
        transactionHash,
        blockNumber: Number(transaction.blockNumber),
        from: transaction.from,
        to: transaction.to,
        gasUsed: Number(receipt.gasUsed),
        timestamp: new Date(timestamp * 1000),
        events: logs,
      });
      setLoading(false);
    } catch (error) {
      <alert className="text-red-500">
        Error fetching transaction info: {error}
      </alert>;
      console.error("Error fetching transaction info:", error);
      setLoading(false);
    }
  };

  return (
    <section className="">
      <section>
        <div className="flex items-center justify-center min-h-screen bg-green-100">
          <div className="mx-5 bg-white rounded-2xl border shadow-xl p-5 md:p-10 max-w-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 ">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-bold text-2xl text-gray-700 w-full text-center">
                Transaction hash
              </h1>
              <p className="text-sm text-gray-500 text-center w-full">
                Hãy nhập mã transaction hash sau đó kết qua tra cứu sẽ hiển thị.
              </p>
              <input
                type="text"
                placeholder="Transaction hash"
                className="border-2 rounded-lg w-full h-12 px-4"
                onChange={(e) => setTransactionHash(e.target.value.trim())}
              />
              <button
                className="bg-green-400 text-white rounded-md font-semibold px-4 py-3 w-full"
                onClick={getTransactionInfo}
              >
                Tra cứu
              </button>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Spinner />
      ) : (
        transactionInfo && (
          <section className="bg-gray-100 p-4 md:p-10 mx-2 md:mx-5">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Thông tin
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Dưới đây là thông tin từ transaction hash của bạn
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Transaction hash
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <a
                        href={`https://escan.live/tx/${transactionInfo.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500"
                      >
                        {transactionInfo.transactionHash}
                      </a>
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Block number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {transactionInfo.blockNumber}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">From:</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {transactionInfo.from}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">To:</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {transactionInfo.to}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Gas used:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {transactionInfo.gasUsed}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Time:</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {transactionInfo.timestamp.toString()}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Name event:
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {transactionInfo.events[0].name}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Data:</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {eventMapData(transactionInfo.events[0])}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        )
      )}
    </section>
  );
};

export default SearchTransactionHash;
