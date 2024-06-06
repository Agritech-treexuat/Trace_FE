import publicHttp from "./Http/publicHttp.config";

const FARM = {
  getAllFarm: async () => {
    return await publicHttp({
      method: "GET",
      url: `/farm`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getFarmById: async (farmId) => {
    return await publicHttp({
      method: "GET",
      url: `/farm/${farmId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
  getDistributorsByFarmId: async (farmId) => {
    return await publicHttp({
      method: "GET",
      url: `/farm/distributors/${farmId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
};

export default FARM;
