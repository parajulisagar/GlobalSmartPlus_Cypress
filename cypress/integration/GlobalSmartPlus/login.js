/// <reference types="cypress" />

describe("Login Specifcation of Global Smart Plus", ()=>{
 
   

    let invNumber = 9811235917
 
    it('Should display Invalid number',function () {
        cy.visit('')
        cy.get('[data-test="userDataField"]',{timeout:10000}).type(email);
        cy.get('form > :nth-child(4)').click()
        cy.wait(1000);
        cy.get("body").then($body => {
            if ($body.find('.swal-title').length > 0){
                cy.log('sorry User not registered')
                cy.wait(1000)
                cy.get(':nth-child(1) > .swal-button').click()
            }
            else{
                cy.get('[name="password"]').click().type(password);
                cy.get('.button').contains('Login').click();
                if ($body.find('.fade').length > 0){
                    cy.log('Invalid Username and password. You have n attempt left')
                }
                else{
                    cy.log('Login successfully')
                }
            }
        })
    })
})