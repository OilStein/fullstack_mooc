/* eslint-disable jest/expect-expect */
describe('Blog', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Niko',
      username: 'Oil',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login page can be opened', () => {
    cy.contains('Log in to App')
  })

  it('login fail', () => {
    cy.get('#username').type('Oil')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.contains('wrong username or password')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'Oil', password: 'salainen' })
    })

    it('a new blog can be created', () => {
      cy.contains('create blog').click()
      cy.get('#title').type('Testing brokes systems')
      cy.get('#author').type('Ters')
      cy.get('#url').type('/broken')
      cy.get('#create-button').click()
      cy.contains('Testing brokes systems')
    })

    describe('blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'Cypress',
          author: 'Hill',
          url: '/ch'
        })
        cy.createBlog({
          title: 'Cypres',
          author: 'Hil',
          url: '/ceh'
        })
        cy.createBlog({
          title: 'Cpress',
          author: 'Hll',
          url: '/chewq'
        })
      })

      it('give a like', () => {
        cy.contains('show')
          .click()

        cy.contains('like')
          .click()

        cy.contains('1')
      })

      it('current user can delete blog', () => {
        cy.contains('show').click()
        cy.contains('remove').click()
        cy.contains('deleted')
      })
    })
  })
})
