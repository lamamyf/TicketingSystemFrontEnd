export class UpdateUserDto {
    firstName: string;
    lastName: string;
    avatar: number;
    gender: string;


    static construct(userInfo?: any, avatar?: number): UpdateUserDto {
        var updateUserDto = new UpdateUserDto();
        updateUserDto.firstName = userInfo.firstName;
        updateUserDto.lastName = userInfo.lastName;
        updateUserDto.gender = userInfo.gender;
        updateUserDto.avatar = avatar;

        return updateUserDto;
    }

    setUpdateUserDto(firstName: string, lastName: string, gender: string, avatar: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.avatar = avatar;
    }
}