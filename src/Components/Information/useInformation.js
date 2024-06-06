import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import PROJECT from "../../Services/projectService";
import QR from "../../Services/qrService";
export default function useInformation({ projectId }) {
  // output images
  const parseData = useCallback((data) => {
    let outputImages = [];
    data.forEach((item) => {
      item.images.forEach((img) => {
        outputImages.push({ img });
      });
    });

    let allDistributerWithAmount = [];
    data.forEach((item) => {
      item.distributerWithAmount.forEach((distributerWithAmount) => {
        allDistributerWithAmount.push(distributerWithAmount);
      });
    });

    const output = data.map((item) => ({
      id: item?._id,
      tx: item?.tx,
      time: item?.time,
      amount: item?.amount,
      images: item?.images,
      note: item?.note,
      isEdited: item?.isEdited,
      historyOutput: item?.historyOutput,
      createdAtTime: item?.createdAtTime,
      distributerWithAmount: item?.distributerWithAmount,
      quantity: item?.quantity,
    }));

    const editOutputCount = output.reduce(
      (total, item) => total + item.historyOutput.length,
      0
    );

    return { outputImages, allDistributerWithAmount, output, editOutputCount };
  }, []);
  const {
    data: dataOutput,
    isSuccess: isSuccessOutput,
    isLoading: isLoadingOutput,
  } = useQuery({
    queryKey: ["projectOutput", projectId],
    queryFn: () => PROJECT.getOutput(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseData(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataProjectInfo = useCallback((data) => {
    let projectInfo = {
      id: data?._id || "Không có dữ liệu",
      plant: data?.plant || "Không có dữ liệu",
      seed: data?.seed || "Không có dữ liệu",
      startDate: data?.startDate || "Không có dữ liệu",
      endDate: data?.endDate,
      square: data?.square || "Không có dữ liệu",
      status: data?.status || "Không có dữ liệu",
      description: data?.description || "Không có dữ liệu",
      isGarden: data?.isGarden || "Không có dữ liệu",
      projectIndex: data?.projectIndex || "Không có dữ liệu",
      txHash: data?.txHash || "Không có dữ liệu",
      farm: data?.farm || "Không có dữ liệu",
      expectedEndDate: data?.expectedEndDate,
      expectedOutput: data?.expectedOutput,
      video_urls: data?.video_urls,
    };

    let endTime = new Date()

    if(projectInfo.endDate){
      endTime = new Date(projectInfo.endDate)
    }

    projectInfo.totalTime = Math.abs(endTime - new Date(projectInfo.startDate)) / (1000 * 60)

    return {
      projectInfo,
    };
  }, []);

  const {
    data: dataProjectInfo,
    isSuccess: isSuccessProjectInfo,
    isLoading: isLoadingProjectInfo,
  } = useQuery({
    queryKey: ["projectInfo", projectId],
    queryFn: () => PROJECT.getProjectByProjectId(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataProjectInfo(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataProcess = useCallback((data) => {
    const process = {
      cultivation: [],
      planting: [],
      fertilize: [],
      pesticide: [],
      other: [],
    };
    data.processes.forEach((item) => {
      process[item.type].push(item);
    });

    let dataProcess = [];
    if (process.cultivation && process.cultivation.length > 0)
      process.cultivation.map((item) => {
        dataProcess.push({
          tx: item?.tx,
          _id: item?._id,
          time: item?.time,
          type: item?.type,
          name: item?.cultivationActivity.name,
          // detail: {
          //   tx: item?.tx,
          //   name: item?.cultivationActivity.name,
          //   description: item?.cultivationActivity.description,
          // },
          cultivationActivity: item?.cultivationActivity,
          historyProcess: item?.historyProcess,
          objectDetections: item?.objectDetections,
        });
      });

    process.planting.map((item) => {
      dataProcess.push({
        tx: item?.tx,
        _id: item?._id,
        time: item?.time,
        type: item?.type,
        name: `Gieo trồng với mật độ ${item?.plantingActivity.density}`,
        // detail: {
        //   tx: item?.tx,
        //   density: item?.plantingActivity.density,
        //   description: item?.plantingActivity.description,
        // },
        plantingActivity: item?.plantingActivity,
        historyProcess: item?.historyProcess,
        objectDetections: item?.objectDetections,
      });
    });

    process.fertilize.map((item) => {
      dataProcess.push({
        tx: item?.tx,
        _id: item?._id,
        time: item?.time,
        type: item?.type,
        name: `Bón phân lúc ${item?.fertilizationActivity.fertilizationTime}`,
        // detail: {
        //   tx: item?.tx,
        //   fertilizationTime: item?.fertilizationActivity.fertilizationTime,
        //   description: item?.fertilizationActivity.description,
        //   type: item?.fertilizationActivity.type,
        // },
        fertilizationActivity: item?.fertilizationActivity,
        historyProcess: item?.historyProcess,
        objectDetections: item?.objectDetections,
      });
    });

    process.pesticide.map((item) => {
      dataProcess.push({
        tx: item?.tx,
        _id: item?._id,
        time: item?.time,
        type: item?.type,
        name: `Phòng trừ ${item?.pestAndDiseaseControlActivity.name}`,
        // detail: {
        //   tx: item?.tx,
        //   name: item?.pestAndDiseaseControlActivity.name,
        //   symptoms: item?.pestAndDiseaseControlActivity.symptoms,
        //   solution: item?.pestAndDiseaseControlActivity.solution,
        //   type: item?.pestAndDiseaseControlActivity.type,
        // },
        pestAndDiseaseControlActivity: item?.pestAndDiseaseControlActivity,
        historyProcess: item?.historyProcess,
        objectDetections: item?.objectDetections,
      });
    });

    process.other.map((item) => {
      dataProcess.push({
        tx: item?.tx,
        _id: item?._id,
        time: item?.time,
        type: item?.type,
        name: `${item?.other.description}`,
        // detail: {
        //   tx: item?.tx,
        //   description: item?.other.description,
        // },
        other: item?.other,
        historyProcess: item?.historyProcess,
        objectDetections: item?.objectDetections,
      });
    });

    dataProcess.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeA - timeB;
    });

    // Mảng ban đầu chứa các đối tượng ObjectDetection
    const nonProcessObjectDetection = data?.nonProcessObjectDetection;

    // Tạo một đối tượng Map để nhóm các ObjectDetection theo ngày
    const groupedByDate = new Map();

    // Lặp qua từng ObjectDetection
    nonProcessObjectDetection.forEach((objectDetection) => {
      // Lấy ra ngày của start_time
      const date = new Date(objectDetection.start_time).toLocaleDateString();

      // Kiểm tra xem đã có một phần tử trong Map cho ngày này chưa
      if (groupedByDate.has(date)) {
        // Nếu đã có, thêm ObjectDetection vào mảng của ngày đó
        groupedByDate.get(date).objectDetections.push(objectDetection);
      } else {
        // Nếu chưa có, tạo một phần tử mới và thêm vào Map
        groupedByDate.set(date, {
          date: date,
          objectDetections: [objectDetection],
        });
      }
    });

    // Chuyển Map thành mảng để thuận tiện cho việc sử dụng
    const formatedNonProcessObjectDetectionewArray = [
      ...groupedByDate.values(),
    ];

    const processWithoutObjectDetectionCount = dataProcess.filter(
      (item) => item.objectDetections.length === 0
    ).length;

    // check number of edit process base on number of item in historyProcess each
    let totalEditProcess = 0;
    dataProcess.forEach((item) => {
      totalEditProcess += item.historyProcess.length;
    });
    return {
      dataProcess,
      formatedNonProcessObjectDetectionewArray,
      processWithoutObjectDetectionCount,
      totalEditProcess,
    };
  }, []);

  const {
    data: dataProcess,
    isSuccess: isSuccessProcess,
    isLoading: isLoadingProcess,
  } = useQuery({
    queryKey: ["getProcess", projectId],
    queryFn: () => PROJECT.getProcessWithObjectDetections(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataProcess(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataExpect = useCallback((data) => {
    const expect = data.map((item) => ({
      id: item?._id,
      tx: item?.tx,
      time: item?.time,
      amount: item?.amount,
      note: item?.note,
      isEdited: item?.isEdited,
      historyExpect: item?.historyExpect,
      createdAtTime: item?.createdAtTime,
    }));

    let expectFull = [];

    // in each expect item in expect, push item in historyExpect to expect array
    expect.forEach((item) => {
      expectFull.push(item);
      item.historyExpect.forEach((historyItem) => {
        expectFull.push(historyItem);
      });
    });

    // sort by time
    expectFull.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeA - timeB;
    });

    const editExpectCount = expect.reduce(
      (total, item) => total + item.historyExpect.length,
      0
    );
    return { expectFull, editExpectCount };
  }, []);

  const {
    data: dataExpect,
    isSuccess: isSuccessExpect,
    isLoading: isLoadingExpect,
  } = useQuery({
    queryKey: ["projectExpect", projectId],
    queryFn: () => PROJECT.getExpect(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataExpect(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataCertificateImages = useCallback((data) => {
    const certificateImages = data.map((item) => {
      return {
        imgelink: item,
      };
    });
    return { certificateImages };
  }, []);
  const {
    data: dataCertificateImages,
    isSuccess: isSuccessCertificateImages,
    isLoading: isLoadingCertificateImages,
  } = useQuery({
    queryKey: ["getCertificateImages", projectId],
    queryFn: () => PROJECT.getCertificateImages({ projectId }),
    staleTime: 20 * 1000,
    select: (data) => parseDataCertificateImages(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataPlantFarming = useCallback((data) => {
    if (!data)
      return {
        plantFarming: null,
      };
    const plantFarming = {
      id: data?._id,
      plant: data?.plant,
      seed: data?.seed,
      timeCultivates: data?.timeCultivates,
      cultivationActivities: data?.cultivationActivities,
      plantingActivity: data?.plantingActivity,
      fertilizationActivities: data?.fertilizationActivities,
      pestAndDiseaseControlActivities: data?.pestAndDiseaseControlActivities,
      bestTimeCultivate: data?.bestTimeCultivate,
      farmingTime: data?.farmingTime,
      harvestTime: data?.harvestTime,
      isEdited: data?.isEdited,
      historyPlantFarmingEdit: data?.historyPlantFarmingEdit,
      createdAtTime: data?.createdAtTime,
    };
    return { plantFarming };
  }, []);
  const {
    data: dataPlantFarming,
    isSuccess: isSuccessPlantFarming,
    isLoading: isLoadingPlantFarming,
  } = useQuery({
    queryKey: ["getPlantFarmingFromProject", projectId],
    queryFn: () => PROJECT.getPlantFarmingFromProject(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataPlantFarming(data?.data?.metadata),
    enabled: !!projectId,
  });

  //get delete process information
  const parseDataDeleteProcess = useCallback((data) => {
    if (!data)
      return {
        dataDeleteProcess: null,
      };
    const dataDeleteProcess = {
      deletedProcess: data?.deletedProcess,
      deletedExpect: data?.deletedExpect,
      deletedOutput: data?.deletedOutput,
    };

    const totalDeletedItem =
      dataDeleteProcess.deletedProcess.length +
      dataDeleteProcess.deletedExpect.length +
      dataDeleteProcess.deletedOutput.length;
    return { dataDeleteProcess, totalDeletedItem };
  }, []);

  const {
    data: dataDeleteProcess,
    isSuccess: isSuccessDeleteProcess,
    isLoading: isLoadingDeleteProcess,
  } = useQuery({
    queryKey: ["projectDeleteProcess", projectId],
    queryFn: () => PROJECT.getInfoDeleteProcess(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataDeleteProcess(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataConnectionLoss = useCallback((data) => {
    const connectionLosses = data.map((item) => ({
      id: item?._id,
      camera_id: item?.camera_id,
      start_time: item?.start_time,
      end_time: item?.end_time,
      tx_hash: item?.tx_hash,
    }));

    connectionLosses.map((item) => {
      item.start_time = new Date(item.start_time);
    });

    const totalConnectionLossBySeconds = connectionLosses.reduce(
      (total, item) =>
        total +
        (new Date(item.end_time)?.getTime() -
          new Date(item.start_time)?.getTime()) /
          1000,
      0
    );
    return { connectionLosses, totalConnectionLossBySeconds };
  }, []);

  const {
    data: dataConnectionLoss,
    isSuccess: isSuccessConnectionLoss,
    isLoading: isLoadingConnectionLoss,
  } = useQuery({
    queryKey: ["getConnectionLossByProject", projectId],
    queryFn: () => PROJECT.getConnectionLossByProject(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataConnectionLoss(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataImage = useCallback((data) => {
    const images = data.map((item) => ({
      id: item?._id,
      camera_id: item?.camera_id,
      capture_time: item?.capture_time,
      image_url: item?.image_url,
      tx_hash: item?.tx_hash,
      image_hash: item?.image_hash,
    }));

    return { images };
  }, []);

  const {
    data: dataImage,
    isSuccess: isSuccessImage,
    isLoading: isLoadingImage,
  } = useQuery({
    queryKey: ["getImageByProject", projectId],
    queryFn: () => PROJECT.getImageByProject(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataImage(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataWeather = useCallback((data) => {
    const weathers = data.map((item) => ({
      id: item?._id,
      district: item?.district,
      time: item?.time,
      description: item?.description,
      temp: item?.temp,
      humidity: item?.humidity,
      windSpeed: item?.windSpeed,
    }));

    return { weathers };
  }, []);

  const {
    data: dataWeather,
    isSuccess: isSuccessWeather,
    isLoading: isLoadingWeather,
  } = useQuery({
    queryKey: ["getWeatherByProject", projectId],
    queryFn: () => PROJECT.getWeatherByProject(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataWeather(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseDataCamera = useCallback((data) => {
    const cameras = data.map((item) => ({
      id: item?._id,
      name: item?.name,
      rtsp_link: item?.rtsp_link,
    }));

    const totalCamera = cameras.length;

    return { cameras, totalCamera };
  }, []);

  const {
    data: dataCamera,
    isSuccess: isSuccessCamera,
    isLoading: isLoadingCamera,
  } = useQuery({
    queryKey: ["getCameraByProject", projectId],
    queryFn: () => PROJECT.getCameraByProject(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseDataCamera(data?.data?.metadata),
    enabled: !!projectId,
  });

  const parseQRProject = useCallback((data) => {
    // group based on distributer.name then count totalQR and totalScannedQR each
    const groupedByDistributer = new Map();
    data.forEach((item) => {
      const distributer = item.distributer;
      if (groupedByDistributer.has(distributer.name)) {
        const current = groupedByDistributer.get(distributer.name);
        current.totalQR += 1;
        current.totalScannedQR += item.isScanned ? 1 : 0;
      } else {
        groupedByDistributer.set(distributer.name, {
          name: distributer.name,
          totalQR: 1,
          totalScannedQR: item.isScanned ? 1 : 0,
        });
      }
    });

    return {
      totalQR: data.length,
      totalScannedQR: data.filter((item) => item.isScanned).length,
      allDistributerWithQR: [...groupedByDistributer.values()],
    };
  }, []);

  const {
    data: dataQR,
    isSuccess: isSuccessQR,
    isLoading: isLoadingQR,
  } = useQuery({
    queryKey: ["getQRByProjectId", projectId],
    queryFn: () => QR.getQRByProjectId(projectId),
    staleTime: 20 * 1000,
    select: (data) => parseQRProject(data?.data?.metadata),
    enabled: !!projectId,
  });

  return {
    ImageProduct: dataOutput?.outputImages,
    allDistributerWithAmount: dataOutput?.allDistributerWithAmount,
    Output: dataOutput?.output,
    isSuccessOutput,
    isLoadingOutput,
    projectInfo: dataProjectInfo?.projectInfo,
    isSuccessProjectInfo,
    isLoadingProjectInfo,
    dataProcess: dataProcess?.dataProcess,
    nonProcessObjectDetection:
      dataProcess?.formatedNonProcessObjectDetectionewArray,
    isSuccessProcess,
    isLoadingProcess,
    dataExpect: dataExpect?.expectFull,
    isSuccessExpect,
    isLoadingExpect,
    dataCertificateImages: dataCertificateImages?.certificateImages,
    isSuccessCertificateImages,
    isLoadingCertificateImages,
    dataPlantFarming: dataPlantFarming?.plantFarming,
    isSuccessPlantFarming,
    isLoadingPlantFarming,
    dataDeleteProcess: dataDeleteProcess?.dataDeleteProcess,
    isSuccessDeleteProcess,
    isLoadingDeleteProcess,
    dataConnectionLoss: dataConnectionLoss?.connectionLosses,
    totalConnectionLossBySeconds:
      dataConnectionLoss?.totalConnectionLossBySeconds,
    isSuccessConnectionLoss,
    isLoadingConnectionLoss,
    dataImage: dataImage?.images,
    isSuccessImage,
    isLoadingImage,
    dataWeather: dataWeather?.weathers,
    isSuccessWeather,
    isLoadingWeather,
    dataCamera: dataCamera?.cameras,
    totalCamera: dataCamera?.totalCamera,
    isSuccessCamera,
    isLoadingCamera,
    totalEditProcess: dataProcess?.totalEditProcess,
    processWithoutObjectDetectionCount:
      dataProcess?.processWithoutObjectDetectionCount,
    totalDeletedItem: dataDeleteProcess?.totalDeletedItem,
    editExpectCount: dataExpect?.editExpectCount,
    editOutputCount: dataOutput?.editOutputCount,
    totalQR: dataQR?.totalQR,
    totalScannedQR: dataQR?.totalScannedQR,
    allDistributerWithQR: dataQR?.allDistributerWithQR,
    isSuccessQR,
    isLoadingQR,
  };
}
