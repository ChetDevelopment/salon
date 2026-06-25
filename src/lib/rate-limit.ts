import { auth } from "./auth"

const requestCounts = new Map<string, { count: number; resetAt: number }>()

export async function rateLimit(
  maxRequests: number = 10,
  windowMs: number = 60000
): Promise<{ success: boolean; remaining: number }> {
  const session = await auth()
  const identifier = session?.user?.email || "anonymous"

  const now = Date.now()
  const record = requestCounts.get(identifier)

  if (!record || now > record.resetAt) {
    requestCounts.set(identifier, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { success: false, remaining: 0 }
  }

  record.count++
  return { success: true, remaining: maxRequests - record.count }
}
