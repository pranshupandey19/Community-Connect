import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function Events() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://community-connect-wbs6.vercel.app/events/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="events-parent">
      <div style={{ textAlign: "center" }}>
                <Text fontSize='5xl' fontWeight="800" color="#0959aa">Registered Events</Text>
                <br />
                <Text fontSize='xl' fontStyle="italic">Upcoming Events!</Text>
            </div>
      <SimpleGrid height={"fit-content"} columns={[1, 1, 2, 4]} spacing={10}>
        {data.map((e, i) => {
          return <EventCard key={i} data={e} />;
        })}
      </SimpleGrid>
    </div>
  );
}
