import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip, IconButton } from "@mui/material";
import { useTheme } from "@emotion/react";
import UserWidget from "scenes/widgets/UserWidget";
import MyActivityWidget from "scenes/widgets/MyActivityWidget";
import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  PersonAddDisabledOutlined,
} from "@mui/icons-material";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

const steps = [
  "Add Friends and Join Activities",
  "Edit your profile",
  "Create An Activity",
];

const HorizontalLinearStepper = ({ userId, picturePath }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleStep = (step) => {
    if (step === 0) {
      return (
        <Typography
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          You can add / remove friends with following buttons:
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              title="hi"
              sx={{ backgroundColor: primaryLight, p: "0.6rem", m: 2 }}
            >
              <Tooltip title="add">
                <PersonAddOutlined sx={{ color: primaryDark }} />
              </Tooltip>
            </IconButton>
            <IconButton
              sx={{ backgroundColor: primaryLight, p: "0.6rem", m: 2 }}
            >
              <Tooltip title="remove">
                <PersonRemoveOutlined sx={{ color: primaryDark }} />
              </Tooltip>
            </IconButton>
            <IconButton
              sx={{ backgroundColor: primaryLight, p: "0.6rem", m: 2 }}
            >
              <Tooltip title="cancel">
                <PersonAddDisabledOutlined sx={{ color: primaryDark }} />
              </Tooltip>
            </IconButton>
          </Box>
          You can join / leave a activity with following buttons:
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              title="hi"
              sx={{ backgroundColor: primaryLight, p: "0.6rem", m: 2 }}
            >
              <Tooltip title="join">
                <GroupAddIcon sx={{ color: primaryDark, fontSize: "1.2em" }} />
              </Tooltip>
            </IconButton>
            <IconButton
              sx={{ backgroundColor: primaryLight, p: "0.6rem", m: 2 }}
            >
              <Tooltip title="cancel">
                <GroupRemoveIcon
                  sx={{ color: "rgb(255, 0, 0,0.7)", fontSize: "1.2em" }}
                />
              </Tooltip>
            </IconButton>
          </Box>
        </Typography>
      );
    }

    if (step === 1) {
      return (
        <Typography
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          You can edit your profile here, or later on the left hand side
          <UserWidget userId={userId} picturePath={picturePath}></UserWidget>
        </Typography>
      );
    }
    if (step === 2) {
      return (
        <Typography
          sx={{
            display: "flex",

            flexDirection: "column",
          }}
        >
          Now, create your first activity!
          <MyActivityWidget picturePath={picturePath}></MyActivityWidget>
        </Typography>
      );
    }
    return <></>;
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
            Enjoy!
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            {handleStep(activeStep)}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default HorizontalLinearStepper;
