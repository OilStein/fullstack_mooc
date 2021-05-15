const dummy = (...blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, item) => acc + item.likes, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
