import { UserRole } from '@/types/auth.types';

const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  editor: 2,
  viewer: 1,
};

export function hasRole(userRole: UserRole, requiredRole: UserRole): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function hasAnyRole(userRole: UserRole, roles: UserRole[]): boolean {
  return roles.some((role) => hasRole(userRole, role));
}

export function canAccess(userRole: UserRole | undefined, allowedRoles?: UserRole[]): boolean {
  if (!allowedRoles || allowedRoles.length === 0) return true;
  if (!userRole) return false;
  return hasAnyRole(userRole, allowedRoles);
}
