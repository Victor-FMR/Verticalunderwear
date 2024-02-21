export interface user {
  firstName:   String
  lastName :   String
  email :      String   
  phoneNumber: String
  password :   String
  isActive :  boolean
}

export interface User{
  id: string,
  name: string,
  roles: string[],
  email: string
  
}
export interface JwtPayload {
  id: string
}



export interface ShippingAddress {
  first_name?: string;
  last_name?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  phone?: string;
  street?: string;
}