import { useState } from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

/**
 * 이미지를 S3에 업로드하고 해당 URL을 반환하는 훅.
 * @param s3Client - S3Client 인스턴스.
 * @param bucketName - 업로드할 S3 버킷 이름.
 * @returns 업로드 함수와 업로드 상태.
 *
 */

interface ImageData {
  url: string
  id: string
}

interface UploadResult {
  uploadImages: (images: ImageData[]) => Promise<ImageData[]>
  uploading: boolean
}

export const useUploadImagesToS3 = (s3Client: S3Client, bucketName: string): UploadResult => {
  const [uploading, setUploading] = useState(false)

  const generateUniqueId = (): string => {
    return `id-${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`
  }

  const uploadImages = async (images: ImageData[]): Promise<ImageData[]> => {
    setUploading(true)
    try {
      const imgUrls = await Promise.all(
        images.map(async ({ url, id }) => {
          const response = await fetch(url)
          const blob = await response.blob()
          const uniqueId = generateUniqueId()
          const key = `images/posts/${Date.now()}-${uniqueId}`
          const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: blob
          })
          await s3Client.send(command)
          return { url: `https://${bucketName}.s3.ap-northeast-2.amazonaws.com/${key}`, id }
        })
      )
      return imgUrls
    } finally {
      setUploading(false)
    }
  }

  return { uploadImages, uploading }
}
