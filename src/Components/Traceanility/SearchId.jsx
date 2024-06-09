import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Web3 from "web3";
import PROJECT from "../../Services/projectService";
import {
  abi,
  contractAddress,
  jsonRpcURL,
  video_abi,
  videoContractAddress,
} from "../../constants";
import { formatDateTime, formatWalletAddress } from "../../Utils/helpers";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const SearchId = () => {
  const [open, setOpen] = React.useState(0);
  const [projectIndex, setProjectIndex] = React.useState("");
  const [processes, setProcesses] = React.useState(null);
  const [expects, setExpects] = React.useState(null);
  const [outputs, setOutputs] = React.useState(null);
  const [project, setProject] = React.useState(null);
  const [videos, setVideos] = React.useState(null);
  const [connectionLoss, setConnectionLoss] = React.useState(null);

  const [loadingProcesses, setLoadingProcesses] = React.useState(false);
  const [loadingExpects, setLoadingExpects] = React.useState(false);
  const [loadingOutputs, setLoadingOutputs] = React.useState(false);
  const [loadingProject, setLoadingProject] = React.useState(false);
  const [loadingVideos, setLoadingVideos] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingConnectionLoss, setLoadingConnectionLoss] =
    React.useState(false);
  const [error, setError] = React.useState(null);

  const web3 = new Web3(jsonRpcURL);

  const contract = new web3.eth.Contract(abi, contractAddress);
  const videoContract = new web3.eth.Contract(video_abi, videoContractAddress);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const handleQueryBlockchain = async () => {
    setError(null);
    try {
      console.log("query blockchain", projectIndex);
      setLoading(true);
      setLoadingProcesses(false);
      setLoadingExpects(false);
      setLoadingOutputs(false);
      setLoadingProject(false);
      setLoadingConnectionLoss(false);
      setLoadingVideos(false);
      const project = await contract.methods.getProject(projectIndex).call();
      setLoadingProject(true);
      setProject(project);
      console.log("project: ", project);

      const processes = await contract.methods
        .getProjectProcesses(projectIndex)
        .call();
      setLoadingProcesses(true);
      setProcesses(processes);

      const expects = await contract.methods
        .getProjectExpects(projectIndex)
        .call();
      setLoadingExpects(true);
      setExpects(expects);

      const outputs = await contract.methods
        .getProjectOutputs(projectIndex)
        .call();
      setLoadingOutputs(true);
      setOutputs(outputs);

      // 1. call api to get list of cameraIndex and startDate and endTime
      const data = await PROJECT.getCameraIndexAndStartDateAndEndDate(
        projectIndex
      );
      console.log("data: ", data);
      // 2. query in blockchain video by cameraIndex
      // assume cameraIndex = [0], startDate = 2022-01-01, endTime = 2025-01-02
      const cameraIndex = data?.data?.metadata?.cameraIndex;
      // convert startDate and endTime to unix time stamp
      let startDate = data?.data?.metadata?.startDate;
      let endTime = data?.data?.metadata?.endDate;

      console.log("camera index", cameraIndex);
      console.log("time: ", typeof startDate, endTime);

      startDate = new Date(startDate).getTime() / 1000;
      endTime = new Date(endTime).getTime() / 1000;
      console.log("startDate: ", startDate);
      console.log("end time: ", endTime);
      // loop in cameraIndex and query
      const videos = [];
      const connectionLoss = [];
      for (let i = 0; i < cameraIndex.length; i++) {
        const video = await videoContract.methods
          .getVideosByCamera(cameraIndex[i])
          .call();
        console.log("video: ", video);

        // loop in video and print date
        video.forEach((item) => console.log("date: ", Number(item.date)));

        // loop in video to get list of videoItem with date between startDate and endTime, remember to convert date from unix time stamp to date
        const videoItem = video.filter(
          (item) =>
            Number(item.date) >= startDate && Number(item.date) <= endTime
        );

        videos.push(...videoItem);
        const connection = await videoContract.methods
          .getConnectionLossByCamera(cameraIndex[i])
          .call();

        console.log("connection: ", connection);

        connection.forEach((item) => console.log("date: ", Number(item.date)));

        const connectionItem = connection.filter(
          (item) =>
            Number(item.date) >= startDate && Number(item.date) <= endTime
        );
        connectionLoss.push(...connectionItem);
      }

      console.log("videos: ", videos);
      console.log("connectionLoss: ", connectionLoss);

      setVideos(videos);
      setConnectionLoss(connectionLoss);
      setLoadingVideos(true);
      setLoadingConnectionLoss(true);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
      setError("Không tìm thấy dữ liệu. Vui lòng thử lại.");
    }
  };
  return (
    <section className="">
      <section>
        <div className="flex items-center justify-center min-h-screen bg-green-100">
          <div className="mx-5 bg-white rounded-2xl border shadow-xl p-5 md:p-10 max-w-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 ">
            <div className="flex flex-col items-center space-y-4">
              <h1 className="font-bold text-2xl text-gray-700 w-full text-center">
                Project Index
              </h1>
              <p className="text-sm text-gray-500 text-center w-full">
                Hãy nhập mã project index sau đó kết qua tra cứu sẽ hiển thị.
              </p>
              <input
                type="text"
                placeholder="project index"
                className="border-2 rounded-lg w-full h-12 px-4"
                onChange={(e) => setProjectIndex(e.target.value)}
              />
              <button
                className="bg-green-400 text-white rounded-md font-semibold px-4 py-3 w-full"
                onClick={handleQueryBlockchain}
              >
                Tra cứu
              </button>
            </div>
          </div>
        </div>
      </section>
      {!loading && !error && (
        <section className="m-4 sm:m-16 px-4 bg-white">
          <>
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(1)}>
                <div>
                  <span>Địa chỉ ví ghi lên Blockchain:</span>
                  <p className="text-base text-blue-500 mt-2">
                    {project
                      ? formatWalletAddress({ str: project[0], a: 8, b: 5 })
                      : ""}
                  </p>
                </div>
              </AccordionHeader>
            </Accordion>
            <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(2)}>
                <div>
                  <span>Id Nông trại:</span>
                  <p className="text-base mt-2">{project ? project[1] : ""}</p>
                </div>
              </AccordionHeader>
            </Accordion>
            <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(3)}>
                Đầu vào
              </AccordionHeader>
              <AccordionBody>
                {loadingProject && project ? (
                  <>
                    {project["2"].map((input, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 overflow-hidden shadow rounded-lg border mb-2"
                      >
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Thông tin {index + 1}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{input}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Chưa có thông tin</p>
                )}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(4)}>
                Quá trình
              </AccordionHeader>
              <AccordionBody>
                {loadingProcesses && (processes || processes.length === 0) ? (
                  <>
                    {processes.map((process, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 overflow-hidden shadow rounded-lg border mb-2"
                      >
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Thông tin {index + 1}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {process}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Chưa có thông tin</p>
                )}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 5} icon={<Icon id={5} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(5)}>
                Dự đoán
              </AccordionHeader>
              <AccordionBody>
                {loadingExpects && (expects || expects.length === 0) ? (
                  <>
                    {expects.map((expect, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 overflow-hidden shadow rounded-lg border mb-2"
                      >
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Thông tin {index + 1}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{expect}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Chưa có thông tin</p>
                )}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 6} icon={<Icon id={6} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(6)}>
                Đầu ra
              </AccordionHeader>
              <AccordionBody>
                {loadingOutputs && (outputs || outputs.length === 0) ? (
                  <>
                    {outputs.map((output, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 overflow-hidden shadow rounded-lg border mb-2"
                      >
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Thông tin {index + 1}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{output}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Chưa có thông tin</p>
                )}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 7} icon={<Icon id={7} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(7)}>
                Hình ảnh và video
              </AccordionHeader>
              <AccordionBody>
                {loadingVideos && (videos || videos.length === 0) ? (
                  <>
                    {videos.map((video, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 overflow-hidden shadow rounded-lg border mb-2 "
                      >
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {formatDateTime(
                              new Date(Number(video.date) * 1000)
                            )}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <ul>
                              <li>Video hash: {video.hash}</li>
                              <li>Time description: {video.timeDesciption}</li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p>Chưa có thông tin</p>
                )}
              </AccordionBody>
            </Accordion>
            <Accordion open={open === 8} icon={<Icon id={8} open={open} />}>
              <AccordionHeader onClick={() => handleOpen(8)}>
                Kết nối
              </AccordionHeader>
              <AccordionBody>
                {loadingConnectionLoss &&
                (connectionLoss || connectionLoss.length === 0) ? (
                  <>
                    {connectionLoss.map((connection, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 overflow-hidden shadow rounded-lg border mb-2 "
                      >
                        <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {formatDateTime(
                              new Date(Number(connection.date) * 1000)
                            )}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            <ul>
                              <li>
                                Total loss per day (second):{" "}
                                {Number(connection.totalLossPerDay)}
                              </li>
                              <li>
                                Connection loss: {connection.connectionLoss}
                              </li>
                            </ul>
                          </p>
                        </div>
                      </div>
                    ))}{" "}
                  </>
                ) : (
                  <p>Chưa có thông tin</p>
                )}
              </AccordionBody>
            </Accordion>
          </>
        </section>
      )}
      {error && (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}
      {loading && <p className="text-center">Đang tải dữ liệu...</p>}
    </section>
  );
};

export default SearchId;
