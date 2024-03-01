"use client";

const ClientsTableHeader = () => {
  return (
    <div className='grid grid-cols-12 gap-6 py-6 px-10 border-b-[2px] border-neutral-100'>
      <div className='col-span-4'>
        <span className='font-bold'>Name</span>
      </div>

      <div className='col-span-3'>
        <span className='font-bold'>Phone</span>
      </div>

      <div className='col-span-4'>
        <span className='font-bold'>Email</span>
      </div>

      <div className='col-span-1' />
    </div>
  );
};

export default ClientsTableHeader;
