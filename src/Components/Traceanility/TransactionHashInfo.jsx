import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { Spinner } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { eventMap, eventMapData } from "../../constants";

const TransactionHashInfo = () => {
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const displayMoblies = (text) => {
    if (isMobile) {
      return `${text.slice(0, 8)}...${text.slice(-8)}`;
    }
    return text;
  };
  const getTransactionInfo = async (txHashParams) => {
    if (!txHashParams) return;
    try {
      console.log("txHashParams here: ", txHashParams);
      setLoading(true);
      const jsonRpcURL =
        process.env.REACT_APP_jsonRpcURL || "https://evmos-pokt.nodies.app";

      const web3 = new Web3(jsonRpcURL);
      const transaction = await web3.eth.getTransaction(txHashParams);

      if (!transaction) {
        alert("Transaction not found");
        setLoading(false);
        return;
      }

      const receipt = await web3.eth.getTransactionReceipt(txHashParams);
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
        transactionHash: txHashParams,
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
  const txHashParams = useParams().transactionHash;
  console.log("txHashParams: ", txHashParams);
  useEffect(() => {
    getTransactionInfo(txHashParams);
  }, [txHashParams]);

  return (
    <section className="">
      {loading ? (
        <p style={{ paddingTop: "10vh" }}>
          {" "}
          Loading information from blockchain{" "}
          <Spinner color="lightBlue" size="xl" />
        </p>
      ) : transactionInfo ? (
        <section
          className="bg-gray-100 p-4 md:p-10 mx-2 md:mx-5"
          style={{ paddingTop: "10vh" }}
        >
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
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 ">
                    <a
                      href={`https://escan.live/tx/${transactionInfo.transactionHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500"
                    >
                      {displayMoblies(transactionInfo.transactionHash)}
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
                    {displayMoblies(transactionInfo.from)}
                  </dd>
                </div>
                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">To:</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {displayMoblies(transactionInfo.to)}
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
      ) : (
        <p style={{ paddingTop: "10vh" }}>Transaction not found</p>
      )}
    </section>
  );
};

export default TransactionHashInfo;
