import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
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
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function OrganisationsPosts({ listing }) {
  const [key, setKey] = useState("");
  useEffect(() => {
    axios
      .get("https://community-connect-wbs6.vercel.app/payments/getkey")
      .then((res) => {
        setKey(res.data.key);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      register,
      handleSubmit,
      watch,
      reset,
      setValue,
      formState: { errors },
    } = useForm();
    const formSubmitHandler = (data) => {
      console.log(data);
      axios
        .post("https://community-connect-wbs6.vercel.app/payments/checkout", data)
        .then((res) => {
          console.log(res.data.order);
          const options = {
            key,
            amount: data.amount,
            currency: "INR",
            name: `${listing.name}`,
            description: "Donation",
            image: `${listing.image}`,
            order_id: res.data.order.id,
            callback_url: `https://community-connect-wbs6.vercel.app/payments/paymentverification/${listing["_id"]}/${data.amount}`,
            redirect:true, 
            prefill: {
              name: "",
              email: "",
              contact: "",
            },
            notes: {
              address: "razorapy official",
            },
            theme: {
              color: "#013220",
            },
          };
          const razor = new window.Razorpay(options);
          razor.open();
          {
            onClose();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return (
      <>
        <Button colorScheme="red" onClick={onOpen}>
          Donate Now!
        </Button>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Donating to {listing.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody display={"flex"} flexDirection={"column"} gap={"3vmin"}>
              Thanks for choosing {listing.name} to donate! Any amount of your
              choice will be used to improve & help the society.
              <form
                onSubmit={handleSubmit(formSubmitHandler)}
                className="form"
                action=""
              >
                <Input
                  type="number"
                  borderColor="blue"
                  placeholder="Enter amount of your choice!"
                  {...register("amount", {
                    required: "Amount Required",
                  })}
                />
                <p className="err">{errors.amount?.message}</p>
                <Button type="submit">Donate</Button>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        borderRadius="20px"
        bg="#9cccfc30"
        border="2px solid #9DCCFD"
        textAlign="center"
        align="center"
      >
        <Image
          objectFit="cover"
          width="12vmax"
          height="12vmax"
          borderRadius="1vh"
          margin="20px"
          src={listing.image}
          alt={listing.name}
        />
        {/* <div style={{backgroundImage:`${listing.image}`, height:"12vmax",width:"12vmax",backgroundSize:"100% 100%"}}>

        </div> */}

        <Stack gap={"0"}>
          <CardBody>
            <Heading size="md">{listing.name}</Heading>
            <br />
            <Badge ml="1" fontSize="0.8em" colorScheme="blue">
              {listing.category.name}
            </Badge>
            <br />
            <br />
            <Text py="2">{listing.description}</Text>
          </CardBody>
          <CardFooter display={"flex"} justifyContent={"center"} gap={"3vmin"}>
            <Button variant="solid" colorScheme="blue">
              Know More
            </Button>
            <BasicUsage />
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}

export default OrganisationsPosts;
