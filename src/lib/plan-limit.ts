import { IPlanFeatures } from "./../types/interfaces";
import { SubscriptionPlan } from "@/types/enums";

export const PLAN_FEATURES: Record<SubscriptionPlan, Partial<IPlanFeatures>> = {
  [SubscriptionPlan.FREE]: {
    maxTournaments: 2,
    maxMatchesPerMonth: 5,
    maxTeam: 4,
    maxScorers: 1,
    customOverlays: false,
    apiAccess: false,
    brandingRemoval: false,
    prioritySupport: false,
  },
  [SubscriptionPlan.PRO]: {
    maxTournaments: 10,
    maxMatchesPerMonth: 50,
    maxTeam: 20,
    maxScorers: 5,
    customOverlays: true,
    apiAccess: true,
    brandingRemoval: true,
    prioritySupport: false,
  },
  [SubscriptionPlan.STARTER]: {
    maxTournaments: 5,
    maxMatchesPerMonth: 15,
    maxTeam: 10,
    maxScorers: 2,
    customOverlays: false,
    apiAccess: false,
    brandingRemoval: true, // example: remove branding in starter
    prioritySupport: false,
  },
  [SubscriptionPlan.ENTERPRISE]: {
    maxTournaments: -1, // unlimited
    maxMatchesPerMonth: -1,
    maxTeam: -1,
    maxScorers: -1,
    customOverlays: true,
    apiAccess: true,
    brandingRemoval: true,
    prioritySupport: true,
  },
  [SubscriptionPlan.CUSTOM]: {
    maxTournaments: -1,
    maxMatchesPerMonth: -1,
    maxTeam: -1,
    maxScorers: -1,
    customOverlays: true,
    apiAccess: true,
    brandingRemoval: true,
    prioritySupport: true,
  },
};

export function checkLimit (current: number, max: number, featureName: string): { allowed: boolean, message?: string } {
  if (max === -1) return { allowed: true };
  if (current >= max) {
    return {
      allowed: false,
      message: `You've reached your ${featureName} limit (${max}). Update your plan for more.`
    }
  };
  return {
    allowed: true,
  }
}