import ClientInterface from "@/interfaces/client/client.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

export interface CreateClientOutput extends ResponseInterface {
  message: string;
  statusCode: number;
  data: ClientInterface;
}

export const createClient = async (
  data: ClientInterface
): Promise<CreateClientOutput> => {

  const response = await fetchJson<ResponseInterface>("/clients", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return mapToCamelCase(response);
};

export default createClient;
