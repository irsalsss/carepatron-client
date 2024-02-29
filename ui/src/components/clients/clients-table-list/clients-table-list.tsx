"use client";

import ClientInterface from "@/interfaces/client/client.interface";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

interface ClientsTableListProps {
  clients: Array<ClientInterface>;
}

const ClientsTableList = ({ clients }: ClientsTableListProps) => {
  const parentRef = useRef(null);

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: clients.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72, // The estimateSize property provides an estimate of the row size in pixels. In this example, it is set to () => 35.
    overscan: 5,
  });

  return (
    <div ref={parentRef} className='overflow-y-auto max-h-[200px]'>
      <div
        className='relative flex flex-col'
        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
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
            <div className='col-span-4'>
              <span className='font-regular'>
                {clients[virtualItem.index].firstName}{" "}
                {clients[virtualItem.index].lastName}
              </span>
            </div>

            <div className='col-span-4'>
              <span className='font-regular'>
                {clients[virtualItem.index].phoneNumber}
              </span>
            </div>

            <div className='col-span-4'>
              <div>{clients[virtualItem.index].email}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientsTableList;
