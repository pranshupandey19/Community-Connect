import React, { useContext } from "react";
import Photo from "../assets/LoginUser.png";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { setCookie } from "../utils/cookie";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import axios from "axios";
import { AppContext } from "./Context";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { userType, setUserType, login, setLogin } = useContext(AppContext);
  const FormSubmitHandler = (data) => {
    console.log(data);
    const id = toast.loading("Signing In...");
    setTimeout(() => {
      axios
        .post("https://community-connect-wbs6.vercel.app/users/signin", data)
        .then((res) => {
          toast.update(id, {
            render: "Logged in",
            type: "success",
            isLoading: false,
          });
          setCookie("auth-token", res.data, 365);
          setCookie("username", data.username, 365);
          setCookie("type", "User", 365);
          setUserType(typeCheck());
          setLogin(loginCheck());
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 404) {
            toast.update(id, {
              render: "Username not found",
              type: "error",
              isLoading: false,
            });
          } else if (err.response.status == 401) {
            toast.update(id, {
              render: "Wrong Password",
              type: "error",
              isLoading: false,
            });
          } else {
            toast.update(id, {
              render: "Server Error",
              type: "error",
              isLoading: false,
            });
          }
        });
    }, 1200);
  };
  return (
    <div className="signup-grandparent">
      <div className="signup-parent">
        <ToastContainer />
        <div className="signup-img">
          <img style={{ width: "40vmax" }} src={Photo} alt="" />
        </div>
        <div className="form-parent">
          <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
            <Text as="b" fontSize="2.3vmax">
              Welcome Back!
            </Text>
            <Text as="i" fontSize="1vmax">
              Enter the following details to sign-in!
            </Text>
            <FormControl>
              <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                Username
              </FormLabel>
              <Input
                type="text"
                borderColor="blue"
                {...register("username", {
                  required: "Username is required",
                })}
              />
              <p className="err">{errors.username?.message}</p>
            </FormControl>
            <FormControl>
              <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                Password
              </FormLabel>
              <Input
                type="password"
                borderColor="blue"
                {...register("password", {
                  required: "Password Required",
                  minLength: {
                    value: 8,
                    message: "Minimum 8 characters required",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password Not Valid (Use Special Characters & Numbers)",
                  },
                })}
              />
              <p className="err">{errors.password?.message}</p>
            </FormControl>
            <Button type="submit" colorScheme="red">
              Sign-In!
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
