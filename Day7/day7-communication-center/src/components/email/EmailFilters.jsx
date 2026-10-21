
export default function EmailFilters({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <input
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search recipient or subject..."
        aria-label="Search emails"
      />

      <select
        value={status}
        onChange={event => setStatus(event.target.value)}
        aria-label="Filter emails"
      >
        <option value="all">All statuses</option>
        <option value="sent">Sent</option>
        <option value="draft">Drafts</option>
        <option value="failed">Failed</option>
      </select>

      <select
        value={sort}
        onChange={event => setSort(event.target.value)}
        aria-label="Sort emails"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="recipient">Recipient A–Z</option>
      </select>
    </div>
  )
}
