import axios from "axios";
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import config from "../config/index";
import UserService from "../services/userService";
import { Collection } from "mongoose";
import CollectionService from "../services/collectionService";
const collectionService = new CollectionService()

const userService = new UserService();
// const User: IUser = require("../models/user");
export const googleAuth = async (req: Request, res: Response) => {
  const { code } = req.query;

  const accessToken = await getAccessTokenFromGoogle(code as string);
  const userData = await getUserDataFromAccessToken(accessToken);

  let user = await User.findOne({ email: userData.email });

   if (!user) {
    let userN = userData.email.split("@")[0];
    const user2 = await User.findOne({username: userN});
    let isUsernameAvailable = await userService.checkUsername(userN);
    if(user2 || userN.length < 4 || isUsernameAvailable === false){
      userN = userN + Math.floor(Math.random() * 1000).toString(); // add random number to username
      // check if the username is available
      let isUsernameAvailableNow = await userService.checkUsername(userN);

      while(isUsernameAvailableNow === false){
        userN = userN + Math.floor(Math.random() * 1000).toString(); // add random number to username
        // check if the username is available
        isUsernameAvailableNow = await userService.checkUsername(userN);
      }

    }
    console.log("userName generated", userN);

    user = await User.create({
      name: userData.name,
      email: userData.email,
      username: userN,
      profilePic: userData.picture,
      verified: 1
    });

     // create a random collection 
     const collectionData = {
      title: "Random Collection", 
      userId: user._id,
      description: "this is a private collection, save all random links here ",
      username: user.username,
      isPublic: false,
      isPinned: true, 
      pinnedTime: Date.now()
    } 

     await collectionService.create(collectionData)

  }


  const token = userService.createToken({
    userId: user._id,
    username: user.username,
  });

  if (user.profilePic === undefined || user.profilePic !== userData.picture) {
    user.profilePic = userData.picture;
    await user.save();
  }

  if (config.PRODUCTION !== "production") {
    return res.redirect(`http://localhost:3001/login?token=${token}`);
  }
  return res.redirect(`${config.PRODUCTION_FRONTEND_URL}/login?token=${token}`);
};

async function getAccessTokenFromGoogle(codeFromGoogle: string) {
  const { data } = await axios({
    url: `https://oauth2.googleapis.com/token`,
    method: "post",
    data: {
      client_id: config.GOOGLECLIENTID,
      client_secret: config.GOOGLECLIENTSECRET,
      redirect_uri: config.GOOGLEREDIRECTURL,
      grant_type: "authorization_code",
      code: codeFromGoogle,
    },
  });

  return data.access_token;
}

async function getUserDataFromAccessToken(accessToken: string) {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

// export default googleAuth;
