"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import db from "@/db/drizzle";
import {
  getCourseById,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

export const upsertUserProgress = async (courseId: number) => {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) throw new Error("Unauthorized.");

    const course = await getCourseById(courseId);

    if (!course) throw new Error("Course not found.");

    if (!course.units.length || !course.units[0].lessons.length)
      throw new Error("Course is empty.");

    const existingUserProgress = await getUserProgress();

    if (existingUserProgress) {
      await db.update(userProgress)
        .set({
          activeCourseId: courseId,
          userName: user.firstName || "User",
          userImageSrc: user.imageUrl || "/teacher.png",
        })
        .where(eq(userProgress.userId, userId));

      await revalidatePath("/courses");
      await revalidatePath("/learn");
      return redirect("/learn");
    }

    await db.insert(userProgress).values({
      userId,
      activeCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/teacher.png",
    });

    await revalidatePath("/courses");
    await revalidatePath("/learn");
    return redirect("/learn");
  } catch (error) {
    console.error("Error in upsertUserProgress:", error);
    throw error;
  }
};

export const reduceHearts = async (challengeId: number) => {
  try {
    const { userId } = auth();

    if (!userId) throw new Error("Unauthorized.");

    const currentUserProgress = await getUserProgress();
    const userSubscription = await getUserSubscription();

    const challenge = await db.query.challenges.findFirst({
      where: eq(challenges.id, challengeId),
    });

    if (!challenge) throw new Error("Challenge not found.");

    const lessonId = challenge.lessonId;

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
      where: and(
        eq(challengeProgress.userId, userId),
        eq(challengeProgress.challengeId, challengeId)
      ),
    });

    const isPractice = !!existingChallengeProgress;

    if (isPractice) return { error: "practice" };

    if (!currentUserProgress) throw new Error("User progress not found.");

    if (userSubscription?.isActive) return { error: "subscription" };

    if (currentUserProgress.hearts === 0) return { error: "hearts" };

    await db
      .update(userProgress)
      .set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
      })
      .where(eq(userProgress.userId, userId));

    await revalidatePath("/shop");
    await revalidatePath("/learn");
    await revalidatePath("/quests");
    await revalidatePath("/leaderboard");
    await revalidatePath(`/lesson/${lessonId}`);
  } catch (error) {
    console.error("Error in reduceHearts:", error);
    throw error;
  }
};

export const refillHearts = async () => {
  try {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) throw new Error("User progress not found.");
    if (currentUserProgress.hearts >= MAX_HEARTS)
      throw new Error("Hearts are already full.");
    if (currentUserProgress.points < POINTS_TO_REFILL)
      throw new Error("Not enough points.");

    await db
      .update(userProgress)
      .set({
        hearts: currentUserProgress.hearts + 1,
        points: currentUserProgress.points - POINTS_TO_REFILL,
      })
      .where(eq(userProgress.userId, currentUserProgress.userId));

    await revalidatePath("/shop");
    await revalidatePath("/learn");
    await revalidatePath("/quests");
    await revalidatePath("/leaderboard");
  } catch (error) {
    console.error("Error in refillHearts:", error);
    throw error;
  }
};

export const refillHeart = async () => {
  try {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) throw new Error("User progress not found.");
    if (currentUserProgress.hearts >= MAX_HEARTS)
      throw new Error("Hearts are already full.");
    

    await db
      .update(userProgress)
      .set({
        hearts: currentUserProgress.hearts + 1,
      
      })
      .where(eq(userProgress.userId, currentUserProgress.userId));

    await revalidatePath("/shop");
    await revalidatePath("/learn");
    await revalidatePath("/quests");
    await revalidatePath("/leaderboard");
  } catch (error) {
    console.error("Error in refillHearts:", error);
    throw error;
  }
};
