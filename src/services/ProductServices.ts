import { DraftProductSchema, ProductsSchema, Product, ProductSchema } from "../types"
import axios from 'axios'
import {number, parse, pipe, safeParse, string, transform, } from 'valibot'
import { toBoolean } from "../utils"

/**
 * 
Pagina donde estan todas las funciones que hacen fetch
agregar productos, eliminan productos, etc.
 * 
 */

type ProductData = {
    [k: string]: FormDataEntryValue
}

//function para añadir los products nuevos a la base de datos
export async function addProduct(data : ProductData){
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error(('Datos no validos'));
        }
      
    } catch (error) {
        console.log(error)
    }
}

//function para obtener los products de la base de datos

export async function getProduct(){
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products`
         const {data} = await axios(url)
        //  console.log(data)
         const result = safeParse(ProductsSchema, data.data)
    //    console.log(result)
    if(result.success){
        return result.output
    } else {
        throw new Error('hubo un error en getProducts')
    }
        
    } catch (error) {
        console.log(error)
    }
}

//function para obtener los productos por el ID
export async function getProductById(id : Product['id']){
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
         const {data} = await axios(url)
        //  console.log(data)
         const result = safeParse(ProductSchema, data.data)
    //    console.log(result)
    if(result.success){
        return result.output
    } else {
        throw new Error('hubo un error en getProductsById')
    }
        
    } catch (error) {
        console.log(error)
    }
}

//function para actualizar los productos seleccionados
export async function updateProduct(data : ProductData, id: Product['id']){
    try {
        const NumberSchema = pipe(string(), transform(Number), number())
        const result = safeParse(ProductSchema,  {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
       if(result.success){
           const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
          await axios.put(url, result.output)
       }
    } catch (error) {
        console.log('error desde updateProduct', error)
    }
}


//function para eliminar los productos 
export async function deleteProduct(id : Product['id']){
    try {
         const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
         await axios.delete(url)
        //  console.log(data)
    //    console.log(result)
    } catch (error) {
        console.log(error)
    }
}


//Function para actaulizar la disponibilidad
export async function updateProductAvailability(id: Product['id']){
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error, 'Error desde updateProductAvailibility')
    }
}