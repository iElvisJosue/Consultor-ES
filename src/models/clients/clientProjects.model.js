import mongoose from "mongoose";

const clientProjectsModel = new mongoose.Schema({
  nameProject: {
    type: String,
    trim: true,
    default: "",
  },
  detailsProject: {
    type: String,
    trim: true,
    default: "",
  },
  timeProject: {
    type: String,
    trim: true,
    default: "",
  },
  areaProject: {
    type: String,
    trim: true,
    default: "",
  },
  ownerID: {
    type: String,
    trim: true,
    default: "",
  },
});

export default mongoose.model(
  "clientProjects",
  clientProjectsModel,
  "clientProjects"
);
