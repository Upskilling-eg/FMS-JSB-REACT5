import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/images/no-data.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { axiosInstance } from "../../../../services/api";
import { CATEGORY_URLS } from "../../../../services/api/apiURLs";
export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  let getCategoties = async () => {
    try {
      let response = await axiosInstance.get(CATEGORY_URLS.GET_CATEGORIES);
      console.log(response.data.data);

      setCategoriesList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let deleteCategory = () => {
    try {
      let response = axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Category/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log(response);
      getCategoties();
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };
  useEffect(() => {
    getCategoties();
  }, []);

  return (
    <>
      <Header
        title={"Categories List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <DeleteConfirmation
        deleteItem={"Category"}
        deleteFun={deleteCategory}
        toggleFlag={true}
      />
      <div className="d-flex justify-content-between p-4">
        <h5>Categories Table Details</h5>
        <button className="btn btn-success">Add new Category</button>
      </div>
      <div className="p-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categoriesList.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category.creationDate}</td>
                <td>
                  <i
                    className="fa fa-trash mx-3 text-danger"
                    onClick={() => handleShow(category.id)}
                    aria-hidden="true"
                  ></i>
                  <i className="fa fa-edit text-warning" aria-hidden="true"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
