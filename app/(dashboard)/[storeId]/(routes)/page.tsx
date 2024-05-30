import { currentStore } from '@/lib/stores';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { storeId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    redirect('/sign-in');
  }

  const store = await currentStore(params.storeId, userId);
  return <h1>{store?.name}</h1>;
};
export default Page;
