import React, { useEffect, useState } from "react";
import Header from "../../../shared/components/Header/Header";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import noData from "../../../../assets/images/no-data.png";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { axiosInstance } from "../../../../services/api";
import { CATEGORY_URLS } from "../../../../services/api/apiURLs";
import Nodata from "../../../shared/components/NoData/Nodata";
import { useForm } from "react-hook-form";
import useCategories from "../../hooks/useCategories";
export default function CategoriesList() {
  const categoerisQuery = useCategories();
  console.log(categoerisQuery);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [selectedId, setSelectedId] = useState(0);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  let onSubmit = async (data) => {
    try {
      let response = await axiosInstance.post(
        CATEGORY_URLS.POST_CATEGORY,
        data
      );
      categoerisQuery.trigger();
      handleCloseAdd();
    } catch (error) {
      console.log(error);
    }
  };

  let deleteCategory = () => {
    try {
      let response = axiosInstance.delete(
        CATEGORY_URLS.DELETE_CATEGORY(selectedId)
      );
      console.log(response);
      categoerisQuery.trigger();
    } catch (error) {
      console.log(error);
    }
    handleClose();
  };

  return (
    <>
      <Header
        title={"Categories List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />

      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        deleteItem={"Category"}
        deleteFun={deleteCategory}
      />

      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cetegory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Category Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                  {...register("name", { required: "Name is required" })}
                />
              </div>
              {errors.name && (
                <span className="text-danger">{errors.name.message}</span>
              )}

              <button className="btn btn-success w-100 my-3">Save</button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div className="d-flex justify-content-between p-4">
        <h5>Categories Table Details</h5>
        <button className="btn btn-success" onClick={handleShowAdd}>
          Add new Category
        </button>
      </div>
      <div className="p-4">
        {categoerisQuery?.categories?.data?.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoerisQuery?.categories?.data.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
                  <td>
                    <i
                      className="fa fa-trash mx-3 text-danger"
                      onClick={() => handleShow(category.id)}
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-edit text-warning"
                      aria-hidden="true"
                    ></i>
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
