export type Listing = {
  _id: string;
  deal: string;
  seller: string;
  condition: string;
  delivery: string;
  description: string;
  images: Image[];
  light: string;
  price: number;
  species: string;
  water: string;
  location: string;
  soil: string;
  swapfor: string;
};

export type Image = {
  secure_url: string;
  publicId: string;
};

export type User = {
  username: string;
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
    username: string;
    avatar: string;
  };
  token: Token;
  error: string;
};

export type Token = string;

export type LoggedInUser = {
  email: string;
  password: string;
  avatar?: string;
};

export type GetProfileOkResponse = {
  userProfile: User;
};
