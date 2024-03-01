"use client";

import { useGetClientsQuery } from "@/api/@query/use-get-clients/use-get-clients";
import useClientStore, {
  defaultClient,
} from "@/stores/client/use-client-store";
import useDebounce from "@/utils/use-debounce/use-debounce";
import { useVirtualizer } from "@tanstack/react-virtual";
import { lowerCase } from "lodash-es";
import { useMemo, useRef } from "react";
import ClientsModalAddEdit from "../clients-modal-add-edit/clients-modal-add-edit";
import { useShallow } from "zustand/react/shallow";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import ButtonIcon from "@/components/shared/button-icon/button-icon";
import Modal from "@/components/shared/modal/modal";
import deleteClientMutation from "@/api/@mutation/delete-client-mutation/delete-client-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/components/shared/toaster/toaster";

const ROW_HEIGHT = 72;

const ClientsTableList = () => {
  const parentRef = useRef(null);

  const queryClient = useQueryClient();

  const { data: clients = [], isLoading } = useGetClientsQuery();

  const { mutate: deleteClient } = deleteClientMutation();

  const [search, activeModal, deleteModal, setActiveModal, setDeleteModal] =
    useClientStore(
      useShallow((state) => [
        state.search,
        state.activeModal,
        state.deleteModal,
        state.setActiveModal,
        state.setDeleteModal,
      ])
    );

  const debouncedValue = useDebounce<string>(search, 500);

  const handleCloseModalAddEdit = () => {
    setActiveModal(defaultClient);
  };

  const handleDeleteContact = () => {
    deleteClient(deleteModal.id, {
      onSuccess: () => {
        queryClient.resetQueries({ queryKey: ["useGetClientsQuery"] });

        notify("Successfully deleted");
        setDeleteModal(defaultClient);
      },
      onError: () => {
        notify("Something went wrong, please try again");
      },
    });
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      lowerCase(client.firstName + " " + client.lastName).includes(
        debouncedValue
      )
    );
  }, [debouncedValue, clients]);

  const totalHeightRow = useMemo(() => {
    return ROW_HEIGHT * filteredClients.length;
  }, [filteredClients]);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: filteredClients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
  });

  return (
    <>
      <div
        ref={parentRef}
        style={{
          height: totalHeightRow > 400 ? 400 : totalHeightRow,
          overflowY: "auto",
        }}
      >
        <div
          className='flex flex-col'
          style={{
            position: "relative",
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualItem) => (
            <div
              key={virtualItem.key}
              className='grid grid-cols-12 gap-6 py-6 px-10 border-b-[2px] border-neutral-100'
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <div
                className='col-span-4 truncate cursor-pointer'
                onClick={() =>
                  setActiveModal(filteredClients[virtualItem.index])
                }
              >
                <span className='font-regular capitalize text-blue-600'>
                  {filteredClients[virtualItem.index]?.firstName}{" "}
                  {filteredClients[virtualItem.index]?.lastName}
                </span>
              </div>

              <div className='col-span-3 truncate'>
                <span className='font-regular'>
                  {filteredClients[virtualItem.index]?.phoneNumber}
                </span>
              </div>

              <div className='col-span-4 truncate'>
                <div>{filteredClients[virtualItem.index]?.email}</div>
              </div>

              <div className='col-span-1 flex items-center gap-2'>
                <ButtonIcon
                  className='hidden md:block'
                  onClick={() =>
                    setActiveModal(filteredClients[virtualItem.index])
                  }
                  label='Edit'
                >
                  <Pencil1Icon className='w-5 h-5' />
                </ButtonIcon>

                <ButtonIcon
                  onClick={() =>
                    setDeleteModal(filteredClients[virtualItem.index])
                  }
                  label='Delete'
                >
                  <TrashIcon className='w-5 h-5' />
                </ButtonIcon>
              </div>
            </div>
          ))}
        </div>
      </div>

      {search.length > 0 && filteredClients.length === 0 ? (
        <div className='flex justify-center items-center p-6'>
          <span>The result you've searched is empty</span>
        </div>
      ) : null}

      {!isLoading && search.length === 0 && filteredClients.length === 0 ? (
        <div className='flex justify-center items-center p-6'>
          <span>The data is empty</span>
        </div>
      ) : null}

      {activeModal.id.length > 0 ? (
        <ClientsModalAddEdit
          onClose={handleCloseModalAddEdit}
          isAddMode={activeModal.id === "addModal"}
          detailClient={activeModal}
        />
      ) : null}

      {deleteModal.id.length > 0 ? (
        <Modal
          onClose={() => setDeleteModal(defaultClient)}
          title='Delete Client'
          content={`Are you sure want to delete ${deleteModal.firstName} ${deleteModal.lastName}?`}
          onSubmit={handleDeleteContact}
        />
      ) : null}
    </>
  );
};

export default ClientsTableList;
