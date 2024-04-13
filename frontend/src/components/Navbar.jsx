import React, { useContext } from "react";
import Logo from "../assets/Logo.png";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { AppContext } from "./Context";
import { deleteCookie } from "../utils/cookie";

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { login, setLogin } = useContext(AppContext);

  const logout = () => {
    deleteCookie("type");
    deleteCookie("username");
    deleteCookie("orgname");
    deleteCookie("auth-token");
    location.reload();
  };
  const renderLoginBtns = () => {
    if (!login) {
      return (
        <>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"md"}
            fontWeight={800}
            color="#0959aa"
            borderRadius="10px"
            bg="transparent"
            href={"/user/login"}
            _hover={{
              bg: "#55a6f630",
            }}
          >
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"md"}
            fontWeight={800}
            color={"white"}
            bg="#0959aa"
            borderRadius="10px"
            href={"/user/signup"}
            _hover={{
              bg: "#0a66c2",
            }}
          >
            Sign Up
          </Button>
        </>
      );
    } else {
      return (
        <Button
          as={"a"}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={"md"}
          fontWeight={800}
          color="#0959aa"
          borderRadius="10px"
          bg="transparent"
          onClick={logout}
          cursor={"pointer"}
          _hover={{
            bg: "#55a6f630",
          }}
        >
          Log out
        </Button>
      );
    }
  };

  return (
    <Box position="sticky" top="0" zIndex="99">
      <Flex
        bg="#ffffff90"
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderRadius="20px"
        backdropFilter="blur(10px)"
        width="80vw"
        margin="3vmin auto" // Adjusted margin to "auto"
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        boxShadow="0 0 1px rgba(85, 166, 246, 0.3), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)"
        justifyContent={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon w={3} h={3} color="#0959aa" />
              ) : (
                <HamburgerIcon w={5} h={5} color="#0959aa" />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <a href="/">
            <img
              src={Logo}
              alt=""
              width="120px"
              style={{ maxWidth: "200px" }}
            />
          </a>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {renderLoginBtns()}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Button
                as={"a"}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"md"}
                fontWeight={600}
                color="black"
                borderRadius="15px"
                bg="transparent"
                href={navItem.href}
                _hover={{
                  bg: "#55a6f630",
                }}
              >
                {navItem.label}
              </Button>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  const { login, setLogin } = useContext(AppContext);
  const logout = () => {
    deleteCookie("type");
    deleteCookie("username");
    deleteCookie("orgname");
    deleteCookie("auth-token");
    location.reload();
  };
  const renderLoginBtnMobile = () => {
    if (!login) {
      return (
        <>
          <MobileNavItem label="Sign In" href="/user/login" />
          <MobileNavItem label="Sign Up" href="/user/signup" />
        </>
      );
    } else {
      return <MobileNavItem label="Log out" onClick={logout} />;
    }
  };
  return (
    <Stack
      bg="rgba(203, 229, 255, 80%)"
      p={4}
      display={{ md: "none" }}
      borderRadius="20px"
      margin="10px"
      boxShadow="0px 0px 4px rgba(0, 0, 0, 0.3)"
      border="1px solid #0959aa50"
      backdropFilter="blur(5px)"
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {renderLoginBtnMobile()}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle} align="center">
      {" "}
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color="#0959aa">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box
                as="a"
                key={child.label}
                py={2}
                href={child.href}
                align="center"
              >
                {" "}
                {/* Added align="center" */}
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Register an Event",
    href: "/new/event",
  },
  {
    label: "Report",
    href: "/ask/help",
  },
  {
    label: "Organisations",
    href: "/organisations",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
];
