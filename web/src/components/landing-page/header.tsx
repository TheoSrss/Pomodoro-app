"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Logo from "../logo";
import { useTranslations } from "next-intl";

interface NavProps {
  items?: {
    title: string;
    href: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

function SignInSignUpButtons() {
  const t = useTranslations('General');

  return (
    <>
      <Link
        href="/login"
        className={buttonVariants({ variant: "default" })}
      >
        {t('login')}  </Link>
    </>
  );
}

function AuthButtonsInner() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <Link
        href="/dashboard"
        className={buttonVariants({ variant: "default" })}
      >
        Dashboard
      </Link>
    );
  } else {
    return <SignInSignUpButtons />;
  }
}

function AuthButtons() {
  return (
    <React.Suspense fallback={<SignInSignUpButtons />}>
      <AuthButtonsInner />
    </React.Suspense>
  );
}

function MobileItems(props: NavProps) {
  return (
    <div className="bg-red- fixed inset-0 top-16 z-40 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-10 grid gap-6 rounded-md bg-beige p-4 text-popover-foreground shadow-md ">
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {props.items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              {item.title}
            </Link>
          ))}

          <div className="flex flex-col gap-2 mt-4">
            <AuthButtons />
          </div>
        </nav>
      </div>
    </div>
  );
}

function DesktopItems(props: NavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav className="hidden gap-6 md:flex">
      {props.items?.map((item, index) => (
        <Link
          key={index}
          href={item.disabled ? "#" : item.href}
          className={cn(
            "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
            item.href.startsWith(`/${segment}`)
              ? "text-foreground"
              : "text-foreground/60",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer" : undefined}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function LandingPageHeader(props: NavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <header className="fixed w-full z-50 bg-background/80 px-6 md:px-10 backdrop-blur ">
      <div className="flex h-18 items-center justify-between py-4">
        <div className="flex items-center gap-4 md:gap-10">
          {props.items?.length ? <DesktopItems items={props.items} /> : null}
          <Button
            className="space-x-2 md:hidden"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
          {showMobileMenu && props.items && <MobileItems items={props.items} />}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-4xl font-bold">
          <Logo />
        </div>
        <div className="flex gap-4 items-center">
          <nav className="gap-4 items-center hidden md:flex">
            <AuthButtons />
          </nav>
        </div>
      </div>
    </header>
  );
}
