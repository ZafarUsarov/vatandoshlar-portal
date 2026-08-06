import type { LocalizedGuideArticle } from "../../../types/guide";

import { germanLevelsRealityArticle } from "./language/german-levels-reality";
import { recognizedLanguageCertificatesArticle } from "./language/recognized-language-certificates";
import { universityLanguageTestsArticle } from "./language/university-language-tests";
import { ausbildungLanguageRealityArticle } from "./language/ausbildung-language-reality";

export const languageArticles = [
  germanLevelsRealityArticle,
  recognizedLanguageCertificatesArticle,
  universityLanguageTestsArticle,
  ausbildungLanguageRealityArticle,
] satisfies ReadonlyArray<LocalizedGuideArticle>;
