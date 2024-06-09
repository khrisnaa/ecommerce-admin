import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  //check if store exist or not
  //if exist go to dashboard page if not still in new store modal
  const store = await db.store.findFirst({ where: { userId } });
  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
};
export default Layout;
