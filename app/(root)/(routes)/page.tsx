'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

const Page = () => {
  // const storeModal = useStoreModal(S);
  //if want to use in useEffect use this instead
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return <div className="flex flex-col p-4 ">Root Page</div>;
};
export default Page;
