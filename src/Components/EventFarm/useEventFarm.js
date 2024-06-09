import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import FARM from "../../Services/farmService";
import EVENT from "../../Services/eventService";

export default function useEventFarm({farmId}) {
  const parseDataAllEventByFarm = useCallback((data) => {

    const allEventByFarm = data.map((event) => ({
      id: event._id,
      walletAddress: event.walletAddress || "Không có dữ liệu",
      fee: event.fee || "Không có dữ liệu",
      timestamp: event.timestamp || "Không có dữ liệu",
      event: event.event || "Không có dữ liệu",
      tx: event.tx || "Không có dữ liệu",
    }));  return { allEventByFarm };
  }, []);

  
  const {
    data: dataAllEventByFarm,
    isSuccess: isSuccessAllEventByFarm,
    isLoading: isLoadingAllEventByFarm,
  } = useQuery({
    queryKey: ["getAllEventByFarm"],
    queryFn: () => EVENT.getAllEventByFarm(farmId),
    staleTime: 20 * 1000,
    select: (data) => parseDataAllEventByFarm(data.data.metadata),
    enabled: !!farmId
  });


  return {
    allEventByFarm: dataAllEventByFarm?.allEventByFarm,
    isSuccessAllEventByFarm,
    isLoadingAllEventByFarm,
  };
}
