
describe("Select the monthly support option and test error handling on the payment page when the transaction is declined", () => {


it('navigates to the reqres homepage and selects monthly support option', () => {
  cy.visit('https://reqres.in/#support-heading')
  cy.get('#supportRecurring').click()
})


it('(CC Declined) opens the redirect URL to payment pathway and fills out the payment form', () => {

  cy.visit('https://checkout.stripe.com/pay/cs_live_a1RkD6YBdZ8W6sSzGYpRJSxgUd8eV7fi7hvwMHqaNuCpD3J6QInhEBtLtT#fidkdWxOYHwnPyd1blppbHNgWjA0TWhqUzRDcm98bHZHRHZzZG4yS1FxXVRBfXZrf1xIf3FmNTNLNnxvZjJPUzBMbUZNPWM0RE99NjJoR2A9dk1%2Fd1ZiRm49NV1AUFFEfWE9XGJBR25WY3QzNTVqVGlWYm1LRicpJ2hsYXYnP34nYnBsYSc%2FJ2M0MDIxNWBjKDMzPWQoMTw9MyhnPTNhKGNmNTRnNz1hMjUyNTdgPGZgYScpJ2hwbGEnPyc8N2c1PGRkPSgwMjRkKDE2ZjwoZ2E2PCg1NDxmNjZnMGQ9PTNkMjQxMTQnKSd2bGEnPydgY2c3PTYyPSgzMjYxKDFnMTcoPTc2NigzPTM9MzVkNDJhPTA3ZDYzMjQneCknZ2BxZHYnP15YKSdpZHxqcHFRfHVgJz8ndmxrYmlgWmxxYGgnKSd3YGNgd3dgd0p3bGJsayc%2FJ21xcXV2Pyoqd2B0d2B2K2xrJ3gl')
    
    //fill out payment details form with incomplete card number
    cy.get('[name=email]').type('sagehq@mailinator.com')
    cy.get('[name=cardNumber]').type('4111 1111 1111')
    cy.get('[name=cardExpiry]').type('11/22')
    cy.get('[name=billingName]').type('sage A')

 	cy.get('#cardNumber-fieldset > div:nth-child(4)').should('have.text', 'Your card number is incomplete.')

    //assert validation error appears
    cy.get('div').contains('Your card number is incomplete.')

    //clear credit card input and enter valid details (card declined case)
    cy.get('[name=cardNumber]').clear()
    cy.get('[name=cardNumber]').type('4111 1111 1111 1111')
    cy.get('[name=cardCvc]').type('333')

    cy.findByText('Subscribe').click({force: true})
    
    //assert validation error appears when card entered is declined
    cy.get('#cardNumber-fieldset > div:nth-child(4)').should('have.text', 'Your card has been declined.')

	})
});