import { Product } from "../types";
import {
  ActionFunctionArgs,
  Form,
  useNavigate,
  redirect,
  useFetcher,
} from "react-router-dom";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductServices";

type ProductProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  // console.log("desde action de product details");
  // console.log(params.id);
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

const ProductDetails = ({ product }: ProductProps) => {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const isAvailibily = product.availability;

  return (
    <>
      <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">{product.name}</td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
            <button
              type="submit"
              name="id"
              value={product.id}
              className={`${
                isAvailibily ? "text-black" : "text-red-600"
              } rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
            >
              {isAvailibily ? "Disponible" : "No disponible"}
            </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800">
          <div className="flex gap-2 items-center">
            {/* <Link
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-sm"
              to={`/productos/${product.id}/editar`}
            >
              Editar
            </Link> */}
            <button
              className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-sm"
              onClick={() => navigate(`/productos/${product.id}/editar`)}
            >
              Editar
            </button>
            <Form
              action={`productos/${product.id}/eliminar`}
              method="POST"
              className="w-full"
              onSubmit={(e) => {
                if (!confirm("¿Elminar?")) {
                  e.preventDefault();
                }
              }}
            >
              <input
                className="bg-red-600 cursor-pointer text-white rounded-lg w-full p-2 uppercase font-bold text-sm"
                type="submit"
                value="Eliminar"
              />
            </Form>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ProductDetails;
