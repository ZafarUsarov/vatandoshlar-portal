import type { LocalizedGuideArticle } from "../../../types/guide";

import { recognitionOverviewArticle } from "./recognition/recognition-overview";
import { recognitionProcedureArticle } from "./recognition/recognition-procedure";
import { regulatedProfessionsArticle } from "./recognition/regulated-professions";
import { anabinZabRecognitionArticle } from "./recognition/anabin-zab-recognition";

export const recognitionArticles = [
  recognitionOverviewArticle,
  recognitionProcedureArticle,
  regulatedProfessionsArticle,
  anabinZabRecognitionArticle,
] satisfies ReadonlyArray<LocalizedGuideArticle>;
