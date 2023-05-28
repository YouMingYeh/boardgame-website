import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActivities } from "state";
import ActivityWidget from "./ActivityWidget";
import LoadingPage from "../../components/LoadingPage";
import api from '../../../src/connection'

const ActivitiesWidget = ({ userId, isProfile = false, profileId = null }) => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const token = useSelector((state) => state.token);
  const filter = useSelector((state) => state.filter);
  const [editOpen, setEditOpen] = useState();
  

  const getActivities = useCallback(async () => {
    console.log("getting activities");
    const response = await fetch(`${api}/activities/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    const newActivities = data.filter((activity) => !activity.deleted)
    dispatch(setActivities({ activities: newActivities }));
    
  });

  const getUserActivities = useCallback(async () => {
    console.log("getting user activities");
    const response = await fetch(
      `${api}/activities/${profileId}/activities/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    const newActivities = data.filter((activity) => !activity.deleted)
    dispatch(setActivities({ activities: newActivities }));
    
  });

  useEffect(() => {
    if (isProfile) {
      getUserActivities();
    } else {
      getActivities();
    }
  }, [filter, editOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  
  return (
    <>
      {activities ? activities.map(
        ({
          _id,
          host,
          name,
          description,
          participants,
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
          deleted
        }) => (
          <ActivityWidget
            key={_id}
            activityId={_id}
            activityUserId={host}
            name={name}
            description={description}
            participants={participants}
            department={department}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            join={join}
            comments={comments}
            tags={tags}
            date={date}
            friendOnly={friendOnly}
            heading={heading}
            limit={limit}
            editOpen={editOpen}
            setEditOpen={setEditOpen}
            deleted={deleted}
          />
        )
      ) : <></>}
    </>
  );
};

export default ActivitiesWidget;
