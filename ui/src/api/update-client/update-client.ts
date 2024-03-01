import ClientInterface from "@/interfaces/client/client.interface";
import ResponseInterface from "@/interfaces/shared/response.interface";
import fetchJson from "@/utils/fetch-json/fetch-json";
import mapToCamelCase from "@/utils/map-to-camel-case/map-to-camel-case";

export interface UpdateClientOutput extends ResponseInterface {
  message: string;
  statusCode: number;
  data: ClientInterface;
}

export const updateClient = async (
  data: ClientInterface
): Promise<UpdateClientOutput> => {
  const response = await fetchJson<ResponseInterface>("/clients/" + data.id, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  return mapToCamelCase(response);
};

export default updateClient;
