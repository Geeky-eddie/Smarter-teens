"use client";
/* eslint-disable import/order */

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";

import { refillHearts } from "@/actions/user-progress";
import { refillHeart } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import NativeAd from "@/components/Nativead";

type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();
  const [isAdClicked, setIsAdClicked] = useState(false);

  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch(() => toast.error("Something went wrong."));
    });
  };

  const onUpgrade = () => {
    toast.loading("Redirecting to checkout...");
    startTransition(() => {
      createStripeUrl()
        .then((response) => {
          if (response.data) window.location.href = response.data;
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  const handleAdClick = () => {
    setIsAdClicked(true);
    setTimeout(() => {
      refillHeart().catch(() => toast.error("Something went wrong."));
      setIsAdClicked(false);
    }, 5000);
    window.open("https://discouragewearinesstourist.com/exxed59h?key=efafb3b2b66614974e97bcaeaa7503e7", "_blank");
  };

  return (
    <ul className="w-full">
      <NativeAd />
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Image src="/heart.svg" alt="Heart" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Refill hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
          aria-disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
        >
          {hearts === MAX_HEARTS ? (
            "full"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" alt="Points" height={20} width={20} />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending} aria-disabled={pending}>
          {hasActiveSubscription ? "settings" : "upgrade"}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/heart.svg" alt="Watch Ad for Hearts" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Watch an ad for a free heart
          </p>
        </div>
        <Button onClick={handleAdClick} disabled={isAdClicked} aria-disabled={isAdClicked}>
          {isAdClicked ? "Please wait..." : "Watch Ad"}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/heart.svg" alt="Buy 5 Hearts" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Buy 5 hearts for 1000 Naira
          </p>
        </div>
        <Button onClick={() => {}} disabled={pending} aria-disabled={pending}>
          Buy Now
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/jambb.jpeg" alt="JAMB" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Buy JAMB past questions
          </p>
        </div>
        <Button onClick={() => {}} disabled={pending} aria-disabled={pending}>
          Buy Now
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/waec.png" alt="WAEC" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Buy WAEC past questions
          </p>
        </div>
        <Button onClick={() => {}} disabled={pending} aria-disabled={pending}>
          Buy Now
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/neco.jpeg" alt="NECO" height={60} width={60} />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Buy NECO past questions
          </p>
        </div>
        <Button onClick={() => {}} disabled={pending} aria-disabled={pending}>
          Buy Now
        </Button>
      </div>
    </ul>
  );
};
