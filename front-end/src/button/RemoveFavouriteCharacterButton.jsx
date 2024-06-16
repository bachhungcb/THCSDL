import React from "react";
import { Button, message } from "antd";
import axios from "axios";
import { MehFilled } from "@ant-design/icons";
import "./FavouriteButton.css";

const RemoveFavouriteButton = ({ characterId, userId, setData }) => {
  const handleRemoveFavourite = async () => {
    try {
      const response = await axios.delete("http://localhost:8080/unfavourite/characters", {
        data: { userId, characterId },
      });

      if (response.data.success === 1) {
        message.success("You have removed this character!");
        // Update the list after removing the specific character
        setData((prevData) => prevData.filter((item) => item.Id !== characterId));
      } else {
        message.warning("There is some problem.");
      }
    } catch (error) {
      console.error("Error removing from favourites:", error);
      message.warning("There was an error removing from favourites. Please try again.");
    }
  };

  return (
    <Button className="atfbtn" type="primary" onClick={handleRemoveFavourite}>
      Remove from your list
      <MehFilled style={{ fontSize: "17px", color: "#fff" }} />
    </Button>
  );
};

export default RemoveFavouriteButton;
