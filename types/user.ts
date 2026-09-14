export type PublicUserStatus =
  | "active"
  | "disabled"
  | "deleted";

export type UserPreferredLocale =
  | "uz"
  | "de";

export type UserResidencyStage =
  | "planning_move"
  | "new_arrival"
  | "settling_in"
  | "long_term_resident"
  | "citizen"
  | "prefer_not_to_say";

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

export type PublicUserContext = Readonly<{
  user: PublicUser;
  profile: PublicUserProfile | null;
  interests: ReadonlyArray<string>;
}>;
