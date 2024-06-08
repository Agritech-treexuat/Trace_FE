import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import FARM from "../../Services/farmService";
import PLANT from "../../Services/plantService";
import PROJECT from "../../Services/projectService";
import { formatDateTime } from "../../Utils/helpers";
import QR from "../../Services/qrService";
export default function useProfile({ farmId }) {
  const parseDataFarmById = useCallback((data) => {
    const farmInfo = {
      id: data?._id,
      name: data?.name,
      status: data?.status,
      createdAt: data?.createdAt,
      name_slug: data?.name_slug,
      address: data?.address,
      description: data?.description,
      district: data?.district,
      lat: data?.lat,
      lng: data?.lng,
      images: data?.images,
      email: data?.email,
      phone: data?.phone,
      walletAddress: data?.walletAddress,
    };
    return {
      farmInfo,
    };
  }, []);

  const {
    data: dataFarmInfo,
    isSuccess: isSuccessFarmInfo,
    isLoading: isLoadingFarmInfo,
  } = useQuery({
    queryKey: ["getFarmById", farmId],
    queryFn: () => FARM.getFarmById(farmId),
    staleTime: 20 * 1000,
    select: (data) => parseDataFarmById(data?.data?.metadata),
    enabled: !!farmId,
  });

  const parseDataPlant = useCallback((data) => {
    const allplant = data.map((plant) => ({
      id: plant._id,
      farmid: plant?.farm,
      name: plant.plant_name,
      image: plant.plant_thumb,
      description: plant.plant_description,
      type: plant.plant_type,
      isActive: plant.isActive,
      timeCultivates: plant.timeCultivates,
      createdAt: plant.createdAt,
      updatedAt: plant.updatedAt,
      plant_slug: plant.plant_slug,
    }));

    const plantsCount = allplant.length;
    return { allplant, plantsCount };
  }, []);

  const {
    data: dataAllPlant,
    isSuccess: isSuccessPlant,
    isLoading: isLoadingPlant,
  } = useQuery({
    queryKey: ["getPlant", farmId],
    queryFn: () => PLANT.getPlantFromFarm(farmId),
    staleTime: 20 * 1000,
    select: (data) => parseDataPlant(data.data.metadata),
    enabled: !!farmId,
  });

  const parseDataProject = useCallback((data) => {
    const projects = data.map((item) => {
      return {
        id: item?._id,
        farmid:item?.farm?._id,
        title: item?.plant?.plant_name,
        plantId: item?.plant?._id,
        seed: item.seed ? item?.seed?.seed_name : "basic",
        startDate: item?.startDate,
        image: item?.plant?.plant_thumb,
        square: item?.square,
        status: item?.status,
        description:
          item?.description ||
          `Đây là dự án được khởi tạo vào ngày ${formatDateTime(
            item?.startDate
          )}, cho ${item?.plant?.plant_name} với hạt giống là ${
            item?.seed?.seed_name
          }`,
        output: item?.output,
        expectedEndDate: item?.expectedEndDate,
      };
    });

    const inProgressProjectsCount = projects.filter(
      (project) => project.status === "inProgress"
    ).length;

    const finishedProjectsCount = projects.filter(
      (project) => project.status === "finished"
    ).length;

    const canceledProjectsCount = projects.filter(
      (project) => project.status === "cancel"
    ).length;

    return {
      projects,
      inProgressProjectsCount,
      finishedProjectsCount,
      canceledProjectsCount,
    };
  }, []);

  const {
    data: allProject,
    isSuccess: isSuccessProject,
    isLoading: isLoadingProject,
  } = useQuery({
    queryKey: ["projects", farmId],
    queryFn: () => PROJECT.getProjects(farmId),
    staleTime: 20 * 1000,
    select: (data) => parseDataProject(data.data.metadata),
    enabled: !!farmId,
  });

  const parseDataQR = useCallback((data) => {
    const totalQRCount = data?.totalQRCount;
    const scannedQRCount = data?.scannedQRCount;
    return {
      totalQRCount,
      scannedQRCount,
    };
  }, []);

  const {
    data: statsQR,
    isSuccess: isSuccessQR,
    isLoading: isLoadingQR,
  } = useQuery({
    queryKey: ["getStatsQRByFarmId", farmId],
    queryFn: () => QR.getStatsQRByFarmId(farmId) ,
    staleTime: 20 * 1000,
    select: (data) => parseDataQR(data.data.metadata),
    enabled: !!farmId,
  });

  const parseDataDistributorByFarm = useCallback((data) => {
    const distributorsByFarm = data.map((item) => {
      return {
        id: item?._id,
        name: item?.name,
        totalAmount: item?.totalAmount,
      };
    });
    return {
      distributorsByFarm,
    };
  }, []);

  const {
    data: distributorsByFarm,
    isSuccess: isSuccessDistributorByFarm,
    isLoading: isLoadingDistributorByFarm,
  } = useQuery({
    queryKey: ["getDistributorsByFarmId", farmId],
    queryFn: () => FARM.getDistributorsByFarmId(farmId),
    staleTime: 20 * 1000,
    select: (data) => parseDataDistributorByFarm(data.data.metadata),
    enabled: !!farmId,
  });

  

  return {
    farmInfo: dataFarmInfo?.farmInfo,
    isSuccessFarmInfo,
    isLoadingFarmInfo,
    allPlant: dataAllPlant?.allplant,
    plantsCount: dataAllPlant?.plantsCount,
    isSuccessPlant,
    isLoadingPlant,
    allProject: allProject?.projects,
    inProgressProjectsCount: allProject?.inProgressProjectsCount,
    finishedProjectsCount: allProject?.finishedProjectsCount,
    canceledProjectsCount: allProject?.canceledProjectsCount,
    isSuccessProject,
    isLoadingProject,
    totalQRCount: statsQR?.totalQRCount,
    scannedQRCount: statsQR?.scannedQRCount,
    isSuccessQR,
    isLoadingQR,
    distributorsByFarm: distributorsByFarm?.distributorsByFarm,
    isSuccessDistributorByFarm,
    isLoadingDistributorByFarm,
  };
}
