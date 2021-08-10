import { IDialogLanguageDetails, ILangauge } from "./language.interface";

export class LanguageModel implements ILangauge {
  id: number = null;
  name = "";
  is_active = 1;
  date_created = new Date().toJSON();
}

export class DialogLanguageDetailsModel implements IDialogLanguageDetails {
  open = false;
  language = new LanguageModel();
}
