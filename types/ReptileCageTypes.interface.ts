export interface CageResponse {
  cages: ReptileCage[]
  msg: string
}

export interface ReptileCage {
  id: number
  userId: number
  name: string
  reptileSerialCode: string
  memo: string
  set_temp: string
  set_hum: number
  serialCode: string
  img_urls: string[]
  createdAt: string
  updatedAt: string
  expiredAt: string
  location: string
}
