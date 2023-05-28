import { Box } from "@mui/material";
import api from '../../src/connection'
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

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image && verifyImage(image)}
        // src={image}
      />
    </Box>
  );
};

export default UserImage;
