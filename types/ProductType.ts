export interface CategoryList {
  name: string
  image: string
}

export interface ProductProps {
  product: {
    name: string
    image: string
    price: string
    rating: number
    review: number
    charge: number
    code: string
  }
}
