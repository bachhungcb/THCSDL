import React from "react";
import {useParams} from "react-router-dom";
import MainLayout from "../templates/MainLayout.jsx";

function Profile() {
    const userID = useParams();
    
    return (
        <MainLayout>
            <div>
                <h1>User Profile</h1>
                <p>User ID: {userID}</p>
            </div>
        </MainLayout>
    );
}