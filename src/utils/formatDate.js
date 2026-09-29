const MONTHS = {
  fr: ["Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
};

/** "2025-12" -> "Déc. 2025" (fr) / "Dec 2025" (en). Retourne la valeur brute si inattendue. */
export const formatDate = (ym, lang) => {
  if (!ym) return "";
  const [y, m] = ym.split("-");
  const months = MONTHS[lang] || MONTHS.fr;
  const label = months[Number(m) - 1];
  if (!y || !label) return ym;
  return `${label} ${y}`;
};
