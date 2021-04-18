/// <reference types="Cypress" />
describe("Form test", () => {
  //

context('Reqres API test', () => {

  let user
  //Method  to authenticate User. 
  //User credentials are taken from separate file (cypress.json)
    const login = () =>
      cy.request({
        url: '/login',
        method: 'POST',
        body: Cypress.env('user')
      }).its('body')
        .then((res) => {
          user = res
        })

    beforeEach(() => {
      login()
    })

  describe('CRUD user test', () => {
    // 

    it("GET - fetch user list", () => {

      cy.request({
        url: '/users?page=2',
        auth: {
          bearer: user.token,
        },
      }).then((res => {
      	expect(res.body).to.not.be.null
        expect(res.status).to.eq(200)
      }))
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
    })

    it("POST - Create new user", () => {

      cy.request({
        url: '/users',
        method: 'POST',
        auth: {
          bearer: user.token,
        },
        body:{
        	'name': 'morpheus',
        	'job': 'leader',
        }
      }).then((res => {
        expect(res.status).to.eq(201)
        expect(res.body).to.not.be.null
        expect(res.body.name).to.eq('morpheus')
      }))
    })

    it("PUT - update users full name and job title", () => {

      cy.request({
        url: '/users?page=2',
        method: 'PUT',
        auth: {
          bearer: user.token,
        },
        body:{
        	'name': 'morpheus',
        	'job': 'zion resident',
        }
      }).then((res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.not.be.null
        expect(res.body.job).to.eq('zion resident')
      }))
    })

    it("PATCH - additional update of users job title only", () => {

      cy.request({
        url: '/users?page=2',
        method: 'PATCH',
        auth: {
          bearer: user.token,
        },
        body:{
        	'job': 'zion mayor',
        }
      }).then((res => {
        expect(res.status).to.eq(200)
        expect(res.body.job).to.eq('zion mayor')
      }))
      .its('headers')
      .its('content-type')
      .should('include', 'application/json')
    })

    it("DELETE - Delete created user", () => {

      cy.request({
        url: '/users/2',
        method: 'DELETE',
        auth: {
          bearer: user.token,
        },
      }).then((res => {
        expect(res.status).to.eq(204)
        expect(res.body).to.eq("")
      }))
    })

    it("GET - Fetch user list and check created test user has been deleted", () => {
      cy.request({
        url: '/users?page=2',
        auth: {
          bearer: user.token,
        },
      }).then((res => {
        expect(res.status).to.eq(200)
        expect(res.body).to.not.be.null
        expect(res.body.data).to.not.include("morpheus lennord")
      }))
    })

 	 })
   })
});