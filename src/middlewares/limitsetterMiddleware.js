import rateLimit from "express-rate-limit";

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests. Please try again later.",
  },
});

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 5, 
  message: {
    error: "AI rate limit exceeded. Slow down.",
  },
});