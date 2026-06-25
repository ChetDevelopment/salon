"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { gallerySchema, type GalleryFormData } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react"

interface GalleryItem {
  id: string
  title: string
  description: string | null
  imageUrl: string
  cloudinaryPublicId: string | null
  categoryId: string | null
  isBeforeAfter: boolean
  beforeImage: string | null
  afterImage: string | null
  sortOrder: number
  isActive: boolean
  category: { id: string; name: string } | null
}

interface Category {
  id: string
  name: string
}

export function GalleryManager({ items: initialItems, categories }: { items: GalleryItem[]; categories: Category[] }) {
  const [items, setItems] = useState(initialItems)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [showForm, setShowForm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<GalleryFormData>({
    resolver: zodResolver(gallerySchema),
  })

  const startEdit = (item: GalleryItem) => {
    setEditing(item)
    setValue("title", item.title)
    setValue("description", item.description || "")
    setValue("imageUrl", item.imageUrl)
    setValue("categoryId", item.categoryId || "")
    setValue("isBeforeAfter", item.isBeforeAfter)
    setValue("beforeImage", item.beforeImage || "")
    setValue("afterImage", item.afterImage || "")
    setValue("sortOrder", item.sortOrder)
    setValue("isActive", item.isActive)
    setShowForm(true)
  }

  const startCreate = () => {
    setEditing(null)
    reset({ isActive: true, sortOrder: 0, isBeforeAfter: false })
    setShowForm(true)
  }

  const onSubmit = async (data: GalleryFormData) => {
    const url = editing ? `/api/gallery/${editing.id}` : "/api/gallery"
    const method = editing ? "PUT" : "POST"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      const updated = await res.json()
      if (editing) {
        setItems(items.map((i) => (i.id === editing.id ? { ...i, ...updated } : i)))
      } else {
        setItems([updated, ...items])
      }
      setShowForm(false)
      setEditing(null)
      reset()
    } else {
      const err = await res.json()
      alert(err.error || "Failed to save gallery item")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return
    const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" })
    if (res.ok) {
      setItems(items.filter((i) => i.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{items.length} items</p>
        <Button onClick={startCreate} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Image
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{editing ? "Edit Gallery Item" : "New Gallery Item"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input id="title" label="Title" error={errors.title?.message} {...register("title")} />
            <Textarea id="description" label="Description" error={errors.description?.message} {...register("description")} />
            <Input id="imageUrl" label="Image URL" error={errors.imageUrl?.message} {...register("imageUrl")} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                id="categoryId"
                label="Category"
                placeholder="None"
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                {...register("categoryId")}
                onChange={(e) => setValue("categoryId", e.target.value)}
              />
              <Input id="sortOrder" label="Sort Order" type="number" error={errors.sortOrder?.message} {...register("sortOrder")} />
            </div>
            <div className="flex gap-4">
              <Button type="submit">{editing ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditing(null) }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg overflow-hidden group">
            <div className="aspect-square bg-cream flex items-center justify-center relative">
              <span className="text-gray-400 text-sm">{item.imageUrl ? "[Image]" : "No Image"}</span>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(item)} className="bg-white p-1.5 rounded shadow hover:text-gold">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="bg-white p-1.5 rounded shadow hover:text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-medium truncate">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.category?.name || "No category"}</p>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No gallery items yet.
          </div>
        )}
      </div>
    </div>
  )
}
