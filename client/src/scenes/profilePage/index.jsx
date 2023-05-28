import { Backdrop, Box, useMediaQuery } from "@mui/material";
import { useEffect, useState,useCallback } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyActivityWidget from "scenes/widgets/MyActivityWidget";
import ActivitiesWidget from "scenes/widgets/ActivitiesWidget";
import UserWidget from "scenes/widgets/UserWidget";
import CircularProgress from '@mui/material/CircularProgress';
import LoadingPage from "components/LoadingPage";
import DeletedActivities from "scenes/widgets/DeletedActivitiesWidget";
import api from '../../../src/connection'
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id } = useSelector((state) => state.user);
  const [isFetching, setIsFetching] = useState(true);

  const getUser = useCallback(async () => {
    const response = await fetch(`${api}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    
  });

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   setTimeout(function () {
      
  //     setIsFetching(false); 
  //   }, 1500);
  // }, []);

  
  

  
  return (
    <Box>
      <Navbar />
      
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
        sx={{ mt: "30px" }}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <Box m="2rem 0" />
          <UserWidget
            profileId={userId}
            picturePath={user.picturePath}
            userId={_id}
          />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "0rem"}
        >
          {/* <MyActivityWidget picturePath={user.picturePath} /> */}
          <Box m="2rem 0" />
          <ActivitiesWidget profileId={userId} isProfile userId={_id} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          
          <Box m="2rem 0" />
          {
            userId === _id &&
            <DeletedActivities userId={_id}></DeletedActivities>
          }
        </Box>
        
      </Box>
      
    </Box>
  );
};

export default ProfilePage;
