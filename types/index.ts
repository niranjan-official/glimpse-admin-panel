export interface Media {
    imgSrc: string
}
export interface MediaObject {
  key: string,
  imgSrc: string
}
  export interface Settings {
    carouselInterval: number,
    displayMode: 'all' | 'multiple' | 'single',
    singleMediaStore: string,
    multiMediaStore: string[]
  }