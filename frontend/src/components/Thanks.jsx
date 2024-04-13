import { Heading, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCookie } from "../utils/cookie";

export default function Thanks() {
  let { id, amount } = useParams();
  const username = getCookie("username");
  const toast = useToast();
  const toastIdRef = React.useRef();
  useEffect(() => {
    toastIdRef.current = toast({
      title: `Saving Donation Record!`,
      status: "loading",
      isClosable: false,
    });
    axios
      .post(`https://community-connect-wbs6.vercel.app/donations/new/${id}`, {
        amount: amount,
        username: username,
      })
      .then((res) => {
        console.log(res.data);
        toast.update(toastIdRef.current, {
          title: `Donation Record added!`,
          status: "success",
          isClosable: false,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.update(toastIdRef.current, {
          title: `Some error occured. Contact admin!`,
          status: "error",
          isClosable: false,
        });
      });
  },[]);
  return (
    <div className="thanks-parent">
      <Heading>Thanks for your donation!</Heading>
    </div>
  );
}
