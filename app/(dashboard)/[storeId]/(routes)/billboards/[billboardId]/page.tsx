import { BillboardForm } from '@/components/form/billboard-form';
import { db } from '@/lib/db';

const Page = async ({ params }: { params: { billboardId: string } }) => {
  const billboard = await db.billboard.findUnique({
    where: { id: params.billboardId },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};
export default Page;
