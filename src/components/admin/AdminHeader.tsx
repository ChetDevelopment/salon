"use client"

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">Welcome back{user.name ? `, ${user.name}` : ""}</h2>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{user.name || "Admin"}</p>
          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
        </div>
        <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-medium text-sm">
          {(user.name || "A").charAt(0).toUpperCase()}
        </div>
      </div>
    </header>
  )
}
