import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Mutation to save the audio file to the database
export const saveAudioFile = mutation({
  args: { userId: v.string(), fileName: v.string(), audioData: v.bytes() },
  handler: async (ctx, { userId, fileName, audioData }) => {
    const newAudioFileId = await ctx.db.insert("audioFiles", {
      userId,
      fileName,
      audioData,
      createdAt: Date.now(),
    });
    return newAudioFileId;
  },
});
