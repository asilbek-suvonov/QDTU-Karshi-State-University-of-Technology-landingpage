import { apiClient } from "@/api/client";
import { GET_ENDPOINTS } from "@/api/endpoints";
import type {
  IlmiyDarajaListResponse,
  IlmiyDarajaStatsResponse,
  IlmiyDarajaStatistikaAltResponse,
} from "./ilmiyDaraja.type";

export const ilmiyDarajaService = {
  getAll: (): Promise<IlmiyDarajaListResponse> =>
    apiClient.get(GET_ENDPOINTS.ilmiyDaraja.getAll),

  getStats: (): Promise<IlmiyDarajaStatsResponse> =>
    apiClient.get(GET_ENDPOINTS.ilmiyDaraja.getStats),

  getStatsAlt: (): Promise<IlmiyDarajaStatistikaAltResponse> =>
    apiClient.get(GET_ENDPOINTS.ilmiyDaraja.getStatsAlt),
};
