const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item
  const mapper = b => b.likes
  return blogs.length === 0 ? 0 : blogs.map(mapper).reduce(reducer)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const reducer = (max, val) => max.likes < val.likes ? val : max
  const blog = blogs.reduce(reducer)
  const transform = (val) => {
    return { title: val.title, author: val.author, likes: val.likes }
  }
  return transform(blog)
}

const mostBlog = (blogs) => {
  if (blogs.length === 0) return null

  const counter = {}
  for (const blog of blogs) {
    counter[blog.author] = (counter[blog.author] || 0) + 1
  }

  let mostFrequentAuthor = null
  let maxValue = 0

  for (const author in counter) {
    if (maxValue < counter[author]) {
      mostFrequentAuthor = author
      maxValue = counter[author]
    }
  }

  return {
    author: mostFrequentAuthor,
    blogs: counter[mostFrequentAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlog
}
