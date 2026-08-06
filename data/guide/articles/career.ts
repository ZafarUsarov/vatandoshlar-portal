import type { LocalizedGuideArticle } from "../../../types/guide";

import { germanCvArticle } from "./career/german-cv";
import { coverLetterArticle } from "./career/cover-letter";
import { jobSearchStrategyArticle } from "./career/job-search-strategy";
import { interviewEmploymentContractArticle } from "./career/interview-employment-contract";

export const careerArticles = [
  germanCvArticle,
  coverLetterArticle,
  jobSearchStrategyArticle,
  interviewEmploymentContractArticle,
] satisfies ReadonlyArray<LocalizedGuideArticle>;
