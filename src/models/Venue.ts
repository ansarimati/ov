import { PitchBehaviour } from './../types/enums';
import mongoose, { Schema } from "mongoose";
import * as E from "@/types/enums";

const VenueSchema = new Schema({
  name: { type: String, required: true, trim: true },
  shortName: { type: String, trim: true },
  city: { type: String, required: true },
  state: String,
  country: { type: String, required: true },
  capacity: Number,

  groundDimensions: {
    straightBoundary: Number,
    squareBoundary: Number,
    legSideBoundary: Number,
    offSideBoundary: Number,
  },

  pitchType: { type: String, enum: Object.values(E.PitchType), default: E.PitchType.TURF },
  pitchBehavior: { type: String, enum: Object.values(E.PitchBehaviour), default: E.PitchBehaviour.BALANCED },

  hasFloodLights: { type: Boolean, default: false },
  hasDRS: { type: Boolean, default: false },
  hasHotSpot: { type: Boolean, default: false },

  venueStats: {
    matchesPlayed: { type: Number, default: 0 },
    averageFirstInningsScore: { type: Number, default: 0 },
    averageSecondInningsScore: { type: Number, default: 0 },
    battingFirstWins: { type: Number, default: 0 },
    chasingWins: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    lowestScore: { type: Number, default: 999 },
    highestChase: { type: Number, default: 0 },
    averagePaceWickets: { type: Number, default: 0 },
    averageSpinWickets: { type: Number, default: 0 }
  },

  photo: String,
  pitchPhoto: String,
  timezone: { type: String, default: "UTC" },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

VenueSchema.index({ owner: 1 });
VenueSchema.index({ name: "text", city: "text" });

export const Venue = mongoose.models.Venue || mongoose.model("Venue", VenueSchema);
