import publicHttp from "./Http/publicHttp.config";

const PROJECT = {
  getProjects: async (farmId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/farm/${farmId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Lấy ảnh
  getOutput: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/output`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Lấy thông tin
  getProjectByProjectId: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Lấy quá trình canh tác, timeline
  getProcess: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/process`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Lấy quy trình canh tác
  getPlantFarmingFromProject: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/plantFarming`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Chi tiết
  getExpect: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/expect`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Ảnh chứng nhận của nông trại
  getCertificateImages: async ({ projectId }) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/certificateImages`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getCameraIndexAndStartDateAndEndDate: async (projectIndex) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectIndex}/cameraIndex`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  // Lấy quá trình cùng video
  getProcessWithObjectDetections: async (projectIndex) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectIndex}/processesWithObjectDetections`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  // Lấy thông tin bị xóa trong project
  getInfoDeleteProcess: async (projectIndex) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectIndex}/deletedItem`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getConnectionLossByProject: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/connectionLoss`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getImageByProject: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/image`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getWeatherByProject: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/weather`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getCameraByProject: async (projectId) => {
    return await publicHttp({
      method: "GET",
      url: `/project/${projectId}/camera`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default PROJECT;
