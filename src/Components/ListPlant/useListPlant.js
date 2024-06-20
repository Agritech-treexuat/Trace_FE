import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import PLANT from "../../Services/plantService";
export default function useListPlant() {
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

    const allActivePlant = allplant.filter((plant) => plant.isActive);

    const plantsCount = allActivePlant.length;
    return { allActivePlant, plantsCount };
  }, []);

  const {
    data: dataAllPlant,
    isSuccess: isSuccessPlant,
    isLoading: isLoadingPlant,
  } = useQuery({
    queryKey: ["getAllPlant"],
    queryFn: () => PLANT.getAllPlant(),
    staleTime: 20 * 1000,
    select: (data) => parseDataPlant(data.data.metadata),
  });
  

  return {
    allPlant: dataAllPlant?.allActivePlant,
    plantsCount: dataAllPlant?.plantsCount,
    isSuccessPlant,
    isLoadingPlant,
  };
}
