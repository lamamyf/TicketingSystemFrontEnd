import { UserRole } from './userRole';
import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';

export class UserModel extends AuthModel {

  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  gender: string;
  UserRole: UserRole;


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
