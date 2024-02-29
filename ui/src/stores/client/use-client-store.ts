import ClientInterface from '@/interfaces/client/client.interface';
import { create } from 'zustand'

export const defaultClient = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

interface UseClientStoreState {
  search: string;
  setSearch: (value: string) => void;

  activeModal: ClientInterface;
  setActiveModal: (id: ClientInterface) => void;
}

const useClientStore = create<UseClientStoreState>()((set) => ({
  search: '',
  setSearch: (value) => set(({ search: value })),

  activeModal: defaultClient,
  setActiveModal: (value) => set(({ activeModal: value })),
}))

export default useClientStore;