import GuildCard from "./GuildCard";
import { Wrap, WrapItem, Spinner } from "@chakra-ui/react";

function MenuWrapper({ guilds }) {
  return (
    <Wrap spacing="30px" justify="center">
      {
        guilds.included.map((guild) => (
          <WrapItem>
            <GuildCard data={guild} />
          </WrapItem>
        ))}
      {
        guilds.excluded.map((guild) => (
          <WrapItem>
            <GuildCard data={guild} invite={true} />
          </WrapItem>
        ))}
    </Wrap>
  );
}

export default MenuWrapper;
