/// <reference types="cypress" />

describe("Schedule payment of Global Smart Plus", ()=>{
    before(function () {
        cy.visit('https://emrtds.nepalpassport.gov.np/')
        cy.wait(2000)
    });

 
it('Single Time Schedule payments to Other Banks', function() { 
    cy.get(':nth-child(1) > .iups-service-box',{timeout:10000}).click()
    cy.get(':nth-child(2) > :nth-child(1) > .radio-label',{timeout:10000}).click()
    cy.wait(1000)
    cy.get(':nth-child(2) > .btn',{timeout:5000}).click()
    cy.get('#mat-select-2',{timeout:1000000}).click()
    cy.get('#mat-input-1').type('Gandaki')
    cy.get('#mat-option-18').click()
    cy.get('#mat-select-3',{timeout:1000}).click()
    cy.get('#mat-input-3').type('Baglung')
    cy.get('#mat-option-45').click()
    cy.get('#mat-select-4',{timeout:1000}).click()
    cy.get('#mat-input-1').type('Baglung')
    cy.get('#mat-option-20').click()
    
})


})
