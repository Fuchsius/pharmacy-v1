export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  registeredDate: string;
  lastLoginDate: string;
  status: "active" | "blocked";
  totalOrders: number;
  totalSpent: number;
}
