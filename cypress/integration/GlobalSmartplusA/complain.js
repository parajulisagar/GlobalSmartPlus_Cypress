/// <reference types="cypress" />

describe("Complain Specification of Global Smart Plus", ()=>{
   
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
                    cy.Clogin(this.cred.email, this.cred.password);      
                    }
            }
            else if ($body.find('[data-test="userDataField"]').length > 0) {   //evaluates as true
                cy.Clogin(this.cred.email, this.cred.password);      
                }
        })
    });
    it('Should display error message and red border around both complain or feedback and complain category', function() {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
    
        cy.get('.form-row > :nth-child(1) > .form-control').click().type(this.cred.email)
        cy.get('.button').click()
        cy.get(':nth-child(2) > .invalid-feedback').contains('Please select category')
        cy.get(':nth-child(3) > .invalid-feedback').contains('Description can\'t be blank')
    })
    });
    it('Should display error message and red border around both Email address and complain category', function() {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.wait(2000)
        cy.get(':nth-child(3) > .form-control').click().type('Automation Complain by sagar parajuli')
        cy.get('.button').click()
        cy.get(':nth-child(2) > .invalid-feedback').contains('Please select category')
        cy.get(':nth-child(1) > .invalid-feedback').contains('Email can\'t be blank')
    })
    });
    it('Should display error message and red border around both complain or feedback and Email Address', function ()  {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.get('[name="categoryName"]').select('E-Bannking')
        cy.get('.button').click()
        cy.get(':nth-child(1) > .invalid-feedback').contains('Email can\'t be blank')
        cy.get(':nth-child(3) > .invalid-feedback').contains('Description can\'t be blank')
    })
    });

    it('Should display error message and red border around all three mendatory field', function()  {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.get('.button').click()
        cy.get(':nth-child(1) > .invalid-feedback').contains('Email can\'t be blank')
        cy.get(':nth-child(2) > .invalid-feedback').contains('Please select category')
        cy.get(':nth-child(3) > .invalid-feedback').contains('Description can\'t be blank')
    })
    });

    it('Should display error message and red border around complain or feedback', function() {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.get('.form-row > :nth-child(1) > .form-control').click().type(this.cred.email)
        cy.get('[name="categoryName"]').select('E-Bannking')
        cy.get('.button').click()
        cy.get(':nth-child(3) > .invalid-feedback').contains('Description can\'t be blank')
    })
});
    it('Should display error message and red border around Email Address', function() {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.get('[name="categoryName"]').select('E-Bannking')
        cy.get(':nth-child(3) > .form-control').type('Automation Complain by sagar parajuli')
        cy.get('.button').click()
        cy.get(':nth-child(1) > .invalid-feedback').contains('Email can\'t be blank')
    })
});
    it('Should display error message and red border around complain category', function() {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.get('.form-row > :nth-child(1) > .form-control').click().type(this.cred.email)
        cy.get(':nth-child(3) > .form-control').type('Automation Complain by sagar parajuli')
        cy.get('.button').click()
        cy.get(':nth-child(2) > .invalid-feedback').contains('Please select category')
    })
});
    it('Successfully complain', function() {
        cy.visit('/dashboard/complain')
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
    
        cy.get('.form-row > :nth-child(1) > .form-control').click().type(this.cred.email)
        cy.get('[name="categoryName"]').select('E-Bannking')
        cy.get(':nth-child(3) > .form-control').type('Automation Complain by sagar parajuli')
        cy.get('.button').click()
        cy.get('.Toastify__toast-body').contains('Complain Sent Successfully')
        cy.get('.Toastify__close-button').click()
        cy.get('.dropdown').click()
        cy.get('span.dropdown-item').click()
    })
    });
   
})