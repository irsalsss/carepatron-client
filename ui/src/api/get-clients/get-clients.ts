import ClientInterface from "@/interfaces/client/client.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

interface GetClientsData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
}

export type GetClientsOutput = Array<ClientInterface>;

interface GetClientsResponse extends ResponseInterface {
  data: Array<GetClientsData>;
}

export const getClients = async (
  options?: RequestInit
): Promise<GetClientsOutput> => {
  const response = await fetchJson<GetClientsResponse>("/clients", options);

  return mapToCamelCase(response);
};
