"use client"

import { useState } from "react"
import { formatDate, formatTime, getBookingStatusColor, formatPrice } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Search, CheckCircle, XCircle, Clock, ChevronDown } from "lucide-react"

interface Booking {
  id: string
  serviceId: string
  service: { name: string; price: number; duration: number }
  customerName: string
  customerEmail: string
  customerPhone: string
  date: string
  time: string
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  notes: string | null
}

export function BookingsManager({ bookings: initialBookings }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState(initialBookings)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "ALL" || b.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })

    if (res.ok) {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: status as any } : b)))
    }
  }

  const statuses = ["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                statusFilter === s ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Customer</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Service</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Date & Time</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium">{booking.customerName}</p>
                  <p className="text-xs text-gray-500">{booking.customerEmail}</p>
                  <p className="text-xs text-gray-500">{booking.customerPhone}</p>
                </td>
                <td className="px-4 py-3 text-sm">
                  <p>{booking.service.name}</p>
                  <p className="text-xs text-gray-500">{formatPrice(Number(booking.service.price))}</p>
                </td>
                <td className="px-4 py-3 text-sm">
                  <p>{formatDate(booking.date)}</p>
                  <p className="text-xs text-gray-500">{formatTime(booking.time)}</p>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-1 rounded ${getBookingStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    {booking.status === "PENDING" && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, "CONFIRMED")}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          title="Confirm"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, "CANCELLED")}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Cancel"
                        >
                          <XCircle className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {booking.status === "CONFIRMED" && (
                      <button
                        onClick={() => updateStatus(booking.id, "COMPLETED")}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="Mark Complete"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
