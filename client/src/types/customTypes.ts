export type Listing = {
  _id: string;
  deal: string;
  seller: string;
  condition: string;
  delivery: string;
  description: string;
  images: string[];
  light: string;
  price: string;
  species: string;
  water: string;
  location: string;
  soil: string;
};

export type User = {
  email: string;
  password: string;
  avatar?: Avatar;
};

export type Avatar = {
  secureUrl: string;
  publicId: string;
};

export type LoginOkResponse = {
  message: string;
  user: {
    email: string;
    userName: string;
    avatar: string;
  };
  token: Token;
  error: string;
};

export type Token = string;

export type LoggedInUser = {
  email: string;
  password?: string;
  avatar?: string;
};

export type GetProfileOkResponse = {
  userProfile: User;
};
