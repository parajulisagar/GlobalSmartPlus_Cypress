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
    
    it.only('Schedule payments to GIBL', function() {
        cy.visit('/dashboard/schedule-payment')
        cy.get('.select-account',{timeout:10000}).click()
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(1) > .form-control').type('Sagar Parajuli')
        cy.get(':nth-child(2) > .manage-linked > .input-group > .form-control').type('3308010001590')
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(3) > .form-control').type('SARITA DEVI SHARMA')
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(4) > .form-control').select('Single Time').should('have.value','ONETIME')
        cy.get(':nth-child(5) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
            cy.get(':nth-child(161)').click({force: true})
        })
        cy.schedulePayment()
    });
})
