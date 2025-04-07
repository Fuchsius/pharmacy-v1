// src/types/auth.ts
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username?: string;
  phone?: string;
  roleRelation: {
    role: "admin" | "customer";
  };
  status: "active" | "inactive";
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}
