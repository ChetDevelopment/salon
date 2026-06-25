"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { reviewSchema, type ReviewFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Pencil, Trash2, Plus, CheckCircle } from "lucide-react"

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string | null
  isApproved: boolean
  createdAt: string
}

export function ReviewsManager({ reviews: initialReviews }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews)
  const [editing, setEditing] = useState<Review | null>(null)
  const [showForm, setShowForm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
  })

  const rating = watch("rating", 0)

  const startEdit = (review: Review) => {
    setEditing(review)
    setValue("customerName", review.customerName)
    setValue("rating", review.rating)
    setValue("comment", review.comment || "")
    setValue("isApproved", review.isApproved)
    setShowForm(true)
  }

  const startCreate = () => {
    setEditing(null)
    reset({ isApproved: true, rating: 5 })
    setShowForm(true)
  }

  const onSubmit = async (data: ReviewFormData) => {
    const url = editing ? `/api/reviews/${editing.id}` : "/api/reviews"
    const method = editing ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const updated = await res.json()
      if (editing) {
        setReviews(reviews.map((r) => (r.id === editing.id ? { ...r, ...updated } : r)))
      } else {
        setReviews([updated, ...reviews])
      }
      setShowForm(false)
      setEditing(null)
      reset()
    } else {
      alert("Failed to save review")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" })
    if (res.ok) {
      setReviews(reviews.filter((r) => r.id !== id))
    }
  }

  const toggleApproval = async (review: Review) => {
    const res = await fetch(`/api/reviews/${review.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: !review.isApproved }),
    })
    if (res.ok) {
      setReviews(reviews.map((r) => (r.id === review.id ? { ...r, isApproved: !r.isApproved } : r)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{reviews.length} reviews</p>
        <Button onClick={startCreate} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Review
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{editing ? "Edit Review" : "New Review"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input id="customerName" label="Customer Name" error={errors.customerName?.message} {...register("customerName")} />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setValue("rating", star)}
                    className="p-1"
                  >
                    <Star className={`h-6 w-6 ${star <= rating ? "fill-gold text-gold" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
              {errors.rating && <p className="text-sm text-red-600 mt-1">{errors.rating.message}</p>}
            </div>

            <Textarea id="comment" label="Comment" error={errors.comment?.message} {...register("comment")} />

            <div className="flex gap-4">
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditing(null) }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-sm">{review.customerName}</h3>
                  <button
                    onClick={() => toggleApproval(review)}
                    className={`text-xs px-2 py-0.5 rounded ${
                      review.isApproved ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {review.isApproved ? "Approved" : "Pending"}
                  </button>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-gold text-gold" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                {review.comment && <p className="text-sm text-gray-600">{review.comment}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(review)} className="p-1 hover:text-gold">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(review.id)} className="p-1 hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-center py-8 text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  )
}
