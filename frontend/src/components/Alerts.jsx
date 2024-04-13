import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Alerts() {
  const genAI = new GoogleGenerativeAI("AIzaSyCpI_eqmPLFjJX9omtdcF_zdyQsCDlqLn8");

  const [isLoading, setIsLoading] = useState(false);
  const [generatedTips, setGeneratedTips] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://sachet.ndma.gov.in/cap_public_website/FetchAllAlertDetails")
      .then((res) => {
        console.log(res.data);
        setData(res.data.map((item) => ({ ...item, isLoading: false })));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  async function run(index) {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const currentItem = data[index];
    const prompt = `There is ${currentItem["disaster_type"]} in ${currentItem["alert_source"]} So I want you to give me a list of precautions I should take to save myself from the situation. Give me very specific points so that I am clear with my precautions. Don't make it longer than 100 words. Start with something positive. (Use <br> after every point. Use <b> tag to highlight important stuff. Please wrap heading around <b> tag instead of **)`;
    console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    setGeneratedTips(text);
    setIsLoading(false);
    setSelectedData(data[index]);
    onOpen();
  }

  function AIButton({ index }) {
    const currentItem = data[index];
    return (
      <Button
        isLoading={currentItem.isLoading}
        onClick={() => run(index)}
      >
        Ask AI
      </Button>
    );
  }

  return (
    <div className="alerts-parent">
      {data.length === 0 ? (
        ""
      ) : (
        <TableContainer>
          <Table colorScheme="blue" variant="striped">
            <Thead>
              <Tr>
                <Th color={"red"}>Source</Th>
                <Th color={"red"}>Type</Th>
                <Th color={"red"}>Ask AI</Th>
                <Th color={"red"}>Severity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((e, i) => (
                <Tr key={i}>
                  <Td>{e["alert_source"]}</Td>
                  <Td>{e["disaster_type"]}</Td>
                  
                  <Td>
                    <AIButton index={i} />
                  </Td>
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tips from AI :)</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div dangerouslySetInnerHTML={{ __html: generatedTips }}></div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
