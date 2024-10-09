export const isAdminUser = (user: { role: string } | null) =>
  user?.role === "admin";
