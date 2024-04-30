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
  setTemp: string
  setHum: number
  serialCode: string
  imgUrls: string[]
  createdAt: string
  updatedAt: string
  expiredAt: string
}
