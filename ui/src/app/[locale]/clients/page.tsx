import { prefetchGetClientsQuery } from "@/api/@query/use-get-clients/use-get-clients";
import ClientsContainer from "@/components/clients/clients-container/clients-container";
import queryClient from "@/utils/query-client-server/query-client-server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { pick } from "lodash-es";
import { NextIntlClientProvider, useMessages } from "next-intl";

const ClientsPage = () => {
  prefetchGetClientsQuery();

  const messages = useMessages();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NextIntlClientProvider messages={pick(messages, 'Clients')} >
        <ClientsContainer />
      </NextIntlClientProvider>
    </HydrationBoundary>
  );
};

export default ClientsPage;
