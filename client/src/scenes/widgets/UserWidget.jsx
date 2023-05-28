import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TextField from "@mui/material/TextField";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EmailIcon from "@mui/icons-material/Email";
import api from '../../../src/connection'
import axios from "axios";

const UserWidget = ({ userId, picturePath, profileId = null }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    Facebook: '',
    Instagram: '',
    selfIntro: '',
    department: '',
    friends: []
  });
  // const u = useSelector((state)=>state.user)
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const [editFB, setEditFB] = useState(false);
  const [editIG, setEditIG] = useState(false);
  const [editIntro, setEditIntro] = useState(false);
  const [editDP, setEditDP] = useState(false);

  const [FB, setFB] = useState("");
  const [IG, setIG] = useState("");
  const [IN, setIN] = useState("");
  const [DP, setDP] = useState("");

  const getUser = useCallback(async (id) => {
    try{
      const response = await axios.get(`${api}/users/${id}`,{
        headers: { Authorization: `Bearer ${token}` },
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      })
      
      
      const {data} = await response;
      
      setUser(data);
    }catch(e){
      
      console.log('err:', e);
    }
  });

  useEffect(() => {
    if (profileId) {
      getUser(profileId);
    } else {
      getUser(userId);
    }
  }, [FB, IG, IN, DP]);

  
  

  const patchUser = useCallback(async () => {
    
    const response = await axios.patch(`${api}/users/${userId}`,
      {
        Facebook: FB !== "" ? FB : user.Facebook,
        Instagram: IG !== "" ? IG : user.Instagram,
        selfIntro: IN !== "" ? IN : user.selfIntro,
        department: DP !== "" ? DP : user.department,
      },
      {
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
    )

    
    
    const {data} = await response;
    console.log(data);
    // setUser(updatedUser)
    setFB(data.Facebook);
    setIG(data.Instagram);
    setIN(data.selfIntro);
    setDP(data.department);
  });

  
  // if(!user) return
  

  if (profileId) {
    return (
      <WidgetWrapper>
        {/* FIRST ROW */}
        <FlexBetween
          gap="0.5rem"
          pb="1.1rem"
          onClick={() => navigate(`/profile/${profileId}`)}
        >
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} />
            <Box>
              <Typography
                variant="h4"
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography color={medium}>{user.friends.length} friends</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>

        <Divider />

        {/* SECOND ROW */}
        {/* <Box p="1rem 0">
      <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
        <LocationOnOutlined fontSize="large" sx={{ color: main }} />
        <Typography color={medium}>{location}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap="1rem">
        <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
        <Typography color={medium}>{occupation}</Typography>
      </Box>
    </Box> */}

        {/* <Divider />

    
    <Box p="1rem 0">
      <FlexBetween mb="0.5rem">
        <Typography color={medium}>Who's viewed your profile</Typography>
        <Typography color={main} fontWeight="500">
          {viewedProfile}
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={medium}>Impressions of your post</Typography>
        <Typography color={main} fontWeight="500">
          {impressions}
        </Typography>
      </FlexBetween>
    </Box>

    <Divider /> */}

        {/* FOURTH ROW */}
        <Box p="1rem 0">
          <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
            Social Profiles
          </Typography>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <EmailIcon />
              <Box>
                <Typography color={main} fontWeight="500">
                  Email
                </Typography>
                <Typography color={medium}>{user.email}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          <FlexBetween gap="1rem" mb="0.5rem">
            <FlexBetween gap="1rem">
              <FacebookIcon />
              <Box>
                <Typography color={main} fontWeight="500">
                  Facebook
                </Typography>

                <Typography color={medium}>{user.Facebook}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <InstagramIcon />
              <Box>
                <Typography color={main} fontWeight="500">
                  Instagram
                </Typography>
                <Typography color={medium}>{user.Instagram}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <AccountBoxIcon />
              <Box>
                <Typography color={main} fontWeight="500">
                  Self Introduction
                </Typography>

                <Typography color={medium}>{user.selfIntro}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>

          <FlexBetween gap="1rem">
            <FlexBetween gap="1rem">
              <LocalLibraryIcon />
              <Box>
                <Typography color={main} fontWeight="500">
                  Department
                </Typography>

                <Typography color={medium}>{user.department}</Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
        </Box>
      </WidgetWrapper>
    );
  }

  return (
    <WidgetWrapper sx={{ boxShadow: 1 }}>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={medium}>{user.friends.length} friends</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      {/* <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box> */}

      {/* <Divider />

      
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider /> */}

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <EmailIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Email
              </Typography>
              <Typography color={medium}>{user.email}</Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem">
            <FacebookIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Facebook
              </Typography>

              {editFB ? (
                <TextField
                  id="standard-basic"
                  label="Editing"
                  variant="standard"
                  onChange={(key) => {
                    setFB(key.target.value);
                  }}
                  value={FB}
                />
              ) : (
                <Typography color={medium}>
                  {FB === "" ? user.Facebook : FB}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          <Tooltip title="edit">
            <IconButton
              onClick={async () => {
                if (editFB) {
                  await patchUser();
                }
                setEditFB(!editFB);
              }}
            >
              <EditOutlined sx={{ color: main }} />
            </IconButton>
          </Tooltip>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <InstagramIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Instagram
              </Typography>
              {editIG ? (
                <TextField
                  id="standard-basic"
                  label="Editing"
                  variant="standard"
                  onChange={(key) => {
                    setIG(key.target.value);
                  }}
                  value={IG}
                />
              ) : (
                <Typography color={medium}>
                  {IG === "" ? user.Instagram : IG}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          <Tooltip title="edit">
            <IconButton
              onClick={async () => {
                if (editIG) {
                  await patchUser();
                }
                setEditIG(!editIG);
              }}
            >
              <EditOutlined sx={{ color: main }} />
            </IconButton>
          </Tooltip>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <AccountBoxIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Self Introduction
              </Typography>

              {editIntro ? (
                <TextField
                  id="standard-basic"
                  label="Editing"
                  variant="standard"
                  onChange={(key) => {
                    setIN(key.target.value);
                  }}
                  value={IN}
                />
              ) : (
                <Typography color={medium}>
                  {IN === "" ? user.selfIntro : IN}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          <Tooltip title="edit">
            <IconButton
              onClick={async () => {
                if (editIntro) {
                  await patchUser();
                }
                setEditIntro(!editIntro);
              }}
            >
              <EditOutlined sx={{ color: main }} />
            </IconButton>
          </Tooltip>
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <LocalLibraryIcon />
            <Box>
              <Typography color={main} fontWeight="500">
                Department
              </Typography>

              {editDP ? (
                <TextField
                  id="standard-basic"
                  label="Editing"
                  variant="standard"
                  onChange={(key) => {
                    setDP(key.target.value);
                  }}
                  value={DP}
                />
              ) : (
                <Typography color={medium}>
                  {DP === "" ? user.department : DP}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          <Tooltip title="edit">
            <IconButton
              onClick={async () => {
                if (editDP) {
                  await patchUser();
                }
                setEditDP(!editDP);
              }}
            >
              <EditOutlined sx={{ color: main }} />
            </IconButton>
          </Tooltip>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
