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
  /**
   * Id of the item
   */
  id: string
  /**
   * Title of the item
   */
  title: string
  /**
   * Parents items titles
   */
  titles: string[]
  /**
   * Level of the item
   */
  level: number
  /**
   * Children items
   */
  children: SearchDisplayItem[] | null
}

export type SearchDisplay = Record<string, SearchDisplayItem[]>
