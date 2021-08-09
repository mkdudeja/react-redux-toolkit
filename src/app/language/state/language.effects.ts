import { AsyncThunkPayloadCreator, Update } from "@reduxjs/toolkit";
import { IToggleStatus } from "../../shared/interfaces";
import { ILangauge } from "../language.interface";
import * as languageService from "../language.service";

export const getLangauges: AsyncThunkPayloadCreator<Array<ILangauge>> =
  async () => {
    try {
      const response = await languageService.getLangauges();
      return response;
    } catch (error) {
      throw error;
    }
  };

export const addLanguage: AsyncThunkPayloadCreator<ILangauge, ILangauge> =
  async (language: ILangauge) => {
    try {
      const entityId = await languageService.saveLanguage(language);
      return { ...language, id: entityId };
    } catch (error) {
      throw error;
    }
  };

export const updateLanguage: AsyncThunkPayloadCreator<
  Update<ILangauge>,
  ILangauge
> = async (language: ILangauge) => {
  try {
    await languageService.updateLanguage(language);
    return {
      id: language.id,
      changes: language,
    };
  } catch (error) {
    throw error;
  }
};

export const deleteLanaguge: AsyncThunkPayloadCreator<number, number> = async (
  entityId: number
) => {
  try {
    await languageService.deleteLanguage(entityId);
    return entityId;
  } catch (error) {
    throw error;
  }
};

export const updateStatus: AsyncThunkPayloadCreator<
  Update<ILangauge>,
  IToggleStatus
> = async (payload: IToggleStatus) => {
  try {
    await languageService.updateStatus(payload);
    return {
      id: payload.id,
      changes: {
        is_active: payload.status,
      },
    };
  } catch (error) {
    throw error;
  }
};
