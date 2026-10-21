
import axios from 'axios'

const api = axios.create({
  timeout: 12000,
})

export const endpoints = {
  users: 'https://jsonplaceholder.typicode.com/users',
  posts: 'https://jsonplaceholder.typicode.com/posts',
  comments: 'https://dummyjson.com/comments',
}

// Shuffle all records without removing any.
function shuffleAll(items) {
  const shuffled = [...items]

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  return shuffled
}

export async function fetchDashboardData() {
  const results = await Promise.allSettled([
    api.get(endpoints.users),
    api.get(endpoints.posts),
    api.get(endpoints.comments),
  ])

  const getData = result =>
    result.status === 'fulfilled'
      ? result.value.data
      : null

  const allUsers = getData(results[0]) || []
  const allPosts = getData(results[1]) || []

  const commentsData = getData(results[2])
  const allComments = Array.isArray(commentsData)
    ? commentsData
    : commentsData?.comments || []

  const users = shuffleAll(allUsers)
  const posts = shuffleAll(allPosts)
  const comments = shuffleAll(allComments)

  const names = ['Users', 'Posts', 'Comments']

  const errors = results
    .map((result, index) =>
      result.status === 'rejected'
        ? `${names[index]} API could not be loaded`
        : null
    )
    .filter(Boolean)

  return {
    users,
    posts,
    comments,
    errors,
  }
}
