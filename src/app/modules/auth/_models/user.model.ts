import { UserRole } from './userRole';

export class UserModel{
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  gender: string;
  userRole: UserRole;

  constructor()

  constructor(user?: any){
    if(user){
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.gender = user.gender;
      this.userRole = user.userRole;
    }
  }
  
  setUser(user: any) {
    this.id = user.id;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatar = './assets/media/svg/avatars/default.jpg';
    this.gender = user.gender;

  }

  
}
