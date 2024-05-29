'use client';

import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';

import { PopoverTrigger } from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export const StoreSwitcher = ({ className, items }: StoreSwitcherProps) => {
  const { isOpen, onOpen, onClose } = useStoreModal();
  const router = useRouter();
  const params = useParams();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value == params.storeIdF,
  );

  return <div>Store Swithcer</div>;
};
