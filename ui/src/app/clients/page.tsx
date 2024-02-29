import { prefetchGetClientsQuery } from "@/api/@query/use-get-clients/use-get-clients";
import ClientsContainer from "@/components/clients/clients-container/clients-container";
import queryClient from "@/utils/query-client-server/query-client-server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

const ClientsPage = () => {
  prefetchGetClientsQuery();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientsContainer />
    </HydrationBoundary>
  );
};

export default ClientsPage;
