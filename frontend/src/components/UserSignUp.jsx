import React, { useContext, useEffect, useState } from "react";
import Photo from "../assets/LoginUser.png";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Select,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import axios from "axios";
import { AppContext } from "./Context";
import { setCookie } from "../utils/cookie";
import { loginCheck, typeCheck } from "../utils/loginCheck";

export default function UserSignUp() {
  const [count, setCount] = useState(1);
  const [formData, setFormData] = useState({});
  const [institutions, setInstitutions] = useState([]);
  const { userType, setUserType, login, setLogin } = useContext(AppContext);
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  useEffect(() => {
    axios
      .get("https://community-connect-wbs6.vercel.app/institutions")
      .then((res) => {
        setInstitutions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const FormSubmitHandler1 = (data) => {
    // console.log(formData);
    setCount(count + 1);
    setFormData((prev) => ({
      ...prev,
      name: data.name,
      password: data.password,
      username: data.username,
    }));
  };
  const FormSubmitHandler2 = (data) => {
    // console.log(formData);
    setFormData((prev) => ({
      ...prev,
      phone: data.contact.phone,
      email: data.contact.email,
      address: data.address,
    }));
    const id = toast.loading("Signing Up...");
    setTimeout(() => {
      axios
        .post("https://community-connect-wbs6.vercel.app/users/signup", formData)
        .then((res) => {
          toast.update(id, {
            render: "Signed Up",
            type: "success",
            isLoading: false,
          });
          setCookie("auth-token", res.data, 365);
          setCookie("username", formData.username, 365);
          setCookie("type", "User", 365);
          setUserType(typeCheck());
          setLogin(loginCheck());
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 400) {
            toast.update(id, {
              render: "Username exists",
              type: "error",
              isLoading: false,
            });
          } else {
            toast.update(id, {
              render: "Wrong Data Provided (Duplicate Email/Phone)",
              type: "error",
              isLoading: false,
            });
          }
        });
    }, 1200);
  };
  const renderStep = () => {
    switch (count) {
      case 1:
        return (
          <div className="form-parent">
            <form className="form" onSubmit={handleSubmit(FormSubmitHandler1)}>
              <Text as="b" fontSize={["3vmax", "2.3vmax"]}>
                Sign-Up
              </Text>
              <Text as="i" fontSize={["1.5vmax", "1.2vmax"]}>
                Enter the following details!
              </Text>
              <FormControl>
                <FormLabel fontSize={["2vmax", "1.2vmax"]} as="i" fontWeight="550">
                  Username
                </FormLabel>
                <Input
                  type="text"
                  border="2px solid #0959aa90"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <p className="err">{errors.username?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={["2vmax", "1.2vmax"]} as="i" fontWeight="550">
                  Name
                </FormLabel>
                <Input
                  type="text"
                  border="2px solid #0959aa90"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
                <p className="err">{errors.name?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize={["2vmax", "1.2vmax"]} as="i" fontWeight="550">
                  Password
                </FormLabel>
                <InputGroup>
                <Input
                  type={show ? 'text' : 'password'}
                  border="2px solid #0959aa90"
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
                  <InputRightElement width='5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick} colorScheme="blue">
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
                  </InputGroup>
                <p className="err">{errors.password?.message}</p>
              </FormControl>
              <Button type="submit" colorScheme="red">
                Next
              </Button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="form-parent">
            <form className="form" onSubmit={handleSubmit(FormSubmitHandler2)}>
              <Text as="b" fontSize="2.3vmax">
                Step-2
              </Text>
              <Text as="i" fontSize="1vmax">
                Some more info please!
              </Text>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Address
                </FormLabel>
                <Input
                  type="text"
                  border="2px solid #0959aa90"
                  {...register("address", {
                    required: "Address is required",
                  })}
                  value={formData.address || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      address: e.target.value,
                    });
                  }}
                />
                <p className="err">{errors.address?.message}</p>
              </FormControl>
              <FormControl>
                <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                  Institution
                </FormLabel>
                <Select
                  placeholder="Select Institution"
                  borderColor={"blue"}
                  {...register("institution", {
                    required: "Institution is required",
                  })}
                  value={formData.institution || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                >
                  {institutions.map((e, i) => {
                    return (
                      <option key={i} value={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </Select>
                <p className="err">{errors.institution?.message}</p>
              </FormControl>
              <div style={{ display: "flex", gap: "3vmin", width: "100%" }}>
                <FormControl>
                  <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                    Phone
                  </FormLabel>
                  <Input
                    type="number"
                    border="2px solid #0959aa90"
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
                    value={formData.contact?.phone || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value },
                      });
                    }}
                  />
                  <p className="err">{errors.contact?.phone?.message}</p>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="1.2vmax" as="i" fontWeight="550">
                    Email
                  </FormLabel>
                  <Input
                    type="email"
                    border="2px solid #0959aa90"
                    {...register("contact.email", {
                      required: "Email is required",
                    })}
                    value={formData.contact?.email || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      });
                    }}
                  />
                  <p className="err">{errors.contact?.email?.message}</p>
                </FormControl>
              </div>
              <div
                style={{ display: "flex", gap: "3vmin", marginTop: "3vmin" }}
              >
                <Button
                  onClick={() => {
                    setCount(count - 1);
                  }}
                  colorScheme="yellow"
                >
                  Back
                </Button>
                <Button type="submit" colorScheme="red">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        );
    }
  };
  return (
    <div className="signup-grandparent">
      <div className="signup-parent">
        <div className="signup-img">
          <img style={{ width: "40vmax" }} src={Photo} alt="" />
        </div>
        {renderStep()}
      </div>
      <div className="signup-btns">
        <Link to="/institution/signup">
          <Button colorScheme="blue">Institution Sign Up</Button>
        </Link>
        <Button colorScheme="blue">Organisation Sign Up</Button>

      </div>
      <ToastContainer />

    </div>
  );
}
