import { array, boolean, InferOutput, number, object, string } from "valibot";

export const DraftProductSchema = object({
    name: string(),
    price: number()
})

//SCHEMA
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

export const ProductsSchema = array(ProductSchema)
//genera el type con lo que definimos en el schema
export type Product = InferOutput<typeof ProductSchema>