import React from "react";
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa6";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
  FcExpired,
  FcGraduationCap

} from 'react-icons/fc'
import { useNavigate } from "react-router-dom";


export default function Home() {
  
  document.title = "Community Connect"
  
  return (
    <div style={{ flex: "1", overflowX:"hidden" , display:"flex", flexDirection:"column", justifyContent:"center" }} className="flex">
      <Container maxW={"7xl"}>
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 20 }}
          py={{ base: 10, md: 15 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 3, md: 6 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "20%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "rgba(188, 221, 255, 1)",
                  zIndex: -1,
                }}
              >
                Empower Your Campus Community
              </Text>
              <br />
              <Text as={"span"} color={"#0959aa"}>
                Via Engagement & Volunteering
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              Join our innovative platform designed specifically for college
              campuses to foster community engagement, streamline volunteering
              opportunities, and drive social impact initiatives. Say goodbye to
              the challenges of traditional engagement methods and embrace a new
              era of collaboration and service.
            </Text>
            <br />
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"blue"}
                bg={"#0959aa"}
                _hover={{ bg: "#0a66c2" }}
                borderRadius="13px"
              >
                Get started
              </Button>
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                borderRadius="13px"
              >
                How It Works
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
            />
            <Box
              position={"relative"}
              height={"300px"}
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <Image
                alt={"Hero Image"}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={"100%"}
                src={
                  'https://media.istockphoto.com/id/1262600344/vector/symbol-of-teamwork-cooperation-partnership.jpg?s=612x612&w=0&k=20&c=uE7y0XBX3rPtxUE6b7RxXcKHJvG_3bBhpb28B0ky-S8='
                }
              />
            </Box>
          </Flex>
        </Stack>

      </Container>
      <IconAnimation />
      <Box p={4}>
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Services We Offer
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          There is a wide range of activities that can be performed on the website but, listing some which are most used.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={7} justify="center">
          <Card
            heading={'Manage Events'}
            icon={<Icon as={FcGraduationCap
          } w={10} h={10} />}
            description={'As an Organization you can manage and create events on the platform and promote them too.'}
            href={'/events'}
          />
          <Card
            heading={'Report an Issue'}
            icon={<Icon as={FcExpired} w={10} h={10} />}
            description={"You can report issues in your campus or any other place, for NPO's to help the situation. "}
            href={'/ask/help'}
          />
          <Card
            heading={'Donations'}
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={'You can donate to non-profit organisation via our platform'}
            href={'/organisations'}
          />
          <Card
            heading={'Support'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={'You can actively reach out to the support team via clicking the chat button.'}
            href={''}
          />
          <Card
            heading={'FAQ'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Visit our FAQ Page to know more! Many of your questions are answered there!'}
            href={'/faq'}
          />
        </Flex>
      </Container>
    </Box>
    </div>
  );
}


const IconAnimation = () => {
  return (
    <div style={{ animation: "bounce 2s infinite" }}>
      <FaChevronDown size="40" color="#0959aa" />
    </div>
  );
};

const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={{ position: "absolute", bottom: 0, left: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="rgba(220, 237, 255, 1)"
      />
    </Icon>
  );
};



const Card = ({ heading, description, icon, href }) => {
  const navigate = useNavigate();
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
      _hover={{
        bg: "#55a6f610",
        cursor:"pointer"
      }}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'blue'} size={'sm'} onClick={()=>{navigate(href)}}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};
