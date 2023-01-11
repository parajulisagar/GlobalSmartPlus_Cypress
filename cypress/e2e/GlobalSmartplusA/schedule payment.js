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
        
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
        cy.get(':nth-child(2) > .manage-linked > .input-group > .form-control').type(this.cred.accountNumber)
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(3) > .form-control').type(this.cred.receiverName)
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(4) > .form-control').select('Single Time').should('have.value','ONETIME')
        cy.get(':nth-child(5) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
            cy.get(':nth-child(161)').click({force: true})
        })
        cy.get(':nth-child(6) > .form-control').type(this.cred.amount)
            
        cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(7) > .form-control').type('Sagar Testing')
        cy.get('#tabs-tabpane-gibl > .button').click()
        cy.schedulePayment()
    });
})

it('Recurring Schedule payments to GIBL', function() {
    cy.visit('/dashboard/schedule-payment')
    cy.get('.select-account',{timeout:100000}).click()
    cy.fixture('credentials').then((cred)=>{
        this.cred = cred;
    
    cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
    cy.get(':nth-child(2) > .manage-linked > .input-group > .form-control').type(this.cred.accountNumber)
    cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(3) > .form-control').type(this.cred.receiverName)
    cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(4) > .form-control').select('Recurring').should('have.value','MULTITIME')
    cy.get(':nth-child(6) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
        cy.get(':nth-child(161)').click({force: true})
    })
    cy.get(':nth-child(7) > .form-control').type(this.cred.amount)
    cy.get('#tabs-tabpane-gibl > .form-row > :nth-child(8) > .form-control').type('Automation using cypress')
    cy.get('#tabs-tabpane-gibl > .button').click()
    cy.schedulePayment()
});
})


it('Recurring Schedule payments to Other Banks', function() {
    cy.visit('/dashboard/schedule-payment')
    cy.get('.select-account',{timeout:100000}).click()
    cy.get('#tabs-tab-otherBanks').click()
    cy.fixture('credentials').then((cred)=>{
        this.cred = cred;
    
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(2) > .form-control').select('NMB Bank Limited')
    cy.get(':nth-child(3) > .manage-linked > .input-group > .form-control').type(this.cred.ibftaccountNumber)
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(4) > .form-control').type(this.cred.ibftreceiverName)
    cy.get(':nth-child(5) > .form-control').select('Recurring').should('have.value','MULTITIME')
    cy.get(':nth-child(7) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
        cy.get(':nth-child(161)').click({force: true})
    })
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(8) > .form-control').type(this.cred.amount)
    cy.get(':nth-child(9) > .form-control').type('Automation using cypress')
    cy.get('#tabs-tabpane-otherBanks > .button').click()
    cy.schedulePayment()
});
})

it('Single Time Schedule payments to Other Banks', function() {
    cy.visit('/dashboard/schedule-payment')
    cy.get('.select-account',{timeout:100000}).click()
    cy.get('#tabs-tab-otherBanks').click()
    cy.fixture('credentials').then((cred)=>{
        this.cred = cred;
    
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(2) > .form-control').select('NMB Bank Limited')
    cy.get(':nth-child(3) > .manage-linked > .input-group > .form-control').type(this.cred.ibftaccountNumber)
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(4) > .form-control').type(this.cred.ibftreceiverName)
    cy.get(':nth-child(5) > .form-control').select('Single Time').should('have.value','ONETIME')
    cy.get(':nth-child(6) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
        cy.get(':nth-child(161)').click({force: true})
    })
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(7) > .form-control').type(this.cred.amount)
    cy.get('#tabs-tabpane-otherBanks > .form-row > :nth-child(8) > .form-control').type('Automation testing using cypress')
    cy.get('#tabs-tabpane-otherBanks > .button').click()
    cy.schedulePayment()
});
})

it('Single Time Schedule payments to Merchant', function() {
    cy.visit('/dashboard/schedule-payment')
    cy.get('.select-account',{timeout:100000}).click()
    cy.get('#tabs-tab-merchant').click()
    cy.fixture('credentials').then((cred)=>{
        this.cred = cred;
    
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(2) > .form-control').select('NTC Postpaid')
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(3) > .form-control').type(this.cred.amount)
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(4) > .form-control').type(this.cred.topUpNumber)
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(5) > .form-control').select('Single Time').should('have.value','ONETIME')
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(6) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
        cy.get(':nth-child(161)').click({force: true})
    })
    cy.get('#tabs-tabpane-merchant > .button').click()
    cy.schedulePayment()
});
})

it.only('Recurring Schedule payments to Merchant', function() {
    cy.visit('/dashboard/schedule-payment')
    cy.get('.select-account',{timeout:100000}).click()
    cy.get('#tabs-tab-merchant').click()
    cy.fixture('credentials').then((cred)=>{
        this.cred = cred;
    
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(1) > .form-control').type(this.cred.fullName)
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(2) > .form-control').select('NTC Postpaid')
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(3) > .form-control').type(this.cred.amount)
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(4) > .form-control').type(this.cred.topUpNumber)
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(5) > .form-control').select('Recurring').should('have.value','MULTITIME')
    cy.get('#tabs-tabpane-merchant > .form-row > :nth-child(7) > .date-picker-time > .react-datepicker-wrapper > .react-datepicker__input-container > input').type(tomorrow).then((w)=>{
        cy.get(':nth-child(161)').click({force: true})
    })
    cy.get('#tabs-tabpane-merchant > .button').click()
    cy.schedulePayment()
});
})

})
