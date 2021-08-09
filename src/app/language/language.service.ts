import { appConstants, helper, networkService } from "../shared";
import { IToggleStatus } from "../shared/interfaces";
import { ILangauge } from "./language.interface";

const Language_Parse_Int = ["id", "is_active"];

export async function getLangauges(): Promise<Array<ILangauge>> {
  const result = await networkService.get<ILangauge[]>(
    appConstants.urls.getLanguages
  );
  return result.map((item) =>
    helper.parseObjectForInt(item, Language_Parse_Int)
  );
}

export async function saveLanguage(language: ILangauge): Promise<number> {
  const entityId = await networkService.post<string>(
    appConstants.urls.saveLanaguge,
    language
  );
  return parseInt(entityId, 10);
}

export function updateLanguage(language: ILangauge): Promise<boolean> {
  return networkService.post<boolean>(
    appConstants.urls.updateLanaguge,
    language
  );
}

export function updateStatus(payload: IToggleStatus): Promise<boolean> {
  return networkService.post(appConstants.urls.updateLanguageStatus, {
    id: payload.id,
    status: payload.status,
  });
}

export function deleteLanguage(langaugeId: number): Promise<boolean> {
  return networkService.post<boolean>(appConstants.urls.deleteLanaguge, {
    id: langaugeId,
  });
}
