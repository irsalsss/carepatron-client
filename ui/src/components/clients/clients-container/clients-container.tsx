"use client";

import ClientsTableHeader from "@/components/clients/clients-table-header/clients-table-header";
import ClientsTableList from "@/components/clients/clients-table-list/clients-table-list";
import ClientsHeader from "../clients-header/clients-header";

const ClientsContainer = () => {
  return (
    <main className='mt-10 w-full flex justify-center'>
      <div className='flex flex-col md:w-3/4 w-[90%]'>
        <ClientsHeader />

        <div className='mt-4 bg-white rounded-[16px]'>
          <ClientsTableHeader />

          <ClientsTableList />
        </div>
      </div>
    </main>
  );
};

export default ClientsContainer;
