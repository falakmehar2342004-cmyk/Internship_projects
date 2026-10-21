
export default function UsersPanel({ users = [] }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-4 font-semibold">
        Users <span className="badge">{users.length}</span>
      </h2>

      <div className="space-y-3">
        {users.slice(0, 8).map(user => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-full bg-indigo-400/15 text-sm font-bold text-indigo-200">
              {user.name?.[0] || '?'}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{user.name}</p>
              <p className="truncate text-xs muted">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
