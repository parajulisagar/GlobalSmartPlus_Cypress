/// <reference types="cypress" />

describe("FundTransfer Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar@yopmail.com"
    let password = 'autoTest@0110'


    before(() => {
        cy.visit('');
        cy.Clogin(email, password);
    });
    it('Successful statement request', () => {
        cy.visit('/dashboard/account-statement/request')
        cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').click().type('05/29/2022')
        cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').click().type('07/12/2022')
        cy.get('select').select('GEETANAGAR BRANCH')
        cy.wait(1000)
        cy.get('.button').click()
        cy.wait(1000)
        cy.get('.modal-footer > .btn-primary').click()
        
    });

})