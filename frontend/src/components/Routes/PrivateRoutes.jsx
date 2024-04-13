import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context";
import { useToast } from "@chakra-ui/react";

export const InstitutionPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType != "Institution") {
      toast({
        title: "Not Authorized!",
        description: "Please signup/login as an institution!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/institution/signup");
    }
  }, []);

  return <>{children}</>;
};

export const InstitutionUserPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType == "Organization") {
      toast({
        title: "Not Authorized!",
        description:
          "You are logged in as an Organization.Please signup/login as an institution or user!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/user/signup");
    }
  }, []);

  return <>{children}</>;
};

export const OrganisationPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType != "Organization") {
      toast({
        title: "Not Authorized!",
        description: "Please signup/login as an organization!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/org/signup");
    }
  }, []);

  return <>{children}</>;
};

export const OrganisationUserPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType == "Institution") {
      toast({
        title: "Not Authorized!",
        description:
          "You are logged in as an Institution. Please signup/login as an organisation or user!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/user/signup");
    }
  }, []);

  return <>{children}</>;
};

export const UserPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { userType, setUserType } = useContext(AppContext);
  const toast = useToast();
  useEffect(() => {
    if (userType != "User") {
      toast({
        title: "Not Authorized!",
        description: "Please signup/login as a user!",
        status: "error",
        duration: 4000,
        isClosable: false,
      });
      navigate("/user/signup");
    }
  }, []);

  return <>{children}</>;
};
