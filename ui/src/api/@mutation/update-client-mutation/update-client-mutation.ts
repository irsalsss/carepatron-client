import updateClient from "@/api/update-client/update-client";
import { useMutation } from "@tanstack/react-query";

export const updateClientMutation = () => {
  return useMutation({
    mutationFn: updateClient,
    mutationKey: ["updateClientMutation"],
  });
};

export default updateClientMutation;
