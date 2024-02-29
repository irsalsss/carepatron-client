"use client";

import ClientInterface from "@/interfaces/client/client.interface";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface ClientsTableListProps {
  clients: Array<ClientInterface>;
  onClickFullName: (client: ClientInterface) => void;
}

const ClientsTableList = ({
  clients,
  onClickFullName,
}: ClientsTableListProps) => {
  const parentRef = useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: clients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
  });

  return (
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
              onClick={() => onClickFullName(clients[virtualItem.index])}
            >
              <span className='font-regular capitalize text-blue-600'>
                {clients[virtualItem.index].firstName}{" "}
                {clients[virtualItem.index].lastName}
              </span>
            </div>

            <div className='col-span-4 truncate'>
              <span className='font-regular'>
                {clients[virtualItem.index].phoneNumber}
              </span>
            </div>

            <div className='col-span-4 truncate'>
              <div>{clients[virtualItem.index].email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsTableList;
