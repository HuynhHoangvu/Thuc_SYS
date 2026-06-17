export const P = {
  crmSeeAll: "crm.see_all",
} as const;

export function hasPermission(
  user: { permissions?: string[]; role?: string } | null | undefined,
  permission: string,
): boolean {
  if (!user) return false;
  return (user.permissions ?? []).includes(permission) || (user.role ?? "") === "admin";
}
