import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  TextField,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Modal
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState , useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "state";
import { light } from "@mui/material/styles/createPalette";
import dayjs from "dayjs";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import api from '../../../src/connection'

const MyActivityWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  let day = new Date();
  const [value, setValue] = useState(dayjs(day));
  const [tags, setTags] = useState([]);
  const [tagSent, setTagSent] = useState("");
  const [defaultTags, setDefaultTags] = useState([
    "sports",
    "meeting",
    "music",
    "exhibition",
    "food",
    "game",
  ]);
  const [friendOnly, setFriendOnly] = useState(false);
  const [heading, setHeading] = useState("");
  const [limit, setLimit] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const handlePost = useCallback(async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    formData.append("tags", tags);
    formData.append("date", value.toDate());
    formData.append("friendOnly", friendOnly);
    formData.append("heading", heading);
    formData.append("limit", limit);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${api}/activities`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const activities = await response.json();
    dispatch(setActivities({ activities }));
    setImage(null);
    setPost("");
    setEditOpen(false)
  });

  return (
    <WidgetWrapper sx={{ boxShadow: 1 }}>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <Button
          onClick={() => { setEditOpen(!editOpen) }}
          sx={{
            width: "100%",
            heitgh: "200%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        >
          <InputBase
            placeholder="Create an activity..."
            value={post}
            sx={{
              width: "100%",
              height: "100%",
              cursor: "text"
            }}
            disabled={true}
          />
        </Button>
        <Modal
          open={editOpen}
          onClose={() => {
            // patchActivity();
            setEditOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box style={style}>
            <WidgetWrapper sx={{ boxShadow: 1 }}>
              <FlexBetween gap="1.5rem">
                <TextField
                  id="outlined-basic"
                  label="Activity Name"
                  value={heading}
                  variant="outlined"
                  onChange={(e) => {
                    setHeading(e.target.value);
                  }}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    inputFormat="YYYY/MM/DD hh:mm a"
                    // mask="____/__/__ __:__ _M"
                    minDateTime={dayjs(day)}
                  />
                </LocalizationProvider>
              </FlexBetween>
              <br></br>
              <InputBase
                placeholder="Description..."
                onChange={(e) => setPost(e.target.value)}
                value={post}
                sx={{
                  width: "100%",
                  backgroundColor: palette.neutral.light,
                  borderRadius: "2rem",
                  padding: "1rem 2rem",
                }}
              />

              <br />
              <br />
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Tags</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="row" justifyContent="center">
                    {defaultTags.map((tag, i) => {
                      return (
                        <Chip
                          key={tag + i}
                          sx={{ m: 0.5, fontWeight: 550, fontSize: 14 }}
                          label={tag}
                          onClick={() => {
                            setTags((prev) => {
                              return [...prev, tag];
                            });
                            setDefaultTags((prev) => {
                              let newTags = [];
                              prev.forEach((t) => {
                                if (t !== tag) {
                                  newTags.push(t);
                                }
                              });
                              return newTags;
                            });
                          }}
                        ></Chip>
                      );
                    })}
                  </Stack>
                  <br></br>
                  <FlexBetween>
                    <TextField
                      id="outlined-basic"
                      size="small"
                      label="others"
                      value={tagSent}
                      variant="outlined"
                      onChange={(key) => {
                        setTagSent(key.target.value);
                      }}
                    />
                    <Button
                      disabled={!tagSent}
                      onClick={() => {
                        setTags((prev) => {
                          return [...prev, tagSent];
                        });
                        setTagSent("");
                      }}
                      sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                      }}
                    >
                      Add Tag
                    </Button>
                  </FlexBetween>
                </AccordionDetails>
              </Accordion>

              <Stack direction="row" justifyContent="center" sx={{ flexWrap: "wrap" }}>
                {tags.map((tag) => {
                  return (
                    <Chip
                      key={tag}
                      sx={{ m: 0.5, fontWeight: 550, fontSize: 14 }}
                      label={tag}
                      onDelete={() => {
                        setTags((prev) => {
                          let newTags = [];
                          prev.forEach((t) => {
                            if (t !== tag) {
                              newTags.push(t);
                            }
                          });
                          return newTags;
                        });

                        setDefaultTags((prev) => {
                          let origin = [
                            "sports",
                            "meeting",
                            "music",
                            "exhibition",
                            "food",
                            "game",
                          ];

                          if (origin.includes(tag)) {
                            return [...prev, tag];
                          }
                          return prev;
                        });
                      }}
                    ></Chip>
                  );
                })}
              </Stack>


              {isImage && (
                <Box
                  border={`1px solid ${medium}`}
                  borderRadius="5px"
                  mt="1rem"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <FlexBetween>
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          width="100%"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!image ? (
                            <p>Add Image Here</p>
                          ) : (
                            <FlexBetween>
                              <Typography>{image.name}</Typography>
                              <EditOutlined />
                            </FlexBetween>
                          )}
                        </Box>
                        {image && (
                          <IconButton
                            onClick={() => setImage(null)}
                            sx={{ width: "15%" }}
                          >
                            <DeleteOutlined />
                          </IconButton>
                        )}
                      </FlexBetween>
                    )}
                  </Dropzone>
                </Box>
              )}

              <Divider sx={{ margin: "1.25rem 0" }}></Divider>

              <FlexBetween>
                <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                  <ImageOutlined sx={{ color: mediumMain }} />
                  <Typography
                    color={mediumMain}
                    sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                  >
                    Image
                  </Typography>
                </FlexBetween>

                {isNonMobileScreens ? (
                  <>
                    <TextField
                      id="outlined-basic"
                      label="Participants Limit"
                      value={limit}
                      variant="outlined"
                      size="small"
                      onChange={(e) => {
                        setLimit(e.target.value);
                      }}
                    />
                  </>
                ) : (
                  <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{ color: mediumMain }} />
                  </FlexBetween>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={friendOnly}
                      onChange={(ev) => {
                        setFriendOnly(ev.target.checked);
                      }}
                    />
                  }
                  label="Friend Only?"
                />

                <Button
                  disabled={!post || heading === ""}
                  onClick={handlePost}
                  sx={{
                    color: palette.background.alt,
                    backgroundColor: palette.primary.main,
                    borderRadius: "3rem",
                  }}
                >
                  POST
                </Button>
              </FlexBetween>
            </WidgetWrapper>
          </Box >
        </Modal >
      </FlexBetween >
    </WidgetWrapper >
  );
};

export default MyActivityWidget;
