/// <reference types="cypress" />

describe("Digital Deposit of Global Smart Plus", ()=>{
 
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
                
                cy.get('#ok',{timeout:1000}).click()
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

    it('Digital Deposit reuest GIBL', function () {
        cy.visit('/dashboard/digital-deposit/request')
        cy.get('.form-row > :nth-child(1) > .form-control').select(1)
        cy.get(':nth-child(2) > .form-control').select(1)
        cy.get(':nth-child(6) > .form-control').select(3)
        
        cy.get('.button').click().wait(5000).then((w)=>{
            cy.get('tbody > :nth-child(3) > :nth-child(2) > .form-control').type('1', {force:true})
            cy.get(':nth-child(3) > :nth-child(1) > :nth-child(2) > .form-check > .form-check-input').click()
            cy.get(':nth-child(3) > .form-group > .form-control').clear().type('9842605061')
            cy.get('.text-primary').click()
            cy.get('.modal-footer > .btn-primary').click()
            cy.get('.button').click() 
        })
    })
})
