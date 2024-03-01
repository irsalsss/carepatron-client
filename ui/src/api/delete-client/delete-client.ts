import fetchJson from "@/utils/fetch-json/fetch-json";

export const deleteClient = async (id: string): Promise<string> => {
  const response = await fetchJson<string>("/clients/" + id, {
    method: "DELETE",
  });

  return response;
};

export default deleteClient;
