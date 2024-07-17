"use client";
/* eslint-disable import/order */

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { upsertUserProgress } from "@/actions/user-progress";
import { courses, userProgress } from "@/db/schema";

import { Card } from "./card";

type ListProps = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

export const List = ({ courses, activeCourseId }: ListProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return; // Prevent further clicks if already in transition
    if (id === activeCourseId) return router.push("/learn"); // Navigate if the course is already active

    startTransition(() => {
      // Ensure the `upsertUserProgress` function is correctly implemented
      upsertUserProgress(id)
        .then(() => {
          // Maybe navigate to the learn page or show success toast here
          toast.success("Progress saved successfully");
          router.push("/learn"); // Or trigger any success action
        })
        .catch(() => toast.error("Something went wrong."));
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          isActive={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
