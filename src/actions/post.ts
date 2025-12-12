"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: number) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath("/posts");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete post:", error);
    return {
      success: false,
      message: "Database error: Failed to delete post.",
    };
  }
}
