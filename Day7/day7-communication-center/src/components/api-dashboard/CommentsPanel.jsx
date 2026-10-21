
export default function CommentsPanel({ comments = [] }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-4 font-semibold">
        Comments <span className="badge">{comments.length}</span>
      </h2>

      <div className="space-y-3">
        {comments.slice(0, 6).map(comment => (
          <article
            key={comment.id}
            className="border-b border-[#252e43] pb-3 last:border-0"
          >
            <p className="text-sm font-medium">
              {comment.user?.username ||
                comment.name ||
                `Comment #${comment.id}`}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 muted">
              {comment.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
