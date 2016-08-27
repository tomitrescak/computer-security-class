export function isAdmin(user: any): boolean {
  return playsRole(user, 'admin');
}

export function playsRole(user: any, role: string): boolean {
  return user && user.roles && user.roles.indexOf('role') >= 0;
}

export function playsRoles(user: any, roles: string[]): boolean {
  for (let role of roles) {
    if (playsRole(user, role)) {
      return true;
    }
  }
  return false;
}
