import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import PLANT_FARMING from "../../Services/plantFarmService";
export default function usePlants({ plantId }) {
  const parseDataPlantFarmById = useCallback((data) => {
    const plantFarm = data.map((plant) => ({
      id: plant._id,
      plant: plant?.plant,
      seed: plant.seed,
      cultivationActivities: plant?.cultivationActivities,
      plantingActivity: plant?.plantingActivity,
      farmingTime: plant?.farmingTime,
      harvestTime: plant?.harvestTime,
      timeCultivates: plant?.timeCultivates,
      fertilizationActivities: plant?.fertilizationActivities,
      pestAndDiseaseControlActivities: plant?.pestAndDiseaseControlActivities,
      historyPlantFarmingEdit: plant?.historyPlantFarmingEdit,
      createdAtTime: plant?.createdAtTime,
    }));
    return { plantFarm };
  }, []);

  const {
    data: dataPlantFarm,
    isSuccess: isSuccessPlantFarmById,
    isLoading: isLoadingPlantFarmById,
  } = useQuery({
    queryKey: ["getListPlantFarmingFromPlant", plantId],
    queryFn: () => PLANT_FARMING.getListPlantFarmingFromPlant(plantId),
    staleTime: 20 * 1000,
    select: (data) => parseDataPlantFarmById(data.data.metadata),
    enabled: !!plantId,
  });

  return {
    dataPlantFarm: dataPlantFarm?.plantFarm,
    isSuccessPlantFarmById,
    isLoadingPlantFarmById,
  };
}
