import { z } from "zod";
import { Materials } from "./product.interface";

// Zod schema for product specifications
const productSpecificationsSchema = z.object({
  height: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Height is required"
          : "Height must be a number",
    })
    .nonnegative({ error: "Height cannot be negative" })
    .optional(),

  weight: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Weight is required"
          : "Weight must be a number",
    })
    .nonnegative({ error: "Weight cannot be negative" })
    .optional(),

  width: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Width is required"
          : "Width must be a number",
    })
    .nonnegative({ error: "Width cannot be negative" })
    .optional(),

  length: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Length is required"
          : "Length must be a number",
    })
    .nonnegative({ error: "Length cannot be negative" })
    .optional(),

  meterials: z.enum(Object.values(Materials) as [string]).optional(),
});

// Zod schema for creating a product
const createProductSchema = z.object({
  // Title
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .min(2, { error: "Title must be at least 2 characters long." })
    .max(100, { error: "Title cannot exceed 100 characters." })
    .trim(),

  // Price
  price: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Price is required"
          : "Price must be a number",
    })
    .nonnegative({ error: "Price cannot be negative." }),

  // Stock
  stock: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Stock is required"
          : "Stock must be a number",
    })
    .int({ error: "Stock must be an integer." })
    .nonnegative({ error: "Stock cannot be negative." }),

  // Category
  category: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Category is required"
          : "Category must be a string",
    })
    .min(2, { error: "Category must be at least 2 characters long." })
    .max(50, { error: "Category cannot exceed 50 characters." })
    .trim(),

  // Thumbnail
  thumbnail: z.string({ error: "Thumbnail must be string" }).trim().optional(),

  // Discount
  discount: z
    .number({
      error: (issue) =>
        issue.input === undefined
          ? "Discount is required"
          : "Discount must be a number",
    })
    .min(0, { error: "Discount cannot be negative." })
    .max(100, { error: "Discount cannot exceed 100." })
    .optional(),

  // Description
  description: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Description is required"
          : "Description must be a string",
    })
    .max(500, { error: "Description cannot exceed 500 characters." })
    .trim()
    .optional(),

  // Product details
  productDetails: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Product details are required"
          : "Product details must be a string",
    })
    .max(1000, { error: "Product details cannot exceed 1000 characters." })
    .trim()
    .optional(),

  // Specifications
  specifications: productSpecificationsSchema.optional(),
});

export default createProductSchema;
