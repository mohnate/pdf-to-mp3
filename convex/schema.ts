import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  audioFiles: defineTable({
    userId: v.string(),
    fileName: v.string(),
    audioData: v.bytes(),
    createdAt: v.number(),
  }),
});
