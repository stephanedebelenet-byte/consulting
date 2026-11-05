import { BLOG_POST_COUNT } from './blogCount.ts'

export const BLOG_PAGE_SIZE = 18
export const BLOG_PAGE_COUNT = Math.ceil(BLOG_POST_COUNT / BLOG_PAGE_SIZE)
export function blogPagePath(page: number): string {
  return page === 1 ? '/blog' : `/blog/page/${page}`
}
export function validBlogPage(value: string | undefined): number | null {
  if (value === undefined) return 1
  if (!/^[1-9]\d*$/.test(value)) return null
  const page = Number(value)
  return page >= 2 && page <= BLOG_PAGE_COUNT ? page : null
}
