"use client";

import { useGetClientsQuery } from "@/api/@query/use-get-clients/use-get-clients";
import ClientsTableHeader from "@/components/clients/clients-table-header/clients-table-header";
import ClientsTableList from "@/components/clients/clients-table-list/clients-table-list";
import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import ClientsModalAddEdit from "../clients-modal-add-edit/clients-modal-add-edit";
import ClientInterface from "@/interfaces/client/client.interface";

const defaultClient = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const ClientsContainer = () => {
  const [openModalAddEdit, setOpenModalAddEdit] = useState("");
  const [detailClient, setDetailClient] =
    useState<ClientInterface>(defaultClient);

  const { data: clients = [] } = useGetClientsQuery();

  const handleOpenModalAddEdit = (id: string) => {
    setOpenModalAddEdit(id);
  };

  const handleCloseModalAddedit = () => {
    setOpenModalAddEdit("");
    setDetailClient(defaultClient);
  };

  const handleClickFullName = (client: ClientInterface) => {
    setOpenModalAddEdit(client.id);
    setDetailClient(client);
  };

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

          <ClientsTableList
            clients={clients}
            onClickFullName={handleClickFullName}
          />
        </div>
      </div>

      {openModalAddEdit.length > 0 ? (
        <ClientsModalAddEdit
          onClose={handleCloseModalAddedit}
          isAddMode={openModalAddEdit === "addModal"}
          detailClient={detailClient}
        />
      ) : null}
    </main>
  );
};

export default ClientsContainer;
