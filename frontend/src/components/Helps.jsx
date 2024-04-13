import React, { useEffect, useState } from "react";
import HelpCard from "./HelpCard";
import axios from "axios";
import { SimpleGrid, Text } from "@chakra-ui/react";

function Helps() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://community-connect-wbs6.vercel.app/helps/all")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="events-parent">
      <div style={{ textAlign: "center" }}>
        <Text fontSize="5xl" fontWeight="800" color="#0959aa">
          Registered Helps!
        </Text>
      </div>
      <SimpleGrid height={"fit-content"} columns={[1, 1, 2, 4]} spacing={10}>
        {data.length === 0 ? (
          "Loading...!"
        ) : (
          <>
            {data.map((e, i) => {
              return <HelpCard key={i} data={e} />;
            })}
          </>
        )}
      </SimpleGrid>
    </div>
  );
}

export default Helps;
