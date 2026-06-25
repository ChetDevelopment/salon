"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { serviceSchema, type ServiceFormData } from "@/lib/validations"
import { formatPrice, slugify } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"

interface Service {
  id: string
  name: string
  slug: string
  description: string
  price: number
  duration: number
  image: string | null
  categoryId: string
  isActive: boolean
  category: { id: string; name: string }
}

interface Category {
  id: string
  name: string
}

export function ServicesManager({ services: initialServices, categories }: { services: Service[]; categories: Category[] }) {
  const [services, setServices] = useState(initialServices)
  const [editing, setEditing] = useState<Service | null>(null)
  const [showForm, setShowForm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
  })

  const startEdit = (service: Service) => {
    setEditing(service)
    setValue("name", service.name)
    setValue("description", service.description)
    setValue("price", service.price)
    setValue("duration", service.duration)
    setValue("categoryId", service.categoryId)
    setValue("isActive", service.isActive)
    setValue("image", service.image || "")
    setShowForm(true)
  }

  const startCreate = () => {
    setEditing(null)
    reset({ isActive: true })
    setShowForm(true)
  }

  const onSubmit = async (data: ServiceFormData) => {
    const url = editing ? `/api/services/${editing.id}` : "/api/services"
    const method = editing ? "PUT" : "POST"

    const body = { ...data, slug: slugify(data.name) }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      const updated = await res.json()
      if (editing) {
        setServices(services.map((s) => (s.id === editing.id ? { ...s, ...updated } : s)))
      } else {
        setServices([updated, ...services])
      }
      setShowForm(false)
      setEditing(null)
      reset()
    } else {
      const err = await res.json()
      alert(err.error || "Failed to save service")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    const res = await fetch(`/api/services/${id}`, { method: "DELETE" })
    if (res.ok) {
      setServices(services.filter((s) => s.id !== id))
    } else {
      alert("Failed to delete service")
    }
  }

  const handleToggleActive = async (service: Service) => {
    const res = await fetch(`/api/services/${service.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !service.isActive }),
    })

    if (res.ok) {
      setServices(services.map((s) => (s.id === service.id ? { ...s, isActive: !s.isActive } : s)))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{services.length} services</p>
        <Button onClick={startCreate} size="sm">
          <Plus className="h-4 w-4 mr-1" /> Add Service
        </Button>
      </div>

      {showForm && (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">{editing ? "Edit Service" : "New Service"}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="name"
                label="Service Name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Select
                id="categoryId"
                label="Category"
                placeholder="Select category"
                options={categories.map((c) => ({ value: c.id, label: c.name }))}
                error={errors.categoryId?.message}
                {...register("categoryId")}
                onChange={(e) => setValue("categoryId", e.target.value)}
              />
            </div>
            <Textarea
              id="description"
              label="Description"
              error={errors.description?.message}
              {...register("description")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                id="price"
                label="Price ($)"
                type="number"
                step="0.01"
                error={errors.price?.message}
                {...register("price")}
              />
              <Input
                id="duration"
                label="Duration (minutes)"
                type="number"
                error={errors.duration?.message}
                {...register("duration")}
              />
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

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Price</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Duration</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.map((service) => (
              <tr key={service.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium">{service.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{service.category.name}</td>
                <td className="px-4 py-3 text-sm">{formatPrice(Number(service.price))}</td>
                <td className="px-4 py-3 text-sm text-gray-600">{service.duration} min</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleActive(service)}
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      service.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => startEdit(service)} className="p-1 hover:text-gold">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(service.id)} className="p-1 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No services yet. Click &ldquo;Add Service&rdquo; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
