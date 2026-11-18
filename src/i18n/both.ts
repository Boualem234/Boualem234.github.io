import type { Localized } from "./context";
import { ui, type UiStrings } from "./ui";

/** Les deux versions (FR et EN) d'un texte de l'interface, pour <Stable>. */
export function both<T = string>(get: (strings: UiStrings) => T): Localized<T> {
  return { fr: get(ui.fr), en: get(ui.en) };
}
