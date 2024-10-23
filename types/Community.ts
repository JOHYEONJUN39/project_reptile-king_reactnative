export interface UserPost {
  id: number
  user: User
  title: string
  content: string
  comments: CommentsData[]
  img_urls: string[]
  category_id: number
  category: CategoryData
  parent_id: number
  category_name: string
  created_at: string
  updated_at: string
  views: number
  nickname: string
  likes: number
  length: number
}

interface User {
  id: number
  nickname: string
}

export interface CommentsData {
  id: number
  group_comment_id: number
  parent_comment_id: number
  user_id: number
  post_id: number
  depth_no: number
  order_no: number
  content: string
  created_at: string
  updated_at: string
}

export interface CategoryData {
  name: string
  id: string
  division: string
  parent_id?: string
  img_url?: string
}

export interface CategoryItem {
  label: string
  value: string
  parentId?: string
}
