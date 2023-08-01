import logo from "./logo.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage, { action as loginAction } from "./pages/Home";
import MapPage from "./pages/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CategoriesIndexPage from "./pages/categories/Index";

import CategoriesStorePage, {
  action as categoriesStoreAction,
} from "./pages/categories/Create";
import CategoriesUpdatePage, {
  action as categoriesUpdateAction,
} from "./pages/categories/Edit";

import ShopsIndexPage from "./pages/shops/Index";

import ShopsStorePage, {
  action as shopsStoreAction,
} from "./pages/shops/Create";
import ShopsUpdatePage, {
  action as shopsUpdateAction,
} from "./pages/shops/Edit";

import RidersIndexPage from "./pages/riders/Index";

import RidersStorePage, {
  action as ridersStoreAction,
} from "./pages/riders/Create";
import RidersUpdatePage, {
  action as ridersUpdateAction,
} from "./pages/riders/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", action: loginAction, element: <HomePage /> },
      { path: "/map", element: <MapPage /> },
      {
        path: "/categories/:message?",
        element: <CategoriesIndexPage />,
      },
      {
        path: "/categories-store",
        action: categoriesStoreAction,
        element: <CategoriesStorePage />,
      },
      {
        path: "/categories-update/:categoryId/:name/:image",
        id: "get-category",
        action: categoriesUpdateAction,
        element: <CategoriesUpdatePage />,
      },
      {
        path: "/shops/:message?",
        id: "get-shops",
        element: <ShopsIndexPage />,
      },
      {
        path: "/shops-store",
        id: "get-categories-shop",
        action: shopsStoreAction,
        element: <ShopsStorePage />,
      },
      {
        path: "/shops-update/:shopId/:name/:address/:image/:adminName/:adminEmail/:adminPassword/:categoryId/:latitude/:longitude",
        id: "get-categories-shop2",
        action: shopsUpdateAction,
        element: <ShopsUpdatePage />,
      },
      {
        path: "/riders/:message?",
        id: "get-riders",
        element: <RidersIndexPage />,
      },
      {
        path: "/riders-store",
        action: ridersStoreAction,
        element: <RidersStorePage />,
      },
      {
        path: "/riders-update/:riderId/:name/:email/:password/:gender/:dateOfBirth",
        action: ridersUpdateAction,
        element: <RidersUpdatePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
