import { UserRole } from './userRole';
export class AuthModel {
  jwt: string;
  id: number;
  userRole: UserRole;

  constructor(auth: any){
    this.jwt = auth.jwt;
  }
}
