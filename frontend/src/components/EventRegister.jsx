import React, { useContext } from "react";
import Photo from "../assets/Events.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Select,
  Textarea,
  useToast,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { getCookie, setCookie } from "../utils/cookie";
import axios from "axios";
import { AppContext } from "./Context";

export default function EventRegister() {
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
  const authToken = getCookie("auth-token");
  const toast = useToast();
  const FormSubmitHandler = (data) => {
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(data);
        axios
          .post("https://community-connect-wbs6.vercel.app/events/new", data, {
            headers: {
              Authorization: authToken,
            },
          })
          .then((res) => {
            resolve();
            setTimeout(() => {
              navigate("/events");
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      }, 1500);
    });
    toast.promise(examplePromise, {
      success: { title: "Event Registered", description: "Looks great" },
      error: { title: "Error!", description: "Something wrong" },
      loading: { title: "Registering...", description: "Please wait" },
    });
  };
  return (
    <div className="signup-grandparent">
      <div className="signup-parent">
        <div className="signup-img">
          <img style={{ width: "40vmax" }} src={Photo} alt="" />
        </div>
        <div className="form-parent">
          <form className="form" onSubmit={handleSubmit(FormSubmitHandler)}>
            <Text as="b" fontSize="2.3vmax">
              Let's register an event!
            </Text>
            <Text as="i" fontSize="1vmax">
              Enter the following details to sign-in!
            </Text>
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
                  Image Link
                </FormLabel>
                <Input
                  type="text"
                  borderColor="blue"
                  {...register("image", {
                    required: "Image is required",
                  })}
                />
                <p className="err">{errors.image?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Voluteers required
                </FormLabel>
                <Input
                  type="number"
                  borderColor="blue"
                  {...register("volunteers", {
                    required: "Volunteers Required",
                  })}
                />
                <p className="err">{errors.volunteers?.message}</p>
              </FormControl>
            </div>
            <div style={{ display: "flex", gap: "3vmin", width: "100%" }}>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Budget
                </FormLabel>
                <InputGroup>
                <InputLeftAddon>₹</InputLeftAddon>
                <Input
                  type="text"
                  borderColor="blue"
                  {...register("budget", {
                    required: "Budget is required",
                  })}
                  />
                  </InputGroup>
                <p className="err">{errors.budget?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Date
                </FormLabel>
                <Input
                  type="date"
                  borderColor="blue"
                  {...register("date", {
                    required: "Date Required",
                  })}
                />
                <p className="err">{errors.date?.message}</p>
              </FormControl>
            </div>
            <Button type="submit" colorScheme="red">
              Register!
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
