/// <reference types="cypress" />

describe("AccountStatement Specifcation of Global Smart Plus", ()=>{
 
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
   

    
    it('Successful statement request', function () {
        cy.visit('/dashboard/account-statement/request')
        cy.get(':nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').click().type('05/29/2022')
        cy.get(':nth-child(2) > .react-datepicker-wrapper > .react-datepicker__input-container > input').click().type('07/12/2022')
        cy.get(':nth-child(3) > .form-control').select('GEETANAGAR BRANCH')
        cy.wait(1000)
        cy.get('.button').click()
        cy.wait(1000)
        cy.get('.modal-footer > .btn-primary').click()
        
    });

})