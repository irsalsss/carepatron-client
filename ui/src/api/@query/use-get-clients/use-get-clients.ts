import { useQuery } from "@tanstack/react-query";
import queryClient from "@/utils/query-client-server/query-client-server";
import { CustomError } from "@/utils/fetch-json/fetch-json";
import { GetClientsOutput, getClients } from "@/api/get-clients/get-clients";

export const useGetClientsQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["useGetClientsQuery"],
    queryFn: getClients,
    enabled,
  });
};

export const prefetchGetClientsQuery = async () => {
  let data: GetClientsOutput;

  try {
    data = await getClients();
  } catch (error) {
    data = [];

    throw new CustomError((error as CustomError).message, {
      api: (error as CustomError).api,
      statusCode: (error as CustomError).statusCode,
    });
  }

  await queryClient.prefetchQuery({
    queryKey: ["useGetClientsQuery"],
    queryFn: getClients,
  });

  return data;
};
