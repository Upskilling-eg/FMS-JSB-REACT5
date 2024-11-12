import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../../services/api";
import { USERS_URLS } from "../../../../services/api/apiURLs";
import { toast } from "react-toastify";
import {
  EmailValidation,
  getRequiredMessage,
  PasswordValidation,
} from "../../../../services/validations";

export default function ResetPass() {
  const location = useLocation();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm({
    defaultValues: { email: location.state.email },
    mode: "onChange",
  });

  const navigate = useNavigate();
  console.log(location.state);

  const onSubmit = async (data) => {
    try {
      console.log({ data });
      const response = await axiosInstance.post(USERS_URLS.RESET, data);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  React.useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);
  return (
    <>
      <div className="title my-4">
        <h3 className="h5">Reset Password</h3>
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
            disabled={true}
            type="text"
            className="form-control"
            placeholder="Enter your E-mail"
            aria-label="email"
            aria-describedby="basic-addon1"
            {...register("email", EmailValidation)}
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="OTP"
            aria-label="seed"
            {...register("seed", {
              required: getRequiredMessage("OTP"),
            })}
          />
        </div>
        {errors.seed && (
          <div className="text-danger mb-3 mb-3">{errors.seed.message}</div>
        )}
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="New Password"
            aria-label="password"
            aria-describedby="basic-addon1"
            {...register("password", PasswordValidation("Password"))}
          />
          <button
            className="input-group-text"
            id="basic-addon1"
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
            }}
          >
            <i
              className={`fa-solid ${
                isPasswordVisible ? "fa-eye" : "fa-eye-slash"
              }`}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {errors.password && (
          <div className="text-danger mb-3 mb-2">{errors.password.message}</div>
        )}
        <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon1">
            <i className="fa fa-key" aria-hidden="true"></i>
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="form-control"
            placeholder="Confirm new password"
            aria-label="Confirm New Password"
            aria-describedby="basic-addon1"
            {...register("confirmPassword", {
              required: getRequiredMessage("Confirm Password"),
              validate: (confirmPassword) => {
                return confirmPassword == watch("password")
                  ? ""
                  : "Password and Confirm Password should match";
              },
            })}
          />
          <button
            className="input-group-text"
            id="basic-addon1"
            type="button"
            onClick={() => setIsPasswordVisible((prev) => !prev)}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
            }}
          >
            <i
              className={`fa-solid ${
                isPasswordVisible ? "fa-eye" : "fa-eye-slash"
              }`}
              aria-hidden="true"
            ></i>
          </button>
        </div>
        {errors.password && (
          <div className="text-danger mb-3">
            {errors?.confirmPassword?.message}
          </div>
        )}

        <button disabled={isSubmitting} className="btn btn-success w-100 my-3">
          {isSubmitting ? "Resetting your password ⌛" : "Rest"}
        </button>
      </form>
    </>
  );
}
