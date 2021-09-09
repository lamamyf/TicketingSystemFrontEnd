export class UpdateUserDto {
    firstName: string;
    lastName: string;
    password: string;
    avatar: number;
    gender: string;

    constructor(userInfo: any, avatar: number){
        this.firstName = userInfo.firstName;
        this.lastName = userInfo.lastName;
        this.gender = userInfo.gender;
        this.avatar = avatar;
    }
}