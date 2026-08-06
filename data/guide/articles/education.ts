import type { LocalizedGuideArticle } from "../../../types/guide";

import { universityAdmissionGermanyArticle } from "./education/university-admission-germany";
import { studienkollegGuideArticle } from "./education/studienkolleg-guide";
import { bachelorMasterApplicationArticle } from "./education/bachelor-master-application";
import { studyFinancingGermanyArticle } from "./education/study-financing-germany";

export const educationArticles = [
  universityAdmissionGermanyArticle,
  studienkollegGuideArticle,
  bachelorMasterApplicationArticle,
  studyFinancingGermanyArticle,
] satisfies ReadonlyArray<LocalizedGuideArticle>;
