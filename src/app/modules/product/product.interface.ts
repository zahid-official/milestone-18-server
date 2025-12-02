// Defines product materials
export enum Materials {
  WOODEND = "WOODEND",
  METEL = "METEL",
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
  title: string;
  price: number;
  stock: number;
  category: string;
  thumbnail?: string;
  discount?: number;
  description?: string;
  productOverview?: string;
  specifications?: IProductSpecifications;
}
