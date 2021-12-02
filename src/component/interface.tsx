export interface IBaseUser {
    name: string;
    Project: string;
    Comments: string;
    // Project: string;
    // age: number | string;
  }
  export interface IUser extends IBaseUser {
    id: number;
  }
  