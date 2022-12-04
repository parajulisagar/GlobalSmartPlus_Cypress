/// <reference types="cypress" />

describe("Schedule payment of Global Smart Plus", ()=>{
 
    var tomorrow = new Date();
    
    var dd = String(tomorrow.getDate()+1).padStart(2, '0');
    var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tomorrow.getFullYear();
    tomorrow = mm + '-' + dd + '-' + yyyy;


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
    
    it('Single time Schedule payments to GIBL', function() {
        cy.visit('/dashboard/schedule-payment')
        cy.get('.select-account',{timeout:100000}).click()
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        var day = 20
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
        cy.get(':nth-child(2) > .manage-linked > .input-group > .form-control').type(this.cred.accountNumber)
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(3) > .form-control').type(this.cred.receiverName)
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(4) > .form-control').select('Single Time').should('have.value','ONETIME')
        cy.get('.d-flex > div > .btn-primary',{timeout:10000000000}).click()
       
    });
})

})
