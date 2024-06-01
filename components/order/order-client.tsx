'use client';

import { OrderColumn, columns } from '@/components/order/columns';
import { Heading } from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

export const OrderClient = ({ data }: { data: OrderColumn[] }) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};
