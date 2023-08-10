import type { SearchResult as MSearchResult } from 'minisearch'

export interface SearchSection {
  /**
   * Id of the section
   */
  id: string
  /**
   * Title of the section
   */
  title: string
  /**
   * Parents sections titles
   */
  titles: string[]
  /**
   * Level of the section
   */
  level: number
  /**
   * Content of the section
   */
  text: string
}

export interface SearchResult extends MSearchResult, SearchSection {
  id: string
}

export interface SearchDisplayItem {
  id: string
  title: string
  titles: string[]
  level: number
  children: SearchDisplayItem[] | null
}
