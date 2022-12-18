/// <reference types="cypress" />

describe("Login Specifcation of Global Smart Plus", ()=>{
 
    it('Should display Invalid number',function () {
        cy.visit('https://dev-customer.swifttech.com.np')
        cy.get('[data-test="userDataField"]').type(Email);
        cy.get('form > :nth-child(4)').click()
        cy.wait(1000);
        
        cy.get('[name="password"]').click().type(Password);
        cy.get('.button').contains('Login').click();
                
        })
    })