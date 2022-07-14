cy.get(':nth-child(3) > .form-control').type('Automation Complain by sagar parajuli')
cy.get('.button').click()
cy.get('.Toastify__toast-body').contains('Complain Sent successfully')