import { slugify } from '../utils/slugify.ts'

export const arabicArticles = [
  { file: 'plf-2027-douane-maroc', title: 'PLF 2027 au Maroc : ce qui pourrait changer en douane' },
  { file: 'plf-2027-avance-importation', title: 'PLF 2027 : simuler l’avance fiscale à l’importation' },
  { file: 'plf-2027-agrement-transitaires', title: 'PLF 2027 : agrément des transitaires en douane' },
  { file: 'plf-2027-tarif-douanier', title: 'PLF 2027 : vérifier les changements du tarif douanier' },
]

export const arabicPages = [
  { fr: '/conseil', ar: '/ar/conseil', file: 'conseil' },
  { fr: '/diagnostic-supply-chain', ar: '/ar/diagnostic-supply-chain', file: 'diagnostic-supply-chain' },
  { fr: '/formation', ar: '/ar/formation', file: 'formation' },
  { fr: '/formation/douane-import-export', ar: '/ar/formation/douane-import-export', file: 'formation-douane' },
  { fr: '/formation-import', ar: '/ar/formation-import', file: 'formation-import' },
  { fr: '/accompagnement-oea', ar: '/ar/accompagnement-oea', file: 'accompagnement-oea' },
  ...arabicArticles.map(({ file, title }) => ({
    fr: '/blog/' + slugify(title),
    ar: '/ar/blog/' + file,
    file,
  })),
]

export const arabicAlternates = new Map(arabicPages.map(({ fr, ar }) => [fr, ar]))
arabicAlternates.set('/blog/recette-wms-au-maroc-8-tests-avant-la-mise-en-service', '/ar/blog/recette-wms-scenarios-tests')
