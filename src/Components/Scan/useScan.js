import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import PROJECT from "../../Services/projectService";
import QR from "../../Services/qrService";
export default function useScan({ projectId }) {
  const parseDataProjectInfo = useCallback((data) => {
    const projectInfo = {
      id: data?._id || "Không có dữ liệu",
      plant: data?.plant || "Không có dữ liệu",
      description: data?.description || "Không có dữ liệu",
      projectIndex: data?.projectIndex || "Không có dữ liệu",
      farm: data?.farm || "Không có dữ liệu",
    };
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
    projectInfo: dataProjectInfo?.projectInfo,
    isSuccessProjectInfo,
    isLoadingProjectInfo,
    allDistributerWithQR: dataQR?.allDistributerWithQR,
    isSuccessQR,
    isLoadingQR,
  };
}
