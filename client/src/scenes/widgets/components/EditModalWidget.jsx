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
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "state";
import { light } from "@mui/material/styles/createPalette";
import dayjs from "dayjs";
import DeleteAlert from './DeleteAlert' 
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const EditModalWidget = ({ change, setChange, image, setImage }) => {
  const [isImage, setIsImage] = useState(false);
  
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;
  const [tagSent, setTagSent] = useState("");
  let day = new Date();

  return (
    <WidgetWrapper sx={{ boxShadow: 1 }}>
      <FlexBetween gap="1.5rem">
        <TextField
          id="outlined-basic"
          label="Activity Name"
          value={change.heading}
          variant="outlined"
          onChange={(key) => {
            let obj = { heading: key.target.value }
            setChange((prev) => ({ ...prev, ...obj }));
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="Date"
            value={dayjs(change.date)}
            onChange={(newValue) => {
              let obj = { date: newValue.toDate() }
              setChange((prev) => ({ ...prev, ...obj }));
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
        onChange={(e) => {
          let obj = { description: e.target.value }
          setChange((prev) => ({ ...prev, ...obj }));
        }}
        value={change.description}
        sx={{
          width: "100%",
          backgroundColor: palette.neutral.light,
          borderRadius: "2rem",
          padding: "1rem 2rem",
        }}
      />

      <br />
      <br />
      <Stack direction="row" justifyContent="center" sx={{ flexWrap: "wrap" }}>
        {change.tags.map((tag, i) => {
          if (tag === '') return <div key={i}></div>
          return (
            <Chip
              key={tag+i}
              sx={{ m: 0.5, fontWeight: 550, fontSize: 14 }}
              label={tag}
              onDelete={() => {
                setChange((prev) => {
                  let newTags = [];
                  prev.tags.forEach((t) => {
                    if (t !== tag) {
                      newTags.push(t);
                    }
                  })
                  let obj = { tags: newTags }
                  return { ...prev, ...obj }
                })
              }}
            ></Chip>
          );
        })}
      </Stack>

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
                setChange((prev) => {

                  let obj = { tags: [...change.tags, tagSent] }
                  // console.log(obj)
                  return { ...prev, ...obj }
                })
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
              value={change.limit}
              variant="outlined"
              size="small"
              onChange={(e) => {
                let obj = { limit: e.target.value }
                setChange((prev) => ({
                  ...prev, ...obj
                }))
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
              checked={change.friendOnly}
              onChange={(ev) => {
                let obj = { friendOnly: ev.target.checked }
                setChange((prev) => ({ ...prev, ...obj }))
              }}
            />
          }
          label="Friend Only?"
        />

        {/* <Button
            disabled={!post || heading === ""}
            onClick={handleSummit}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
            }}
          >
            POST
          </Button> */}
          <DeleteAlert change={change} setChange={setChange}></DeleteAlert>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default EditModalWidget;
