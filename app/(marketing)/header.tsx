import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  
} from "@clerk/nextjs";
import {
  auth,
} from "@clerk/nextjs/server";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { links } from "@/config";

export const Header = () => {
  const { userId } = auth();

  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
        <Link href="/" className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/climatelogo.jpg" alt="Logo" height={40} width={40} />

          <h1 className="text-2xl font-extrabold tracking-wide text-[#2196F3]">
          Climate Action Club
          </h1>
        </Link>

        <div className="flex gap-x-3">
          <ClerkLoading>
            <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/courses"
                
              >
                <Button size="lg" variant="ghost">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <Link
              href={links.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className={userId ? "pt-1.5" : "pt-3"}
            >
              <Image
                src="/github.svg"
                alt="Source Code"
                height={20}
                width={20}
              />
            </Link>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};
