// Centralized API base URL for all API calls
export const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://api.wtwr.bot.nu"
        : "http://34.72.105.93:3001";
