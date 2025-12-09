import { Types } from "mongoose";

// Defines product materials
export enum Materials {
  WOODEN = "WOODEN",
  METAL = "METAL",
  BAMBOO = "BAMBOO",
}

// Product specifications interface definition
interface IProductSpecifications {
  height?: number;
  weight?: number;
  width?: number;
  length?: number;
  meterials?: Materials;
}

// Product interface definition
export interface IProduct {
  vendorId: Types.ObjectId;
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail?: string;
  description?: string;
  productOverview?: string;
  specifications?: IProductSpecifications;
}
