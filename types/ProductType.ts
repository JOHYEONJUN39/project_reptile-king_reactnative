export interface CategoryList {
  name: string
  image: string
}

export interface ProductList {
  product: {
    name: string
    image: string
    price: string
    rating: number
    review: number
    charge: number
    code: string
    seller: string
  }
}

export interface ProductProps {
  name: string
  image: string
  price: string
  rating: number
  review: number
  charge: number
  code: string
  seller: string
}
