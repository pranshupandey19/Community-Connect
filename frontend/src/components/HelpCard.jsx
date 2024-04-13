import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Select,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

export default function HelpCard({ data }) {

  const stateChange = (val) => {
    axios.put(`https://community-connect-wbs6.vercel.app/helps/update/${data["_id"]}`, {newState:val})
    .then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <Button onClick={onOpen} variant="solid" colorScheme="blue">
          Details
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter="blur(10px) " />
          <ModalContent>
            <ModalHeader textAlign="center">{data.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={data.image}
                borderRadius="lg"
                height={"30vmin"}
                width={"100%"}
              />
              <br />
              <Badge ml="1" fontSize="0.8em" colorScheme="blue">
              {data.category.name}
            </Badge>
            </ModalBody>
            <ModalBody>
              <Text><b>Description - </b>{data.description}</Text>
              <Text><b>Address - </b>{data.address}</Text>
            </ModalBody>

            <ModalFooter>
              <Select onChange={(e)=>{
                stateChange(e.target.value)
              }} defaultValue={data.state}>
                <option value="unresolved">Unresolved</option>
                <option value="resolved">Resolved</option>
                <option value="resolving">Resolving</option>
              </Select>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Card maxW="sm">
      <CardBody paddingBottom={"0"}>
        <Image
          src={data.image}
          borderRadius="lg"
          height={"25vmin"}
          width={"100%"}
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{data.description}</Heading>
          <Text>{data.description}</Text>
          <Text>
          <Badge ml="1" fontSize="0.8em" colorScheme="blue">
              {data.category.name}
            </Badge>
          </Text>
        </Stack>
      </CardBody>
      {/* <Divider color={"#3182CE"} /> */}
      <CardFooter>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <BasicUsage />
        </div>
      </CardFooter>
    </Card>
  );
}
