import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: {
    participation: [],
    invitations: [],
    invitings: [],
    friends: [],
  },
  token: null,
  activities: [],
  filter: "",
  change: {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setInvitations: (state, action) => {
      if (state.user) {
        state.user.invitations = action.payload.invitations;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setInvitings: (state, action) => {
      if (state.user) {
        state.user.invitings = action.payload.invitings;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setActivities: (state, action) => {
      var updatedActivities = action.payload.activities;

      if (state.filter !== "") {
        updatedActivities = updatedActivities.filter((activity) => {
          let flag = false;
          activity.tags.includes(state.filter);
          activity.tags.forEach((tag) => {
            if (flag) {
            } else if (tag.search(state.filter) !== -1) {
              flag = true;
            }
          });
          if (flag) return flag;
          if (activity.heading.search(state.filter) !== -1) flag = true;
          if (flag) return flag;
          if (activity.description.search(state.filter) !== -1) flag = true;
          if (flag) return flag;
          if (activity.name.search(state.filter) !== -1) flag = true;
          return flag;
        });
      }

      state.activities = updatedActivities;
    },
    setActivity: (state, action) => {
      var updatedActivities = state.activities ? state.activities.map((activity) => {
        if (activity._id === action.payload.activity._id)
          return action.payload.activity;
        return activity;
      }) : [];

      if (state.filter !== "") {
        updatedActivities = updatedActivities.filter((activity) => {
          let flag = false;

          activity.tags.includes(state.filter);
          activity.tags.forEach((tag) => {
            if (flag) {
            } else if (tag.search(state.filter) !== -1) {
              flag = true;
            }
          });
          if (flag) return flag;
          if (activity.heading.search(state.filter) !== -1) flag = true;
          if (flag) return flag;
          if (activity.description.search(state.filter) !== -1) flag = true;
          if (flag) return flag;
          if (activity.name.search(state.filter) !== -1) flag = true;
          return flag;
        });
      }
      console.log(state.filter);
      state.activities = updatedActivities;
    },
    setParticipation: (state, action) => {
      if (state.user) {
        let newParticipation = action.payload.participation;

        state.user.participation = newParticipation.filter((p)=>!p.deleted)
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload.filter;
    },
    
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setInvitings,
  setInvitations,
  setActivities,
  setActivity,
  setParticipation,
  setFilter,
} = authSlice.actions;
export default authSlice.reducer;
