import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Photo from "../assets/FAQ.png"

function FAQ() {
  return (
    <>
    <div style={{ display: "flex", justifyContent: "center", alignItems:"center", flexDirection: "column", flex:"1",paddingTop:"2vmax"}}>
  <Text fontSize='4vmax' align={"center"} fontWeight="900">Frequently Asked Questions</Text>
  <br /><br />
      <Accordion allowToggle style={{ width: "75%", fontSize:"1rem", borderRadius:"20px"}}>

        <AccordionItem borderTop="2px solid #0a66c275" borderRadius="10px">
          <h2>
            <AccordionButton borderRadius="10px">
              <Box as="span" flex="1" textAlign="left" style={{ fontSize:"1.15rem" }}>
                What payment methods are accepted for donations?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ fontWeight:"bold" }}>
            We accept a variety of payment methods, including credit/debit cards
            and bank transfers. Select your preferred payment option during the
            donation process.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTop="2px solid #0a66c275" borderRadius="10px">
          <h2>
            <AccordionButton borderRadius="10px">
              <Box as="span" flex="1" textAlign="left" style={{ fontSize:"1.15rem" }}>
                How can my organization register on this platform?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ fontWeight:"bold" }}>
            Your organization can register on our platform by completing the
            registration form available on our website. Provide necessary
            information about your organization and its mission to create a
            profile.
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem borderTop="2px solid #0a66c275" borderRadius="10px">
          <h2>
            <AccordionButton borderRadius="10px">
              <Box as="span" flex="1" textAlign="left" style={{ fontSize:"1.15rem" }}>
                Is there a fee for organizations to register on the platform?
              </Box>
              <AccordionIcon />
            </AccordionButton >
          </h2>
          <AccordionPanel pb={4} style={{ fontWeight:"bold" }}>
            No, there is no fee for nonprofit organizations to register on our
            platform. We believe in supporting nonprofit initiatives without
            imposing financial barriers.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem borderTop="2px solid #0a66c275" borderRadius="10px">
          <h2>
            <AccordionButton borderRadius="10px" >
              <Box as="span" flex="1" textAlign="left" style={{ fontSize:"1.15rem", borderRadius:"20px" }}>
                How can I donate to nonprofit organizations through this
                platform?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ fontWeight:"bold",  borderRadius:"20px" }}>
            You can donate to nonprofit organizations by visiting their profiles
            on our platform and selecting the "Donate" option. Follow the
            instructions to complete your donation securely.
          </AccordionPanel>
        </AccordionItem >
        <AccordionItem borderTop="2px solid #0a66c275" borderRadius="10px" borderBottom="3px solid #0a66c275">
          <h2>
            <AccordionButton borderRadius="10px">
              <Box as="span" flex="1" textAlign="left" style={{ fontSize:"1.15rem" }}>
                Can I choose which nonprofit organization my donation goes to?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4} style={{ fontWeight:"bold" }}>
            Absolutely! You have the freedom to browse through various nonprofit
            organizations listed on our platform and choose which one(s) you'd
            like to support with your donation.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <br /><br />
      <img src={Photo} alt="" width="400px"/>
    </div>
    </>
  );
}

export default FAQ;
