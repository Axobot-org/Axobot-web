import EnTranslations from "./translations/GuildDashboard/en.json" assert { type: "json" };

type TranslationRecord = { [key: string]: string | TranslationRecord }


/**
   * @param key The key to translate. Nested keys are separated by dots.
   */
export function getGuildDashboardTranslations(key: string) {
  const keys = key.split(".");
  let translation = EnTranslations as TranslationRecord | string;

  for (const k of keys) {
    if (typeof translation === "string" || translation[k] === undefined) {
      console.error(`Missing translation for key: ${key}`);
      return key;
    }

    translation = translation[k];
  }

  if (typeof translation !== "string") {
    console.error(`Incomplete translation key: ${key}`);
    return key;
  }

  return translation;
}