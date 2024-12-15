import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductServices";
import ProductForm from "../components/ProductForm";

/*
funcion de react router dom para tomar los valores
del formulario y almacenarlos
*/

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }

  if (error.length) {
    return error;
  }

  await addProduct(data);

  return redirect("/");
}

const NewProducts = () => {
  const error = useActionData() as string;
  //   console.log(error);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
          to="/"
        >
          {" "}
          Volver a Productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {/* //Formulario para agregar Productos */}
      <Form method="POST" className="mt-10">
        <ProductForm />
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
};

export default NewProducts;
