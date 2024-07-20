export interface Media {
  mediaSrc: string,
  mediaRef?: string
  mediaType?: string
}
export interface MediaObject {
  key: string,
  mediaSrc: string,
  mediaRef?: string
  mediaType?: string
}
  export interface Settings {
    carouselInterval: number,
    displayMode: 'all' | 'multiple' | 'single',
    singleMediaStore: string,
    multiMediaStore: string[]
  }