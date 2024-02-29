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

const ClientsTableList = () => {
  const parentRef = useRef(null);

  const { data: clients = [] } = useGetClientsQuery();

  const [search, activeModal, setActiveModal] = useClientStore(
    useShallow((state) => [
      state.search,
      state.activeModal,
      state.setActiveModal,
    ])
  );

  const debouncedValue = useDebounce<string>(search, 500);

  const handleCloseModalAddEdit = () => {
    setActiveModal(defaultClient);
  };

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: clients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
  });

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      lowerCase(client.firstName + " " + client.lastName).includes(
        debouncedValue
      )
    );
  }, [debouncedValue, clients]);

  return (
    <>
      <div ref={parentRef} style={{ height: 400, overflowY: "auto" }}>
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

              <div className='col-span-4 truncate'>
                <span className='font-regular'>
                  {filteredClients[virtualItem.index]?.phoneNumber}
                </span>
              </div>

              <div className='col-span-4 truncate'>
                <div>{filteredClients[virtualItem.index]?.email}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal.id.length > 0 ? (
        <ClientsModalAddEdit
          onClose={handleCloseModalAddEdit}
          isAddMode={activeModal.id === "addModal"}
          detailClient={activeModal}
        />
      ) : null}
    </>
  );
};

export default ClientsTableList;
