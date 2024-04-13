import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "./Context";
import axios from "axios";
import { getCookie } from "../utils/cookie";
import Photo from "../assets/LoginUser.png";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function Donations() {
  const { userType, setUserType } = useContext(AppContext);
  const [data, setData] = useState([]);
  const username = getCookie("username");
  const orgname = getCookie("orgname");
  useEffect(() => {
    axios
      .get("https://community-connect-wbs6.vercel.app/donations/all")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const renderDonations = () => {
    if (userType === "User") {
      return (
        <TableContainer maxHeight={"40vh"} overflowY={"scroll"} className="table">
          <Table colorScheme="blue" variant="striped">
            <Thead>
              <Tr>
                <Th>Sr.No.</Th>
                <Th>Amount</Th>
                <Th>To</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                .filter((e) => e.by.username === username)
                .map((donation, i) => (
                  <Tr key={donation.id}>
                    <Td>{i + 1}</Td>
                    <Td>₹ {donation.amount}</Td>
                    <Td>{donation.to.name}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
    } else if (userType === "Organization") {
      return (
        <TableContainer maxHeight={"40vh"}>
          <Table colorScheme="blue" variant="striped">
            <Thead>
              <Tr>
                <Th>Sr.No.</Th>
                <Th>Amount</Th>
                <Th>By</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data
                .filter((e) => e.to.orgname === orgname)
                .map((donation, i) => (
                  <Tr key={donation.id}>
                    <Td>{i + 1}</Td>
                    <Td>₹ {donation.amount}</Td>
                    <Td>{donation.by.name}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      );
    }
  };
  return (
    <div className="donations-parent">
      <div className="signup-img">
        <img style={{ width: "35vmax" }} src={Photo} alt="" />
      </div>
      <div>{renderDonations()}</div>
    </div>
  );
}
