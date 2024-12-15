import { createBrowserRouter } from "react-router-dom";
import Layouts from "./layouts/Layouts";
import NewProducts, {
  action,
  action as newProductAction,
} from "./views/NewProducts";
import Products, {
  loader as productsLoader,
  action as updateAvailabilityAction,
} from "./views/Products";
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from "./views/EditProduct";
import { action as deleteProducAction } from "./components/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: "productos/nuevo",
        element: <NewProducts />,
        action: newProductAction,
      },
      {
        path: "productos/:id/editar", //ROA Pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar", //ROA Pattern
        action: deleteProducAction,
      },
    ],
  },
]);
