import { isFavourite } from './isFavourite'

describe('isFavourite', () => {
  it('should return true if the item is in the favourites list', () => {
    const favsList = [{ id: '1' }]
    //@ts-ignore
    const result = isFavourite(favsList, '1')
    expect(result).toEqual(true)
  })
  it('should return false if the item is not in the favourites list', () => {
    const favsList = [{ id: '1' }]
    //@ts-ignore
    const result = isFavourite(favsList, '2')
    expect(result).toEqual(false)
  })
  it('should return undefined if the favourites list is not defined', () => {
    const favsList = undefined
    //@ts-ignore
    const result = isFavourite(favsList, '2')
    expect(result).toEqual(undefined)
  })
})
