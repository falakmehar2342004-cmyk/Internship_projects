
export default function PostsPanel({ posts = [] }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-4 font-semibold">
        Posts <span className="badge">{posts.length}</span>
      </h2>

      <div className="space-y-3">
        {posts.slice(0, 6).map(post => (
          <article
            key={post.id}
            className="border-b border-[#252e43] pb-3 last:border-0"
          >
            <p className="text-sm font-medium capitalize">
              {post.title}
            </p>
            <p className="mt-1 line-clamp-2 text-xs leading-5 muted">
              {post.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
