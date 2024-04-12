import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Alerts() {
  document.title = "Alerts!"
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="alerts-parent">
      {data.length == 0 ? (
        ""
      ) : (
        <TableContainer>
          <Table colorScheme="blue" variant="striped">
            <Thead>
              <Tr>
                <Th color={"red"}>Source</Th>
                <Th color={"red"}>Type</Th>
                <Th color={"red"}>Severity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((e, i) => (
                <Tr key={i}>
                  <Td>{e["alert_source"]}</Td>
                  <Td>{e["disaster_type"]}</Td>
                  <Td>
                    <div
                      style={{
                        height: "2vmin",
                        width: "2vmin",
                        borderRadius: "50%",
                        backgroundColor: `${e["severity_color"]}`,
                      }}
                    ></div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
