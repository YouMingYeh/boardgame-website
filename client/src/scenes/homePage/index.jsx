import { Box, Divider, Toolbar, useMediaQuery, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import InvitationWidget from "scenes/widgets/InvitationsWidget";
import MyActivityWidget from "scenes/widgets/MyActivityWidget";
import ActivitiesWidget from "scenes/widgets/ActivitiesWidget";
import ParticipationWidget from "scenes/widgets/ParticipationWidget";
import LoadingPage from "components/LoadingPage";
import { useState, useEffect } from 'react'
import api from '../../../src/connection'

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(true);
  // useEffect(() => {
  //   setTimeout(function () {
      
  //     setIsFetching(false); 
  //   }, 500);
  // }, []);
  

  return (
    <Box>
      <Navbar userId={_id} picturePath={picturePath} />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
        sx={{ my: 8 }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
          <Divider sx={{ m: 1 }}></Divider>
          <ParticipationWidget userId={_id}></ParticipationWidget>
        </Box>

        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyActivityWidget picturePath={picturePath} />

          <ActivitiesWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          
          <Box flexBasis="26%">
            <InvitationWidget userId={_id} />
            <Divider sx={{ m: 1 }}></Divider>
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
