export interface CategoryList {
  id: string
  name: string
  image: string | undefined
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

// 상품데이터 타입
export interface ProductProp {
  id: string
  name: string
  content: string
  price: number
  category_id: number
  category_name: string
  img_urls: string[]
  reviewCount: number | null
  starAvg: number
  created_at: string
}

// 상품데이터들의 페이지네이션을 위한 타입
export interface ProductPageRes {
  current_page: number
  data: ProductProp[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: Array<{ url: string | null, label: string, active: boolean }>
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}
