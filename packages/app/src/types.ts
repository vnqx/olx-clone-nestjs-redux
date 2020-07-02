export interface Posting {
  id: number;
  title: string;
  price: number;
  description: string;
  phone: number;
  city: string;
  photos: string[];
}

export interface Me {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}
