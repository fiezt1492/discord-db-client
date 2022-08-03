import {
  Heading,
  Avatar,
  Box,
  Center,
  Flex,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function GuildCard({ data, invite }) {
  return (
    <Center py={6}>
      <Box
        w="xs"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Flex justify={"center"} mt={6}>
          <Avatar
            h={"128px"}
            w={"128px"}
            size={"xl"}
            src={`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png`}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack align={"center"}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {data.name}
            </Heading>
          </Stack>
          <Link
            to={`${
              invite
                ? `https://top.gg/bot/853623967180259369/invite`
                : `/guilds/${data.id}`
            }`}
          >
            <Button
              w={"full"}
              mt={6}
              bg={useColorModeValue("#151f21", "gray.900")}
              color={"white"}
              rounded={"md"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              {invite ? "Invite" : "Dashboard"}
            </Button>
          </Link>
        </Box>
      </Box>
    </Center>
  );
}
