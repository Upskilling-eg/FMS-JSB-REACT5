import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./RecipeForm.module.css";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../../../services/api";
import {
  CATEGORY_URLS,
  RECIPE_URLS,
  TAGS_URLS,
} from "../../../../services/api/apiURLs";
import useBeforeUnload from "../../../../hooks/useBeforeUnload";
const RecipeForm = () => {
  const params = useParams();
  const [tags, setTags] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const navigate = useNavigate();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    register,
    setValue,
    getValues,
  } = useForm({ mode: "onChange" });
  useBeforeUnload(() => {
    localStorage.setItem("recipeData", JSON.stringify(getValues()));
  });
  const recipeId = params.recipeId;
  console.log("recipe-id", params.recipeId);

  const onSubmitHandler = async (data) => {
    const formData = new FormData();

    // formData.append("name", data.name);
    // formData.append("description", data?.description);
    // formData.append("price", data?.price);
    // formData.append("tagId", data.tagId);
    // formData.append("categoriesIds", data.categoriesIds);
    // formData.append("recipeImage", data?.recipeImage[0]);

    for (const key in data) {
      if (key !== "recipeImage") {
        formData.append(key, data[key]);
      } else {
        formData.append("recipeImage", data?.[key]?.[0]);
      }
    }

    try {
      const response = await axiosInstance[!recipeId ? "post" : "put"](
        !recipeId
          ? RECIPE_URLS.CREATE_RECIPE
          : RECIPE_URLS.UPDATE_RECIPE(recipeId),
        formData
      );
      navigate("/recipes");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const getTags = async () => {
      try {
        const response = await axiosInstance.get(TAGS_URLS.GET_TAGS);
        console.log(response);
        setTags(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCategoties = async () => {
      try {
        let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES);
        console.log(response.data.data);

        setCategories(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => {
      await getTags();
      await getCategoties();
      if (recipeId) {
        const getRecipe = async () => {
          const response = await axiosInstance.get(
            RECIPE_URLS.GET_RECIPE(recipeId)
          );
          console.log(response);
          const recipe = response?.data;

          setValue("name", recipe?.name);
          setValue("description", recipe?.description);
          setValue("price", recipe?.price);
          setValue("categoriesIds", recipe?.category?.[0].id);
          setValue("tagId", recipe?.tag?.id);
          setValue("name", recipe?.name);
        };
        getRecipe();
      }
    })();
  }, [recipeId, setValue]);

  return (
    <main>
      <header className={styles["header-wrapper"]}>
        <div className={styles["content-wrapper"]}>
          <h3>
            Fill the <span>Recipes</span> !
          </h3>
          <p>
            you can now fill the meals easily using the table and form , click
            here and sill it with the table !
          </p>
        </div>
        <Link to="/recipes" className={styles["btn-primary"]}>
          All Recipes{" "}
          <svg
            width="18"
            height="15"
            viewBox="0 0 18 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9927 7.70752C17.9927 8.01676 17.8783 8.28271 17.6494 8.50537L11.5542 14.5913C11.4367 14.7088 11.313 14.7954 11.1831 14.8511C11.0532 14.9067 10.9202 14.9346 10.7842 14.9346C10.4749 14.9346 10.2214 14.8356 10.0234 14.6377C9.82552 14.446 9.72656 14.2048 9.72656 13.9141C9.72656 13.7656 9.75749 13.6265 9.81934 13.4966C9.875 13.3667 9.95231 13.2523 10.0513 13.1533L12.1294 11.0566L15.5156 7.94873L15.8867 8.58887L12.6118 8.78369H1.46045C1.13883 8.78369 0.879069 8.68473 0.681152 8.48682C0.477051 8.2889 0.375 8.02913 0.375 7.70752C0.375 7.39209 0.477051 7.13542 0.681152 6.9375C0.879069 6.73958 1.13883 6.64063 1.46045 6.64063L12.6118 6.64062L15.8867 6.83545L15.5156 7.46631L12.1294 4.36768L10.0513 2.271C9.95231 2.17204 9.875 2.05762 9.81934 1.92773C9.75749 1.79785 9.72656 1.65869 9.72656 1.51025C9.72656 1.21956 9.82552 0.978353 10.0234 0.786621C10.2214 0.588704 10.4749 0.489746 10.7842 0.489746C11.0625 0.489746 11.3161 0.601074 11.5449 0.82373L17.6494 6.91895C17.8783 7.13542 17.9927 7.39827 17.9927 7.70752Z"
              fill="white"
            />
          </svg>
        </Link>
      </header>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className={styles["form-wrapper"]}
      >
        <div className={styles["input-wrapper"]}>
          <input
            {...register("name", { required: "This field is required" })}
            placeholder="Recipe Name"
            className="form-control"
          />
          {errors.name?.message && (
            <div className="text-danger">{errors?.name?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <select
            {...register("tagId", { required: "This field is required" })}
            className="form-control"
          >
            <option value="">Tag</option>
            {tags.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.tagId?.message && (
            <div className="text-danger">{errors?.tagId?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <input
            type="number"
            {...register("price", {
              required: "This field is required",
              min: 0,
            })}
            placeholder="Price"
            className="form-control"
          />
          {errors.price?.message && (
            <div className="text-danger">{errors?.price?.message}</div>
          )}
        </div>
        <div className={styles["input-wrapper"]}>
          <select
            {...register("categoriesIds", {
              required: "This field is required",
            })}
            className="form-control"
          >
            <option value="">Category</option>
            {categories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
          {errors.categoriesIds?.message && (
            <div className="text-danger">{errors?.categoriesIds?.message}</div>
          )}
        </div>
        <div className={styles["input-wrapper"]}>
          <textarea
            {...register("description", {
              required: "This field is required",
            })}
            placeholder="Description"
            className="form-control"
          />
          {errors.description?.message && (
            <div className="text-danger">{errors?.description?.message}</div>
          )}
        </div>

        <div className={styles["input-wrapper"]}>
          <input
            {...register("recipeImage")}
            type="file"
            className="form-control"
          />
          {errors.recipeImage?.error && (
            <div className="text-danger">{errors?.description?.message}</div>
          )}
        </div>

        <div className={styles["actions-wrapper"]}>
          <Link to="/recipes" type="button" className={styles["btn-primary"]}>
            Cancel
          </Link>
          <button disabled={isSubmitting} className={styles["btn-primary"]}>
            {isSubmitting ? "Saving ..." : "Save"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default RecipeForm;
