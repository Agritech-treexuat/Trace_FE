import publicHttp from "./Http/publicHttp.config";

const PLANT = {
  getAllPlant: async () => {
    return await publicHttp({
      method: "GET",
      url: `/plant/recommend`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getPlantByPlantId: async (plantId) => {
    return await publicHttp({
      method: "GET",
      url: `/plant/${plantId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getPlantFromFarm: async (farmId) => {
    return await publicHttp({
      method: "GET",
      url: `/plant/farm/${farmId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getDefautlPlant: async (plantId) => {
    return await publicHttp({
      method: "GET",
      url: `/plant/default/${plantId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },

  getPlantWithSeed: async () => {
    return await publicHttp({
      method: "GET",
      url: `/plants-and-seeds`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default PLANT;
