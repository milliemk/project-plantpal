import ListingsModel from "../models/listingsModel.js";
import ThreadsModel from "../models/threadsModel.js";

const getThreads = async (req, res) => {
  const { sellerId, buyerId } = req.query;

  const query = {
    $or: [
      sellerId ? { sellerId: sellerId } : {},
      buyerId ? { buyerId: buyerId } : {},
    ],
  };

  try {
    const threads = await ThreadsModel.find(query)
      .populate("sellerId", "_id username")
      .populate("buyerId", "_id username")
      .populate("listingId", "_id species")
      .populate("messages.senderId", "username _id");

    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch threads",
    });
  }
};

// start new
const startNewThread = async (req, res) => {
  console.log("starting new thread");
  const listingId = req.body.listingId;
  const listing = await ListingsModel.findById(listingId);
  const user = req.user;

  const threadData = {
    sellerId: listing.seller._id,
    buyerId: user._id,
    listingId: listing._id,
    messages: {
      senderId: user._id,
      text: req.body.text,
    },
  };

  const thread = await ThreadsModel.create(threadData);
  res.status(200).json({
    thread: thread,
  });
};

// send message
const sendMessage = async (req, res) => {
  console.log("message recieved...");
  const { threadId } = req.params;
  const sender = req.user;
  const thread = await ThreadsModel.findById(threadId);
  const messageData = {
    senderId: sender._id,
    text: req.body.text,
  };
  thread.messages.push(messageData);
  await thread.save();

  const updatedThread = await ThreadsModel.findById(threadId)
    .populate("sellerId", "_id username")
    .populate("buyerId", "_id username")
    .populate("listingId", "_id species")
    .populate("messages.senderId", "username _id");

  res.status(200).json({
    thread: updatedThread,
  });
};

export { getThreads, sendMessage, startNewThread };
