import { Role } from "@prisma/client";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface News {
  id: string;
  headline: string;
  slug: string;
  body: string;
  headlineImage?: string | null;
  published: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  viewCount: number;
  createdBy?: {
    username: string;
    email: string;
  };
}
