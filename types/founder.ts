export type FounderSocialPlatform =
  | "telegram"
  | "instagram"
  | "youtube"
  | "facebook";

export type FounderSocialLink = Readonly<{
  platform: FounderSocialPlatform;
  href: string;
}>;

export type FounderProfile = Readonly<{
  name: string;
  email: string;
  specialistSlug: string;
  avatarUrl?: string;
  socialLinks: ReadonlyArray<FounderSocialLink>;
  technologies: ReadonlyArray<string>;
}>;
