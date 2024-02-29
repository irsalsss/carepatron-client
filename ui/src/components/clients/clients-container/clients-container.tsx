"use client";

import { useGetClientsQuery } from "@/api/@query/use-get-clients/use-get-clients";
import ClientsTableHeader from "@/components/clients/clients-table-header/clients-table-header";
import ClientsTableList from "@/components/clients/clients-table-list/clients-table-list";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const ClientsContainer = () => {
  const { data: clients = [] } = useGetClientsQuery();

  return (
    <main className='mt-10 w-full flex justify-center'>
      <div className='flex flex-col w-3/4'>
        <h2 className='font-bold text-[24px]'>Client</h2>

        <div className='mt-6 flex items-center justify-between'>
          <Input
            className='w-[320px]'
            icon={<MagnifyingGlassIcon className='h-5 w-5 text-neutral-N600' />}
            placeholder='Search clients...'
          />

          <Button label='Create new client' />
        </div>

        <div className='mt-4 bg-white rounded-[16px]'>
          <ClientsTableHeader />
          <ClientsTableList clients={clients} />
        </div>
      </div>
    </main>
  );
};

export default ClientsContainer;
