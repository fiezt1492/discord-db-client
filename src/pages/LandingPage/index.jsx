import React from "react";
import SideBar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../utils/api";
import { useDocTitle } from "../../utils/customHooks";

function LandingPage(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [doctitle, setDocTitle] = useDocTitle("Home");

  React.useEffect(() => {
    getUserDetails()
      .then(({ data }) => {
        navigate("/guilds");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    console.log("It Lands Here");
  }, []);

  return <SideBar />;
}

export default LandingPage;
