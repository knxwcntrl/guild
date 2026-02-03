import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// To use: Copy to ~/guild/convex/ after running `npx convex dev`

export default defineSchema({
  // Service listings
  services: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    category: v.string(),
    priceSevenTokens: v.number(),
    priceUsdEquivalent: v.number(),
    deliveryTimeHours: v.number(),
    agentId: v.id("agents"),
    deliverables: v.array(v.string()),
    requirements: v.optional(v.string()),
    examples: v.optional(v.array(v.string())),
    isActive: v.boolean(),
    isFeatured: v.boolean(),
    ordersCompleted: v.number(),
    averageRating: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_agentId", ["agentId"])
    .index("by_isActive", ["isActive"])
    .index("by_isFeatured", ["isFeatured"]),

  // Agent providers
  agents: defineTable({
    name: v.string(),
    handle: v.string(),
    avatar: v.optional(v.string()),
    bio: v.string(),
    baseWalletAddress: v.string(),
    solanaWalletAddress: v.optional(v.string()),
    sevenStaked: v.number(),
    stakeTier: v.union(
      v.literal("basic"),
      v.literal("verified"),
      v.literal("premium"),
      v.literal("partner")
    ),
    servicesCount: v.number(),
    ordersCompleted: v.number(),
    totalEarnedSeven: v.number(),
    averageRating: v.optional(v.number()),
    isVerified: v.boolean(),
    isActive: v.boolean(),
    apiKeyHash: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_handle", ["handle"])
    .index("by_baseWalletAddress", ["baseWalletAddress"])
    .index("by_stakeTier", ["stakeTier"]),

  // Service orders
  orders: defineTable({
    orderNumber: v.string(),
    serviceId: v.id("services"),
    agentId: v.id("agents"),
    buyerType: v.union(v.literal("human"), v.literal("agent")),
    buyerWalletAddress: v.string(),
    buyerEmail: v.optional(v.string()),
    buyerAgentId: v.optional(v.id("agents")),
    requirements: v.optional(v.string()),
    customization: v.optional(v.string()),
    priceSevenTokens: v.number(),
    platformFeeSeven: v.number(),
    netToAgentSeven: v.number(),
    paymentStatus: v.union(
      v.literal("pending"),
      v.literal("paid"),
      v.literal("refunded")
    ),
    paymentTxHash: v.optional(v.string()),
    paymentVerifiedAt: v.optional(v.number()),
    status: v.union(
      v.literal("pending_payment"),
      v.literal("in_progress"),
      v.literal("delivered"),
      v.literal("revision_requested"),
      v.literal("completed"),
      v.literal("cancelled"),
      v.literal("disputed")
    ),
    deliveryUrl: v.optional(v.string()),
    deliveryNotes: v.optional(v.string()),
    deliveredAt: v.optional(v.number()),
    rating: v.optional(v.number()),
    review: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_orderNumber", ["orderNumber"])
    .index("by_serviceId", ["serviceId"])
    .index("by_agentId", ["agentId"])
    .index("by_buyerWalletAddress", ["buyerWalletAddress"])
    .index("by_status", ["status"]),

  // Categories
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    icon: v.string(),
    servicesCount: v.number(),
    isActive: v.boolean(),
  })
    .index("by_slug", ["slug"]),
});
