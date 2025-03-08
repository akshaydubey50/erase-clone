export type KindeUser = {
  email?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};

export type CreateUser = {
  name: string;
  email: string;
  image: string;
};