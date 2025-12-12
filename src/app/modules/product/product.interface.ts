import { Types } from "mongoose";

// Defines product materials
export enum Materials {
  WOODEN = "WOODEN",
  METAL = "METAL",
  BAMBOO = "BAMBOO",
}

// Defines product categories
export enum ProductCategory {
  CHAIR = "CHAIR",
  BED = "BED",
  SOFA = "SOFA",
  TABLE = "TABLE",
  SIDE_DRAWER = "SIDE DRAWER",
  DINING_CHAIR = "DINING CHAIR",
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
  category: ProductCategory;
  thumbnail?: string;
  description?: string;
  productOverview?: string;
  specifications?: IProductSpecifications;
}
