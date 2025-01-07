import { Address } from "./Address";

export type ApplicationUser = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  address: Address;
  birthday: Date | string;
  role: string;
  companyId: string;
};

export type CreateApplicationUser = ApplicationUser & {
  password: string;
  confirmPassword: string;
};

export type UpdateApplicationUser = Omit<
  ApplicationUser,
  "email" | "userName"
> & {
  userId: string;
};

export type ResponseApplicationUser = ApplicationUser & {
  applicationUserProfileId: string;
};

export type GetUsersResponse = {
  applicationUserProfileId: string;
  email: string;
  userName: string;
  companyId: string;
  firstName: string;
  lastName: string;
  birthday: string;
  address: Address;
  role: number;
};

export type UserToDisplay = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  city: string;
  state: string;
  apartment: string;
  zipCode: string;
  birthday: Date | string;
  role: string;
  companyId: string;
};
