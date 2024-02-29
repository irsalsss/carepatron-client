"use client";

import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import useClientStore, {
  defaultClient,
} from "@/stores/client/use-client-store";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useShallow } from "zustand/react/shallow";

const ClientsHeader = () => {
  const [setSearch, setActiveModal] = useClientStore(
    useShallow((state) => [state.setSearch, state.setActiveModal])
  );

  return (
    <>
      <h2 className='font-bold text-[24px]'>Client</h2>

      <div className='mt-6 flex items-center justify-between gap-4'>
        <Input
          className='md:w-[320px]'
          icon={<MagnifyingGlassIcon className='h-5 w-5 text-neutral-N600' />}
          placeholder='Search clients...'
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          label='Create new client'
          className='shrink-0'
          onClick={() => setActiveModal({ ...defaultClient, id: "addModal" })}
        />
      </div>
    </>
  );
};

export default ClientsHeader;
