import React, { useContext } from "react";
import Photo from "../assets/LoginUser.png";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { setCookie } from "../utils/cookie";
import { loginCheck, typeCheck } from "../utils/loginCheck";
import axios from "axios";
import { AppContext } from "./Context";

export default function InstitutionSignUp() {
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
    const id = toast.loading("Signing Up...");
    setTimeout(() => {
      axios
        .post("https://community-connect-wbs6.vercel.app/institutions/signup", data)
        .then((res) => {
          toast.update(id, {
            render: "Signed Up!",
            type: "success",
            isLoading: false,
          });
          setCookie("auth-token", res.data, 365);
          setCookie("type", "Institution", 365);
          setUserType(typeCheck());
          setLogin(loginCheck());
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          toast.update(id, {
            render: "Error",
            type: "error",
            isLoading: false,
          });
        });
    }, 1200);
  };
  return (
    <div className="signup-grandparent">
      <div className="signup-parent signup-insti">
        <ToastContainer />
        <div className="signup-img">
          <img style={{ width: "40vmax" }} src={Photo} alt="" />
        </div>
        <div className="form-parent">
          <form
            className="form"
            style={{ gap: "1vmin" }}
            onSubmit={handleSubmit(FormSubmitHandler)}
          >
            <Text as="b" fontSize="2vmax">
              Sign-Up Institution!
            </Text>
            <Text as="i" fontSize="0.8vmax">
              Enter the following details to sign-in!
            </Text>
            <div style={{ display: "flex", gap: "3vmin", width: "100%" }}>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Name
                </FormLabel>
                <Input
                  type="text"
                  borderColor="blue"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <p className="err">{errors.name?.message}</p>
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
            </div>
            <FormControl>
              <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                Description
              </FormLabel>
              <Textarea
                type="text"
                borderColor="blue"
                {...register("description", {
                  required: "Description Required",
                })}
              />
              <p className="err">{errors.description?.message}</p>
            </FormControl>
            <div style={{ display: "flex", gap: "3vmin", width: "100%" }}>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Phone
                </FormLabel>
                <Input
                  type="number"
                  borderColor="blue"
                  {...register("contact.phone", {
                    required: "Phone is required",
                    minLength: {
                      value: 10,
                      message: "Minimum 10 digits required",
                    },
                    maxLength: {
                      value: 10,
                      message: "Maximum 10 digits required",
                    },
                  })}
                />
                <p className="err">{errors.contact?.phone?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  borderColor="blue"
                  {...register("contact.email", {
                    required: "Email is required",
                  })}
                />
                <p className="err">{errors.contact?.email?.message}</p>
              </FormControl>
            </div>
            <FormControl>
              <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                Address
              </FormLabel>
              <Input
                type="text"
                borderColor="blue"
                {...register("address", {
                  required: "Address Required",
                })}
              />
              <p className="err">{errors.address?.message}</p>
            </FormControl>
            <Button
              style={{ marginTop: "2vmin" }}
              type="submit"
              colorScheme="red"
            >
              Sign-Up!
            </Button>
          </form>
        </div>
      </div>
      <div className="signup-btns">
        <Link to="/user/signup">
          <Button colorScheme="blue">User Sign-Up</Button>
        </Link>
        <Button colorScheme="blue">Organisation Sign-Up</Button>
      </div>
    </div>
  );
}
