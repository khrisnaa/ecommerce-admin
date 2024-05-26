"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";

//provider for open and close model
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  //fix hydration error between client and server component
  //until this lifecyle has run return null
  useEffect(() => {
    setIsMounted(true);
  }, []);
  //not render modal in server side
  if (!isMounted) return null;

  //only render modal in client side
  return (
    <>
      <StoreModal />
    </>
  );
};
