import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  image: string,
  folder: string = "salon"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(image, {
    folder,
    transformation: [
      { width: 1200, height: 800, crop: "limit", quality: "auto", fetch_format: "auto" },
    ],
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export function getOptimizedImageUrl(publicId: string, width: number = 600): string {
  return cloudinary.url(publicId, {
    width,
    crop: "limit",
    quality: "auto",
    fetch_format: "auto",
  })
}

export { cloudinary }
