import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import FARM from "../../Services/farmService";

export default function useListFarm() {
  const parseDataAllFarm = useCallback((data) => {

    const allfarm = data.map((farm) => ({
      id: farm._id,
      name: farm.name || "Chưa cập nhật",
      status: farm.status || "Chưa cập nhật",
      district: farm.district || "Chưa cập nhật",
      address: farm.address || "Chưa cập nhật",
      email: farm.email || "Chưa cập nhật",
      walletAddress: farm.walletAddress || "Chưa cập nhật",
      description: farm.description || "Chưa cập nhật",
      createdAt: farm.createdAt || "Chưa cập nhật",
    }));  return { allfarm };
  }, []);

  
  const {
    data: dataAllFarm,
    isSuccess: isSuccessAllFarm,
    isLoading: isLoadingAllFarm,
  } = useQuery({
    queryKey: ["getAllFarm"],
    queryFn: () => FARM.getAllFarm(),
    staleTime: 20 * 1000,
    select: (data) => parseDataAllFarm(data.data.metadata),
  });


  return {
    allFarm: dataAllFarm?.allfarm,
    isSuccessAllFarm,
    isLoadingAllFarm,
  };
}
