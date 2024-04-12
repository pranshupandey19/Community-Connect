import { Heading, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { getCookie } from "../utils/cookie";

export default function Events() {
  const username = getCookie("username");
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/events/all")
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
      <Heading>Registered Events</Heading>
      <SimpleGrid height={"fit-content"} columns={[1, 1, 2, 4]} spacing={10}>
        {data.map((e, i) => {
          return <EventCard key={i} data={e} />;
        })}
      </SimpleGrid>
    </div>
  );
}
