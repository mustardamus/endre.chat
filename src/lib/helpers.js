import db from "$lib/db.js";
import crypto from "node:crypto";

export async function checkRatelimit(ipHash, windowSeconds, maxTokens) {
  const nowMinusOneMinute = new Date(Date.now() - windowSeconds * 1000);
  const {
    _sum: { tokensUsed },
  } = await db.message.aggregate({
    where: {
      AND: {
        ipHash: {
          equals: ipHash,
        },
        createdAt: {
          gte: nowMinusOneMinute,
        },
      },
    },
    _sum: {
      tokensUsed: true,
    },
  });

  return tokensUsed >= maxTokens;
}

export function hashIpAddress(ipAddress) {
  const salt = "fc085de29cbd3d557f9fb27323a04068";
  return crypto
    .createHash("md5")
    .update(ipAddress + salt)
    .digest("hex");
}

export function getRandomColorHex() {
  return "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
}
