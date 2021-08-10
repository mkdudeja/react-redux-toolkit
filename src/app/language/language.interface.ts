export interface ILangauge {
  id: number;
  name: string;
  is_active: number;
  date_created: string;
}

export interface IDialogLanguageDetails {
  open: boolean;
  language: ILangauge;
}
