import React, { useState } from "react";
import { Box, Flex, Text, Input, Button, VStack, HStack, Spacer, IconButton, useToast } from "@chakra-ui/react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const sendMessage = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Cannot send empty message.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setMessages([...messages, { text: inputValue, sender: "You", time: new Date().toLocaleTimeString() }]);
    setInputValue("");
  };

  return (
    <Flex direction="column" h="100vh" p={4} bg="gray.100">
      <Flex align="center" bg="blue.500" color="white" px={4} py={2} rounded="md">
        <FaUserCircle size="2rem" />
        <Text fontSize="xl" fontWeight="bold" ml={2}>
          Chat App
        </Text>
        <Spacer />
        <Button variant="ghost" onClick={() => setMessages([])}>
          Clear Chat
        </Button>
      </Flex>

      <VStack flex={1} overflowY="auto" spacing={4} mt={4} align="stretch">
        {messages.map((message, index) => (
          <HStack key={index} alignSelf={message.sender === "You" ? "flex-end" : "flex-start"}>
            <Box bg={message.sender === "You" ? "blue.500" : "gray.300"} color={message.sender === "You" ? "white" : "black"} px={4} py={2} rounded="md" maxW="70%">
              <Text>{message.text}</Text>
              <Text fontSize="xs" textAlign="right">
                {message.time}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>

      <HStack mt={4} spacing={2}>
        <Input placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendMessage()} bg="white" />
        <IconButton icon={<FaPaperPlane />} onClick={sendMessage} colorScheme="blue" aria-label="Send message" />
      </HStack>
    </Flex>
  );
};

export default Index;
