import type {
  Location,
} from "@/types/location";

export type PublicUserStatus =
  | "active"
  | "disabled"
  | "deleted";

export type UserPreferredLocale =
  | "uz"
  | "de";

export type LegacyUserResidencyStage =
  | "planning_move"
  | "new_arrival"
  | "settling_in"
  | "citizen";

export type CanonicalUserResidencyStage =
  | "planning_germany"
  | "au_pair"
  | "fsj_bfd"
  | "language_course"
  | "ausbildung"
  | "bachelor"
  | "master"
  | "phd"
  | "internship"
  | "skilled_worker"
  | "employed"
  | "entrepreneur"
  | "family"
  | "long_term_resident"
  | "other"
  | "prefer_not_to_say";

export type UserResidencyStage =
  | LegacyUserResidencyStage
  | CanonicalUserResidencyStage;

export type PublicUser = Readonly<{
  id: string;
  email: string;
  status: PublicUserStatus;
  emailVerifiedAt: string | null;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}>;

export type PublicUserProfile = Readonly<{
  userId: string;
  displayName: string | null;
  preferredLocale: UserPreferredLocale;
  homeLocationId: string | null;
  residencyStage: UserResidencyStage | null;
  createdAt: string;
  updatedAt: string;
}>;

export type PublicUserProfileCompletion = Readonly<{
  isComplete: boolean;
  completedFields: number;
  totalFields: number;
  hasDisplayName: boolean;
  hasHomeLocation: boolean;
  hasResidencyStage: boolean;
  hasInterests: boolean;
}>;

export type PublicUserContext = Readonly<{
  user: PublicUser;
  profile: PublicUserProfile | null;
  homeLocation: Location | null;
  interests: ReadonlyArray<string>;
  completion: PublicUserProfileCompletion;
}>;
