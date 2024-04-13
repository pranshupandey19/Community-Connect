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
  } from "@chakra-ui/react";
  import React from "react";
  import { getCookie } from "../utils/cookie";
  import axios from "axios";
  
  export default function NPOCard({ data }) {
    const userType = getCookie("type");
    const authToken = getCookie("auth-token");
    let arr = data["registered_volunteers"];
    const volunteer = () => {
      const confirmRes = confirm("Are you sure?");
      if (confirmRes) {
        axios
          .post(
            "https://community-connect-wbs6.vercel.app/npos/volunteer",
            { id: `${data["_id"]}` },
            {
              headers: {
                Authorization: authToken,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    const username = getCookie("username");
  
    function BasicUsage() {
      console.log(data);
      const { isOpen, onOpen, onClose } = useDisclosure();
      return (
        <>
          <Button onClick={onOpen} variant="solid" colorScheme="blue">
            Detais
          </Button>
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter="blur(10px) " />
            <ModalContent>
              <ModalHeader textAlign='center'>{data.name}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image
                  src={data.image}
                  alt={data.name}
                  borderRadius="lg"
                  height={"30vmin"}
                  width={"100%"}
                />
  
  
              </ModalBody>
              <ModalBody>
              <Text>{data.description}
              </Text>
  
              </ModalBody>
          <ModalBody>
          <Text>{data.address}</Text>
              <Text>{data.date}</Text>
          </ModalBody>
  
              <ModalFooter >
                <Button colorScheme="blue" mr={3} >
                  Edit
                </Button>
                <Button colorScheme="red">Delete</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      );
    }
  
    const btnToDisplay = () => {
      if (userType == "User") {
        // Using find() to search for the matching username
        const matchingUser = arr.find((e) => e.username === username);
  
        // If a matching user is found, return the appropriate JSX
        if (matchingUser) {
          return (
            <Button isDisabled colorScheme="green">
              Volunteering
            </Button>
          );
        } else {
          // If no matching user is found, return the default JSX
          return (
            <Button onClick={volunteer} colorScheme="green">
              Volunteer
            </Button>
          );
        }
      } else {
        return (
          <Button isDisabled colorScheme="green">
            Volunteer
          </Button>
        );
      }
    };
  
    return (
      <Card maxW="sm">
        <CardBody paddingBottom={"0"}>
          <Image
            src={data.image}
            alt={data.name}
            borderRadius="lg"
            height={"25vmin"}
            width={"100%"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{data.name}</Heading>
            <Text>{data.description}</Text>
            <Text>
              <b>Volunteers Required</b> : {data.volunteers}
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
            {/* <Button variant="solid" colorScheme="blue">
              Details
            </Button> */}
            <BasicUsage />
  
            {btnToDisplay()}
          </div>
        </CardFooter>
      </Card>
    );
  }
  