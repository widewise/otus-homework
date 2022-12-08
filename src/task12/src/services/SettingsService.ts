import { ISettingsModel } from "@/models/SettingsModel";

const SETTINGS_KEY = "SETTINGS"

const defaultSettings: ISettingsModel = {
    complexity: 1,
    duration:10,
    operations: ["+", "-"]
};

export const settingsService = {
    getSettings(): ISettingsModel {
        return  JSON.parse(localStorage.getItem(SETTINGS_KEY) as string) as ISettingsModel ?? defaultSettings;
    },

    setSettings(settings: ISettingsModel) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    },
}