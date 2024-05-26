import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="h-full flex-col flex items-center justify-center">
      <h1>Hello World</h1>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </div>
  );
};
export default Page;
