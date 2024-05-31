import { ColorForm } from '@/components/form/color-form';
import { db } from '@/lib/db';

const Page = async ({ params }: { params: { colorId: string } }) => {
  const color = await db.color.findUnique({
    where: { id: params.colorId },
  });
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};
export default Page;
