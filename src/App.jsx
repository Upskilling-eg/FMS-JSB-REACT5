import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/shared/components/AuthLayout/AuthLayout";
import Login from "./modules/authentication/components/Login/Login";
import Registeration from "./modules/authentication/components/Registeration/Registeration";
import ForgetPass from "./modules/authentication/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/authentication/components/ResetPass/ResetPass";
import NotFound from "./modules/shared/components/NotFound/NotFound";
import MasterLayout from "./modules/shared/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/dashboard/components/Dashboard/Dashboard";
import RecipesList from "./modules/recipes/components/RecipesList/RecipesList";
import RecipeData from "./modules/recipes/components/RecipeData/RecipeData";
import CategoriesList from "./modules/caterories/components/CateoriesList/CategoriesList";
import CategoryData from "./modules/caterories/components/CategoryData/CategoryData";
import UsersList from "./modules/users/compoenents/UsersList/UsersList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/shared/components/ProtectedRoute/ProtectedRoute";
import RecipeForm from "./modules/recipes/components/RecipeForm/RecipeForm";

function App() {
  const [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let decodedToken = localStorage.getItem("token");
    let encodedToken = jwtDecode(decodedToken);
    setLoginData(encodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Registeration /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
      ],
    },
    {
      path: "",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: "dashboard", element: <Dashboard loginData={loginData} /> },
        { path: "recipes", element: <RecipesList loginData={loginData} /> },
        { path: "recipes", element: <RecipesList loginData={loginData} /> },
        { path: "recipes/new-recipe", element: <RecipeForm /> },
        { path: "recipes/:recipeId", element: <RecipeForm /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "category-data", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
