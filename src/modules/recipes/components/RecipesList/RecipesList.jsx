import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import { imgBaseURL, RECIPE_URLS } from "../../../../services/api/apiURLs";
import { axiosInstance } from "../../../../services/api";
import Nodata from "../../../shared/components/NoData/Nodata";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import noData from "../../../../assets/images/no-data.png";
import { Link } from "react-router-dom";

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  let getRecipes = async () => {
    try {
      let response = await axiosInstance.get(RECIPE_URLS.GET_RECIPES);
      console.log(response.data.data);

      setRecipesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteRecipe = () => {
    try {
      let response = axiosInstance.delete(
        RECIPE_URLS.DELETE_RECIPE(selectedId)
      );
      console.log(response);
      getRecipes();
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <>
      <Header
        title={"Recipes List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        deleteItem={"Recipe"}
        deleteFun={deleteRecipe}
      />

      <div className="d-flex justify-content-between p-4">
        <h5>Recipes Table Details</h5>
        <Link to="/recipes/new-recipe" className="btn btn-success">
          Add new Recipe
        </Link>
      </div>

      <div className="p-4">
        {recipesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        className="w-25"
                        src={`${imgBaseURL}/${recipe.imagePath}`}
                        alt=""
                      />
                    ) : (
                      <img className="w-25" src={noData} alt="" />
                    )}
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.category[0]?.name}</td>

                  <td>
                    <i
                      className="fa fa-trash mx-3 text-danger"
                      onClick={() => handleShow(recipe.id)}
                      aria-hidden="true"
                    ></i>
                    <Link to={`/recipes/${recipe?.id}`}>
                      <i
                        className="fa fa-edit text-warning"
                        aria-hidden="true"
                      ></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <Nodata />
        )}
      </div>
    </>
  );
}
