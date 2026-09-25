// Pages « Événement » — sorties du namespace /blog (voir audit UI/UX) car ce
// sont des pages d'inscription à un webinaire, pas des articles éditoriaux.
// Une entrée = une page à /evenements/<slug>, contenu chargé depuis le même
// fichier markdown que précédemment (public/blog/<file>.md).

export interface EvenementMeta {
  slug: string
  file: string
  title: string
  description: string
}

export const EVENEMENTS: EvenementMeta[] = [
  {
    slug: 'transformation-supply-chain-en-90-jours',
    file: '14-webinaire-transformation-90j',
    title: 'Webinaire Gratuit — Transformation Supply Chain en 90 Jours | Nextinotech',
    description:
      'Webinaire gratuit 45 min : transformation supply chain réaliste en 90 jours, roadmap détaillée, risques mitigés, ROI calculé. Inscription gratuite.',
  },
  {
    slug: 'formation-ou-consulting-quelle-approche',
    file: '15-webinaire-formation-vs-consulting',
    title: 'Webinaire Gratuit — Formation ou Consulting, Quelle Approche ? | Nextinotech',
    description:
      'Webinaire gratuit 50 min : formation seule, consulting ou approche hybride. Guide de décision, comparaison ROI, cas réels.',
  },
]
