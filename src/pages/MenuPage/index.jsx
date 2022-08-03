import React from "react";
import MenuWrapper from "../../components/MenuWrapper";
import SideBar from "../../components/SideBar";
import { Box, Skeleton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getUserDetails, getGuilds } from "../../utils/api";
import { useDocTitle } from "../../utils/customHooks";

function MenuPage(props) {
  const navigate = useNavigate();
  const [doctitle, setDocTitle] = useDocTitle("Guilds");
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [guilds, setGuilds] = React.useState({});

  React.useEffect(() => {
    getUserDetails()
      .then(({ data }) => {
        // console.log(data);
        setUser(data);
        return getGuilds();
      })
      .then(({ data }) => {
        // console.log(data);
        setLoading(false);
        setGuilds(data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
        setLoading(false);
      });
    console.log("meatloaf");
  }, []);

  return (
    <SideBar
      children={
        loading ? (
          <Skeleton>
            <Box minH="xl" />
          </Skeleton>
        ) : (
          <MenuWrapper guilds={guilds} />
        )
      }
      user={user}
    />
  );
}

export default MenuPage;
