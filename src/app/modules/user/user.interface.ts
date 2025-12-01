// Defines user roles
export enum Role {
  ADMIN = "ADMIN",
  VENDOR = "VENDOR",
  CUSTOMER = "CUSTOMER",
}

// Defines account status
export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

// User interface definition
export interface IUser {
  email: string;
  password: string;
  role: Role;
  status: AccountStatus;
  needChangePassword: boolean;
  createdAt?: Date;
}
