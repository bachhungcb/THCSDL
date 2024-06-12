import React from "react";
import { Button, message } from "antd";
import axios from "axios";
import { HeartFilled } from "@ant-design/icons";
import "./FavouriteButton.css";

const FavouriteButton = ({ animeId }) => {
  const handleAddFavourite = async () => {
    const userId = localStorage.getItem("user");

    if (!userId) {
      message.error("You must be logged in to add to favourites.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/favourite", {
        userId,
        animeId,
      });

      if (response.data.favourite === true) {
        message.success("Added to favourites successfully!");
      }
      else if (response.data.error === false) {
        message.warning("You have already added this to favourites.");
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
      message.warning("There was an error adding to favourites. Please try again.");
    }
  };

  return (
    <Button className="atfbtn" type="primary" onClick={handleAddFavourite}>
      Add to favourites
      <HeartFilled style={{ fontSize: "17px", color: "#fff" }} />
    </Button>
  );
};

export default FavouriteButton;
