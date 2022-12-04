/// <reference types="cypress" />

describe("Chequebook Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar123@yopmail.com"
    let password = 'autoTest@0110'

    before(function () {
        cy.visit('')
        cy.wait(2000)
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        })
        cy.get("body").then($body => {
            if ($body.find('.modal-title').length > 0){
                cy.wait(1000)
                cy.get('#ok').click()
                cy.wait(1000)
                if ($body.find('[data-test="userDataField"]').length > 0) {   //evaluates as true
                    cy.Clogin(email, password);      
                    }
            }
            else if ($body.find('[data-test="userDataField"]').length > 0) {   //evaluates as true
                cy.Clogin(email, password);      
                }
        })
    });

    it('Schedule payments to GIBL', function () {
        cy.visit('/dashboard/cheque-book/request')
        cy.get('.form-row > :nth-child(1) > .form-control').select(1)
        cy.get(':nth-child(2) > .form-control').select(2)
        cy.get(':nth-child(3) > .form-control').select(2)
        cy.get('.button').click()
        cy.get('.modal-footer > .btn-primary').click()
    })
})
