import ListingsModel from "../models/listingsModel.js";
import ThreadsModel from "../models/threadsModel.js";

const getThreads = async (req, res) => {
  const { sellerId, buyerId } = req.query;

  // Build the query to match threads for the sellerID or buyerID
  const query = {
    $or: [
      sellerId ? { sellerId: sellerId } : {},
      buyerId ? { buyerId: buyerId } : {},
    ],
  };

  // Find threads that match the query and populate related data
  try {
    const threads = await ThreadsModel.find(query)
      .populate("sellerId", "_id username")
      .populate("buyerId", "_id username")
      .populate("listingId", "_id species")
      .populate("messages.senderId", "username _id");

    // Return the found threads
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch threads",
    });
  }
};

// start new thread
const startNewThread = async (req, res) => {
  console.log("starting new thread");
  const listingId = req.body.listingId;
  const listing = await ListingsModel.findById(listingId);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  // the user is populated by the jwt auth middleware
  const user = req.user;

  // Prepare the new thread data
  const threadData = {
    sellerId: listing.seller._id,
    buyerId: user._id,
    listingId: listing._id,
    messages: {
      senderId: user._id,
      text: req.body.text,
    },
  };

  // Create the thread in the database and respond with the created thread
  const thread = await ThreadsModel.create(threadData);
  res.status(200).json({
    thread: thread,
  });
};

// add message in existing thread
const sendMessage = async (req, res) => {
  console.log("message recieved...");
  const { threadId } = req.params;
  const sender = req.user;
  const thread = await ThreadsModel.findById(threadId);

  if (!thread) {
    return res.status(404).json({ message: "Thread not found" });
  }

  // Prepare the message data
  const messageData = {
    senderId: sender._id,
    text: req.body.text,
  };

  // Add the message to the thread's message array and save the updated thread
  thread.messages.push(messageData);
  await thread.save();

  // Fetch the updated thread with populated data
  const updatedThread = await ThreadsModel.findById(threadId)
    .populate("sellerId", "_id username")
    .populate("buyerId", "_id username")
    .populate("listingId", "_id species")
    .populate("messages.senderId", "username _id");

  // Respond with the updated thread
  res.status(200).json({
    thread: updatedThread,
  });
};

export { getThreads, sendMessage, startNewThread };
