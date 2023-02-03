export interface LoginCredentials {
  id: number;
  email: string;
  password: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
}

export interface CheckoutData {
  id: number;
  creditCard: number;
  exporationMonth: number;
  expirationYear: number;
  cvvCode: number;
  nameOnCard: string;
  country: string;
}