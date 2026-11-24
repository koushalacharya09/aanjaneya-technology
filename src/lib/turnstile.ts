export async function verifyTurnstile(token: string, ip?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Allow local/dev without Turnstile configured
    if (process.env.NODE_ENV === "development") {
      return { success: true as const, bypassed: true };
    }
    return { success: false as const, error: "Turnstile is not configured" };
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip) body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
    },
  );

  const data = (await response.json()) as {
    success: boolean;
    "error-codes"?: string[];
  };

  if (!data.success) {
    return {
      success: false as const,
      error: data["error-codes"]?.join(", ") ?? "Turnstile verification failed",
    };
  }

  return { success: true as const, bypassed: false };
}
