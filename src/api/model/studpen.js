import { coreApi } from "..";

export const getStudpen = () => {
  return coreApi.get(`/studi/browse/activity`);
};
