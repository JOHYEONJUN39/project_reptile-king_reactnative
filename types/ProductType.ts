export interface CategoryList {
  name: string
  image: string
}

export interface ReviewData {
  profileImage: string
  nickname: string
  rating: number
  date: string
  productImage: string
  content: string
}

export interface ProductList {
  product: {
    name: string
    image: string
    price: number
    rating: number
    totalReview: number
    charge: number
    code: string
    seller: string
    contentImage?: string[]
    reviewsByScore: Record<string, number>
    review: ReviewData[]
  }
}

export interface ProductProps {
  name: string
  image: string
  price: number
  rating: number
  totalReview: number
  charge: number
  code: string
  seller: string
  contentImage?: string[]
  reviewsByScore: Record<string, number>
  review: ReviewData[]
}
