import { UserRole } from './userRole';

export class UserModel{


  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: number;
  gender: string;
  role: UserRole;

  constructor()

  constructor(user?: any){
   
    if(user){
      this.id = user.id;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.gender = user.gender;
      this.role = user.userRole;
      this.avatar = user.avatar;
    }
  }
  
  setUser(user: any) {
    this.id = user.id;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.avatar = user.gender === "FEMALE"? 0 : -1 ;
    this.gender = user.gender;
    this.role = UserRole.CLIENT;

  }


  

  
}
