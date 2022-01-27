export interface IBaseUser {
    name: string;
    Project: string;
    Comments: string;
  }
  export interface IUser extends IBaseUser {
    id: number;
  }
  