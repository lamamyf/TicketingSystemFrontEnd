import { UserRole } from './userRole';
export class AuthModel {
  jwt: string;
  id: number;
  userRole: UserRole;

  constructor(auth: any){
    this.jwt = auth.jwt;
    const claims = JSON.parse(atob(this.jwt.split('.')[1]));
    this.id = claims.sub;
    this.userRole = (claims.isClient) ? UserRole.CLIENT : UserRole.ADMIN;
  }
}
