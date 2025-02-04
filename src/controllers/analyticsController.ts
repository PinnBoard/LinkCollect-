import { analytics } from "googleapis/build/src/apis/analytics";
import { Collection, User, Timeline, SearchHistory } from "../models";
import { liveMessage } from "../constants/liveMessage";
import EmailService from "../services/emailService";

const emailService = new EmailService();

const getAll = async (req, res) => {
  try {
    const collections = await Collection.find();
    const users = await User.find();
    const timelines = await Timeline.find();

    const data = {
      collections: collections.length,
      users: users.length,
      timelines: timelines.length,
    };

    return res.status(201).json({
      data,
      success: true,
      message: "Successfully fetched the required Analytics",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the analytics",
      err: error,
    });
  }
};

const getLiveMessage = async (req, res) => {
  try {
    // const hostname = req.headers.host; // This contains the hostname and port
    // const [host, port] = hostname.split(':'); // Split the host and port
    // console.log("host", host, port)
    return res.status(201).json({
      data: liveMessage,
      success: true,
      message: "Successfully fetched the live message",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the analytics",
      err: error,
    });
  }
};
const getSearchHistory = async (req, res) => {
  try {
    // sort in desc order of count
    const searchHistory = await SearchHistory.find().sort({ count: -1 });
    return res.status(201).json({
      data: searchHistory,
      success: true,
      message: "Successfully fetched the search history",
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the analytics",
      err: error,
    });
  }
};


const sendWeekyEmail = async (req, res) => {
  try {
    
    const response = await emailService.sendWeeklyEmail();
    
    return res.status(201).json({
      data: response,
      success: true,
      message: "Successfully sent emails",
      err: {},
    });

  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get the analytics",
      err: error,
    });
  }
};




const analyticsController = { getAll, getLiveMessage, getSearchHistory, sendWeekyEmail };

export default analyticsController;
