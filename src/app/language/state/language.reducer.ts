import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import { ILangauge } from "../language.interface";
import * as languageActions from "./language.actions";

const adapter = createEntityAdapter<ILangauge>({
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a: ILangauge, b: ILangauge) => b.id - a.id,
  }),
  initialState = adapter.getInitialState({
    languagesLoaded: false,
  });

const langaugeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(languageActions.getLangauges.pending, (state) => {
      return {
        ...state,
        languagesLoaded: false,
      };
    })
    .addCase(languageActions.getLangauges.fulfilled, (state, action) => {
      return adapter.setAll(
        { ...state, languagesLoaded: true },
        action.payload
      );
    })
    .addCase(languageActions.addLanguage.fulfilled, (state, action) => {
      return adapter.addOne(state, action.payload);
    })
    .addCase(languageActions.updateLanguage.fulfilled, (state, action) => {
      return adapter.updateOne(state, action.payload);
    })
    .addCase(languageActions.deleteLanaguge.fulfilled, (state, action) => {
      return adapter.removeOne(state, action.payload);
    })
    .addCase(languageActions.updateStatus.fulfilled, (state, action) => {
      return adapter.updateOne(
        { ...state, languagesLoaded: true },
        action.payload
      );
    });
});

export const { selectAll, selectById } = adapter.getSelectors();
export default langaugeReducer;
