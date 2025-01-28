export type Listing = {
  _id: string;
  deal: string;
  seller: Seller;
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

export type Seller = {
  _id: string;
  username: string;
  avatar?: Avatar;
  postedListings?: string;
  createdAt: string;
};

export type Avatar = {
  secureUrl: string;
  publicId: string;
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
  userId: string;
  postedListings?: string;
  favourites?: Listing[];
  createdAt?: string;
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

export type Thread = {
  _id: string;
  sellerId: SellerId;
  buyerId: BuyerId;
  listingId: ListingId;
  messages: Message[];
};

export type SellerId = {
  username: string;
  _id: string;
};

export type BuyerId = {
  username: string;
  _id: string;
};

export type ListingId = {
  species: string;
  _id: string;
};

export type Message = {
  _id: string;
  senderId: SenderId;
  text: string;
};

export type SenderId = {
  username: string;
  _id: string;
};

export type ErrorResponse = {
  message: string;
};
