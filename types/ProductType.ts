export interface CategoryList {
  name: string
  image: string
}

export interface ProductList {
  product: {
    name: string
    image: string
    price: number
    rating: number
    review: number
    charge: number
    code: string
    seller: string
    contentImage?: string[]
  }
}

export interface ProductProps {
  name: string
  image: string
  price: number
  rating: number
  review: number
  charge: number
  code: string
  seller: string
  contentImage?: string[]
}
