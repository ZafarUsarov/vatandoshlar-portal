import type { LocalizedGuideArticle } from "../../../types/guide";

import { integrationCourseArticle } from "./integration/integration-course";
import { dtzLidArticle } from "./integration/dtz-lid";
import { vocationalLanguageCoursesArticle } from "./integration/vocational-language-courses";
import { naturalisationLanguageIntegrationArticle } from "./integration/naturalisation-language-integration";

export const integrationArticles = [
  integrationCourseArticle,
  dtzLidArticle,
  vocationalLanguageCoursesArticle,
  naturalisationLanguageIntegrationArticle,
] satisfies ReadonlyArray<LocalizedGuideArticle>;
