import { SizeForm } from '@/components/form/size-form';
import { db } from '@/lib/db';

const Page = async ({ params }: { params: { sizeId: string } }) => {
  const size = await db.size.findUnique({
    where: { id: params.sizeId },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};
export default Page;
