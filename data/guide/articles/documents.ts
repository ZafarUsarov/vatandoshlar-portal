import type { LocalizedGuideArticle } from "../../../types/guide";

import { apostilleArticle } from "./documents/apostille";
import { officialTranslationArticle } from "./documents/official-translation";
import { certifiedCopyArticle } from "./documents/certified-copy";
import { birthCertificateArticle } from "./documents/birth-certificate";
import { marriageCertificateArticle } from "./documents/marriage-certificate";
import { diplomaDocumentPreparationArticle } from "./documents/diploma-document-preparation";

export const documentArticles = [
  apostilleArticle,
  officialTranslationArticle,
  certifiedCopyArticle,
  birthCertificateArticle,
  marriageCertificateArticle,
  diplomaDocumentPreparationArticle,
] satisfies ReadonlyArray<LocalizedGuideArticle>;
