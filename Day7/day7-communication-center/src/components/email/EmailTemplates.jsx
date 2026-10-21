
export const templates = [
  {
    name: 'Welcome',
    subject: 'Welcome aboard!',
    message: 'Hi there,\n\nWelcome! We are glad to have you with us.\n\nBest regards',
  },
  {
    name: 'Follow-up',
    subject: 'Following up',
    message: 'Hello,\n\nI wanted to follow up on our recent conversation.\n\nBest regards',
  },
  {
    name: 'Announcement',
    subject: 'An important update',
    message: 'Hello everyone,\n\nWe have an important update to share with you.\n\nThank you',
  },
]

export default function EmailTemplates({ onChoose }) {
  return (
    <section className="panel p-5">
      <h2 className="mb-4 font-semibold">Quick templates</h2>
      <div className="grid gap-2 sm:grid-cols-3">
        {templates.map(template => (
          <button
            key={template.name}
            onClick={() => onChoose(template)}
            className="rounded-xl border border-[#30394d] p-3 text-left hover:border-indigo-400/60"
          >
            <p className="text-sm font-semibold">{template.name}</p>
            <p className="mt-1 text-xs muted">{template.subject}</p>
          </button>
        ))}
      </div>
    </section>
  )
}
