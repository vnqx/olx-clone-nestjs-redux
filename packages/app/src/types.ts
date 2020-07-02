export interface Posting {
  id: number;
  title: string;
  price: number;
  mainImage: string;
  otherPhotos: string[];
}

export interface Me {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}
