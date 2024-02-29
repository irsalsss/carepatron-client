"use client";

import { useGetClientsQuery } from "@/api/@query/use-get-clients/use-get-clients";
import ClientsTableHeader from "@/components/clients/clients-table-header/clients-table-header";
import ClientsTableList from "@/components/clients/clients-table-list/clients-table-list";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ClientsModalAddEdit from "../clients-modal-add-edit/clients-modal-add-edit";

const ClientsContainer = () => {
  const [openModalAddEdit, setOpenModalAddEdit] = useState("");

  const { data: clients = [] } = useGetClientsQuery();

  const handleOpenModalAddEdit = (id: string) => {
    setOpenModalAddEdit(id);
  };

  const handleSubmitModalAddEdit = () => {};

  return (
    <main className='mt-10 w-full flex justify-center'>
      <div className='flex flex-col md:w-3/4 w-[90%]'>
        <h2 className='font-bold text-[24px]'>Client</h2>

        <div className='mt-6 flex items-center justify-between gap-4'>
          <Input
            className='md:w-[320px]'
            icon={<MagnifyingGlassIcon className='h-5 w-5 text-neutral-N600' />}
            placeholder='Search clients...'
          />

          <Button
            label='Create new client'
            className='shrink-0'
            onClick={() => handleOpenModalAddEdit("addModal")}
          />
        </div>

        <div className='mt-4 bg-white rounded-[16px]'>
          <ClientsTableHeader />
          <ClientsTableList clients={clients} />
        </div>
      </div>

      {openModalAddEdit === "addModal" ? (
        <ClientsModalAddEdit
          onClose={() => handleOpenModalAddEdit("")}
          onSubmit={handleSubmitModalAddEdit}
        />
      ) : null}
    </main>
  );
};

export default ClientsContainer;
