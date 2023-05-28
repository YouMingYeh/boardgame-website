import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import GroupsIcon from '@mui/icons-material/Groups';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Tooltip,
  MenuItem,
  Button,
  Menu,
  Modal,
  TextField
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivity, setParticipation } from "state";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
// import { FacebookShareButton, FacebookIcon } from 'react-share'
import Fab from "@mui/material/Fab";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import EditIcon from '@mui/icons-material/Edit';
import EditModalWidget from "./components/EditModalWidget";
import LoadingPage from "../../components/LoadingPage";
import DeletedActivities from "./DeletedActivitiesWidget";
import {useCallback} from 'react'
import api from '../../../src/connection'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function verifyImage(image_url) {
  const verification = image_url.substring(0, 5);
  if (verification === "https") {
    return image_url;
  }
  var http = new XMLHttpRequest();
  http.open("HEAD", `${api}/assets/${image_url}`, false);
  http.send();
  if (http.status !== 404) {
    return `${api}/assets/${image_url}`;
  }
}

const ActivityWidget = ({
  activityId,
  activityUserId,
  name,
  description,
  // participants,
  department,
  picturePath,
  userPicturePath,
  join,
  comments,
  tags,
  date,
  friendOnly,
  heading,
  limit,
  editOpen,
  setEditOpen,
  deleted
}) => {
  const shareURL = "http://localhost:3000/home";

  const [isComments, setIsComments] = useState(false);
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const participation = useSelector((state) => state.user.participation)
  const isJoined = Boolean(join[loggedInUserId]);
  const joinCount = Object.keys(join).length;
  const [image, setImage] = useState(null)
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const [change, setChange] = useState({
    _id: activityId,
    host: activityUserId,
    name: name,
    description: description,
    department: department,
    picturePath: picturePath,
    userPicturePath: userPicturePath,
    join: join,
    comments: comments,
    tags: tags,
    date: date,
    friendOnly: friendOnly,
    heading: heading,
    limit: limit,
    deleted: deleted,
  });
  // edit activity 


  const patchActivity = useCallback(async () => {

    var body
    if(image){
      body = JSON.stringify({ activity: {...change, picturePath: image.name},  picture: image})
    }
    else{
      body = JSON.stringify({activity: change})
    }
    

    const response = await fetch(
      `${api}/activities/${activityId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: body
      }
    );
    const updatedActivity = await response.json();
    dispatch(setActivity({ activity: updatedActivity }));
    console.log(updatedActivity);
    setLoad(true);
  });

  // for menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const patchJoin = useCallback(async () => {
    
    const response = await fetch(
      `${api}/activities/${activityId}/join`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    const updatedActivity = await response.json();
    // console.log(updatedActivity)
    dispatch(setActivity({ activity: updatedActivity }));

    setLoad(true);
    });

  const getUser = useCallback(async (id) => {
    // console.log("get user");
    // console.log(JSON.stringify({ userId: loggedInUserId }))
    const response = await fetch(`${api}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const user = await response.json();
    return user;
  });

  const [path, setPath] = useState([]);
  const [participants, setParticipants] = useState([]);

  const getPath = useCallback(async () => {
    
    let arr = Object.keys(join);
    let participants_path = [];
    let participants_inform = [];
    await Promise.all(
      arr.map(async (p) => {
        let u = await getUser(p);
        participants_path.push(u.picturePath);
        participants_inform.push(u);
      })
    );

    let user = await getUser(loggedInUserId)
    const p = user.participation
    dispatch(setParticipation({ participation: p }))
    setPath(participants_path);
    setParticipants(participants_inform);
  });

  useEffect(() => {
    if (load === true) {
      getPath();
    }
  }, [load,join, change]);

  useEffect(() => {
    getPath();
  }, []);

  const D = new Date(date);

  const type = friendOnly ? "Friend only" : "Public";
  
  return (
    <WidgetWrapper sx={{ boxShadow: 1, my: "15px" }}>
      <Friend
        friendId={activityUserId}
        name={name}
        subtitle={department + " / " + D.toDateString() + " / " + type}
        userPicturePath={userPicturePath}
      />
      <Divider sx={{ m: 1 }} />
      <FlexBetween>
        <Typography variant="h2" sx={{ my: 1 }}>
          {heading}
        </Typography>
        {activityUserId === loggedInUserId &&
          <Tooltip title='edit'>
            <IconButton onClick={() => {
              setEditOpen(activityId)
            }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        }

        <Modal
          open={editOpen === activityId}
          onClose={() => {
            patchActivity();
            setEditOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <EditModalWidget change={change} setChange={setChange} image={image} setImage={setImage}/>
          </Box>
        </Modal>
      </FlexBetween>

      {/* <Divider sx={{ m: 2 }}></Divider> */}

      <br></br>
      <Typography color={main} sx={{ mt: "1rem" }} variant="h3">
        {description}
      </Typography>
      <br></br>

      {picturePath && (
        <img
          width="90%"
          height="auto"
          alt="post"
          style={{
            borderRadius: "0.75rem",
            margin: "auto",
            marginBlock: "0.1rem",
            display: "block",
            marginBottom: "1rem",
          }}
          src={`${api}/assets/${picturePath}`}
        />
      )}

      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {tags &&
          tags.map(
            (tag) =>
              tag.length > 0 && (
                <Chip
                  key={tag}
                  sx={{ m: 0.5, fontWeight: 550, fontSize: 14 }}
                  label={tag}
                ></Chip>
              )
          )}
      </Stack>

      <Divider sx={{ m: "1rem" }} />

      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <GroupsIcon sx={{ fontSize: "1.5rem" }}></GroupsIcon>
            <Typography>
              {joinCount} / {limit}
            </Typography>
          </FlexBetween>

          {participants && participants.length > 0 ? <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <AvatarGroup
                max={5}
                sx={{
                  "& .MuiAvatar-root": { width: 30, height: 30 },
                }}
              >
                {path.map((p, i) => {
                  return (
                    <Avatar
                      key={p + i}
                      sx={{ width: 30, height: 30 }}
                      src={p && verifyImage(p)}
                    />
                  );
                })}
              </AvatarGroup>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {participants.map((friend, i) => (
                <Typography
                  key={"menu" + i+i}
                  sx={{ px: "0.6rem", py: "0.2rem" }}
                >
                  <Friend
                    key={"menu" + i}
                    friendId={friend._id}
                    name={`${friend.firstName} ${friend.lastName}`}
                    subtitle={friend.department}
                    userPicturePath={friend.picturePath}
                    small={true}
                  />
                </Typography>
              ))}
            </Menu>
          </div>
            :
            <></>}
        </FlexBetween>

        {/* <FacebookShareButton url={shareURL}>
            <FacebookIcon size={40} ></FacebookIcon>
          </FacebookShareButton> */}
        {/* <Button
          disabled={!post || heading === ""}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button> */}

        {isJoined ? (
          <Button onClick={patchJoin} sx={{
            color: palette.background.alt,
            backgroundColor: "rgb(242, 84, 84 )",
            borderRadius: "1rem",
          }}>
            Cancel
          </Button>
        ) : joinCount >= limit ? (
          <Button onClick={patchJoin}
            disabled={true}
            sx={{
              color: 'grey',
              backgroundColor: 'Grey',
              borderRadius: "1rem",
            }}>
            Join
          </Button>
        ) : (
          <Button onClick={patchJoin}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "1rem",
            }}>
            Join
          </Button>
        )}

      </FlexBetween>
    </WidgetWrapper>
  );
};

export default ActivityWidget;
