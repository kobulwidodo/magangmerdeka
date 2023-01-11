import { coreApi } from "..";

export const getMagang = () => {
  return coreApi.get(`/magang/browse/position`);
};
