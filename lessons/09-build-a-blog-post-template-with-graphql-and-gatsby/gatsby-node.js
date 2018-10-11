const path = require('path')


exports.createPages = (({graphql, actions}) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve('src/templates/blogPost.js') 

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                  }
                }
              }
            }
          }
        `
      ).then(result => {

        result.data.allMarkdownRemark.edges.forEach(({node}) => {
          const path = node.frontmatter.path
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path
            }
          })

          resolve()
        })
      })
    )
  })
})
