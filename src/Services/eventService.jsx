import publicHttp from "./Http/publicHttp.config";

const EVENT = {
  getAllEventByFarm: async (farmId) => {
    return await publicHttp({
      method: "GET",
      url: `/event/farm/${farmId}`,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  },
};

export default EVENT;
