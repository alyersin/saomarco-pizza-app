"use client";
import { Box, SimpleGrid, Button, Flex, Text } from "@chakra-ui/react";
import "../../app/globals.css";
import pizza from "../../pizza.json";
import salate from "../../salate.json";
import burgerAndWraps from "../../burgerAndWraps.json";
import paste from "../../paste.json";
import bauturi from "../../bauturi.json";
import desert from "../../desert.json";
import sandwich from "../../sandwich.json";
import Card from "../../components/Card/Card";
import { useEffect, useState } from "react";

export default function RandomItems() {
  const [randomItems, setRandomItems] = useState([]);
  const [secondGrid, setSecondGrid] = useState([]);
  const [thirdGrid, setThirdGrid] = useState([]);

  const getRandItem = (array) =>
    array[Math.floor(Math.random() * array.length)];

  const updateRandomItems = () => {
    const firstGrid = [
      getRandItem(pizza),
      getRandItem(salate),
      getRandItem(burgerAndWraps),
      getRandItem(paste),
    ];
    setRandomItems(firstGrid);

    const allItems = [
      ...pizza,
      ...salate,
      ...burgerAndWraps,
      ...paste,
      ...bauturi,
      ...desert,
      ...sandwich,
    ];

    const uniqueSecondGrid = new Set();
    while (uniqueSecondGrid.size < 8) {
      uniqueSecondGrid.add(getRandItem(allItems));
    }
    setSecondGrid(Array.from(uniqueSecondGrid));

    const uniqueThirdGrid = new Set();
    while (uniqueThirdGrid.size < 8) {
      uniqueThirdGrid.add(getRandItem(allItems));
    }
    setThirdGrid(Array.from(uniqueThirdGrid));
  };

  useEffect(() => {
    updateRandomItems();

    const intervalId = setInterval(() => {
      updateRandomItems();
    }, 3600000);

    return () => clearInterval(intervalId);
  }, []);

  const isBtnDisabled = (item) => {
    return (
      bauturi.some((bautura) => bautura.id === item.id) ||
      desert.some((desertItem) => desertItem.id === item.id)
    );
  };

  const cardStyles = {
    width: { base: "100%", sm: "200px", md: "240px" },
    height: { base: "auto", sm: "500px", md: "560px" },
    padding: { base: 6, sm: 4 },
    margin: "auto",
  };

  return (
    <Box
      className="borderGreen"
      maxW="1280px"
      mx="auto"
      px={{ base: 0, md: 30 }}
    >
      {/* 1ST GRID */}
      <SimpleGrid
        // className="borderBlue"
        columns={{ base: 1, sm: 2, md: 4, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        pt={{ base: 5, md: 0 }}
        pb={{ base: 4, md: 7 }}
        pl={{ base: 4, md: 6 }}
        pr={{ base: 4, md: 6 }}
      >
        {randomItems.map((item) => (
          <Card
            key={item.id}
            item={item}
            width={cardStyles.width}
            height={cardStyles.height}
            p={cardStyles.padding}
            m={cardStyles.margin}
            isDisabled={isBtnDisabled(item)}
          />
        ))}
      </SimpleGrid>

      {/* BANNER */}
      <Box
        className="borderRed"
        display="flex"
        justifyContent="center"
        width="auto"
        mx={{ base: 4, lg: "auto" }}
        pb={{ base: 4, md: 6 }}
        px={{ base: 4, md: 0 }}
      >
        <Flex
          className="borderGreen"
          bg="black"
          color="white"
          justify="space-between"
          align="center"
          width="100%"
          p={{ base: 4, md: 6 }}
          mt={{ base: 2, md: 4 }}
          mx="4"
          borderRadius="md"
          flexWrap="wrap"
        >
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            mb={{ base: 2, md: 0 }}
          >
            YOU WANNA PIZZA SOMEONE? STIM NOI UN RESTAURANT COOL
          </Text>
          <Button
            as="a"
            href="#"
            bg="gray.300"
            color="black"
            fontSize={{ base: "sm", md: "md" }}
            fontWeight="bold"
            px={{ base: 6, md: 8 }}
            py={{ base: 3, md: 4 }}
            rightIcon={
              <Text
                as="span"
                fontSize={{ base: "lg", md: "xl" }}
                color="red.500"
              >
                ➤
              </Text>
            }
            _hover={{ bg: "gray.400" }}
          >
            VEZI
          </Button>
        </Flex>
      </Box>

      {/* 2ND GRID */}
      <SimpleGrid
        className="borderBlue"
        columns={{ base: 1, sm: 2, md: 4, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        p={{ base: 4, md: 6 }}
      >
        {secondGrid.map((item) => (
          <Card
            key={item.id}
            item={item}
            width={cardStyles.width}
            height={cardStyles.height}
            p={cardStyles.padding}
            m={cardStyles.margin}
            isDisabled={isBtnDisabled(item)}
          />
        ))}
      </SimpleGrid>

      {/* 3RD GRID */}
      <SimpleGrid
        className="borderBlue"
        columns={{ base: 1, sm: 2, md: 4, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        p={{ base: 4, md: 6 }}
      >
        {thirdGrid.map((item) => (
          <Card
            key={item.id}
            item={item}
            width={cardStyles.width}
            height={cardStyles.height}
            p={cardStyles.padding}
            m={cardStyles.margin}
            isDisabled={isBtnDisabled(item)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
