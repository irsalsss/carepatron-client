import createClient from "@/api/create-client/create-client";
import { useMutation } from "@tanstack/react-query";

export const createClientMutation = () => {
  return useMutation({
    mutationFn: createClient,
    mutationKey: ["createClientMutation"],
  });
};

export default createClientMutation;
