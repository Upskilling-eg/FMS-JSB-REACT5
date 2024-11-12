import React from "react";
import { useForm } from "react-hook-form";
import { EmailValidation } from "../../../../services/validations";
import axios from "axios";
import { axiosInstance } from "../../../../services/api";
import { USERS_URLS } from "../../../../services/api/apiURLs";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

export default function ForgetPass() {
  const {
    register,
    formState: { errors, isSubmitting, isLoading },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.RESET_REQUEST, data);
      toast.success(response?.data?.message);
      navigate("/reset-password", { state: data });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="title my-4">
        <h3 className="h5">Forget Password</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="email"
            aria-describedby="basic-addon1"
            {...register("email", EmailValidation)}
          />
        </div>

        <button disabled={isSubmitting} className="btn btn-success w-100 my-3">
          {isLoading || isSubmitting ? "Sending your request ⌛" : "Request"}
        </button>
      </form>
    </>
  );
}
