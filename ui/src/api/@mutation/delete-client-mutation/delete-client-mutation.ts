import deleteClient from "@/api/delete-client/delete-client";
import { useMutation } from "@tanstack/react-query";

export const deleteClientMutation = () => {
  return useMutation({
    mutationFn: deleteClient,
    mutationKey: ["deleteClientMutation"],
  });
};

export default deleteClientMutation;
