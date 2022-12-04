/// <reference types="cypress" />

describe("Fixed deposit of Global Smart Plus", ()=>{
 
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

    it('Fixed deposit to GIBL',function () {
        cy.visit('/dashboard/fixed-deposit')
        cy.get(':nth-child(1) > .fd-list-container > .card > .card-body > :nth-child(1) > :nth-child(2) > .row > :nth-child(2) > .pl-4 > .button-container > button.mr-3',{timeout: 100000}).click({force:true})
        cy.get('.form-row > :nth-child(1) > .form-control').select(1)
        cy.get(':nth-child(3) > .form-control').type('1000')
        cy.get(':nth-child(4) > .form-control').type('12344143')
        cy.get(':nth-child(5) > .form-control').type('Sagar Testing')
        cy.get('.pt-0').click()
        cy.get('.modal-footer > .btn').click()
        cy.get('.button').click().then(w => {
            cy.get('.form-control').then(w => {
        var otp = window.prompt("Enter your OTP: ");
        cy.get('.input-group > .form-control').type(otp)
        })
        })
    })
})
