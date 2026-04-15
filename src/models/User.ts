import mongoose, { Schema, Document, mongo } from "mongoose";
import bcrypt from "bcryptjs";
import { UserRole, SubscriptionPlan, SubscriptionStatus } from "@/types/enums";

export interface IUserDocument extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatar?: string;
  parentAdmin?: mongoose.Types.ObjectId;
  isEmailVerified: boolean;
  subscription: {
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    currentPeriodStart?: Date;
    currentPeriodEnd?: Date;
    features: {
      maxTournaments: number;
      maxMatchesPerMonth: number;
      maxTeams: number;
      maxScorers: number;
      customerOverlays: boolean;
      apiAccess: boolean;
      brandingRemoval: boolean;
      prioritySupport: boolean;
    };
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.ADMIN
  },
  avatar: String,
  parentAdmin: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  subscription: {
    plan: {
      type: String,
      enum: Object.values(SubscriptionPlan),
      default: SubscriptionPlan.FREE,
    },
    status: {
      type: String,
      enum: Object.values(SubscriptionStatus),
      default: SubscriptionStatus.ACTIVE
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    features: {
      maxTournaments: { type: Number, default: 2 },
      maxMatchesPerMonth: { type: Number, default: 5 },
      maxTeams: { type: Number, default: 4 },
      maxScorers: { type: Number, default: 1 },
      customerOverlays: { type: Boolean, default: false },
      apiAccess: { type: Boolean, default: false },
      brandingRemoval: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
    },
  },
}, {
  timestamps: true,
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.models.User || mongoose.model("User", UserSchema);