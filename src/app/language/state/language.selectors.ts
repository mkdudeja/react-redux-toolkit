import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../state";
import { ILangauge } from "../language.interface";
import { selectAll, selectById } from "./language.reducer";

const selectLanguageState = (state: RootState) => state.language;

export const doesLanguagesExists = createSelector(
  selectLanguageState,
  (state) => state.languagesLoaded
);

export const getAllLanguages = createSelector(selectLanguageState, selectAll);

export const getActiveLanguages = createSelector(
  getAllLanguages,
  (languages: Array<ILangauge>) =>
    languages
      .filter((row: ILangauge) => row.is_active)
      .sort((a: ILangauge, b: ILangauge) =>
        b.name < a.name ? 1 : b.name > a.name ? -1 : 0
      )
);

export const getLanguageById = (entityId: number) => {
  return createSelector(selectLanguageState, (state) =>
    selectById(state, entityId)
  );
};
