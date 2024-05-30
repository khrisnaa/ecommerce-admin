import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { SettingsForm } from '@/components/form/settings-form';
import { currentStore } from '@/lib/stores';

const Page = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await currentStore(params.storeId, userId);

  if (!store) {
    redirect('/');
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};
export default Page;
