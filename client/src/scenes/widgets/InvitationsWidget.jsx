import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInvitations } from "state";

import api from '../../../src/connection'
const InvitationWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const invitations = useSelector((state) => state.user.invitations);

  const getInvitations = useCallback(async () => {
    const response = await fetch(
      `${api}/users/${userId}/invitations`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setInvitations({ invitations: data }));
  });

  useEffect(() => {
    getInvitations();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper sx={{ boxShadow: 1 }}>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Invitations
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {invitations.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.department}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default InvitationWidget;
