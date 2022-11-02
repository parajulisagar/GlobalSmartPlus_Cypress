/// <reference types="cypress" />

describe("FundTransfer Specifcation of Global Smart Plus", ()=>{

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

    
    it('GIBL Fund Transfer using Account number', function()  {
        cy.visit('/dashboard/fund-transfer');
        cy.wait(2000);
        cy.get('#tabs-tab-gibl',{timeout:10000}).click()
        cy.get(':nth-child(1) > .manage-linked > .input-group > .form-control',{timeout:100000}).type(this.cred.accountNumber);
        cy.get('#tabs-tabpane-gibl > :nth-child(2) > :nth-child(2) > .form-control',{timeout:100000}).type(this.cred.receiverName);
        cy.get(':nth-child(2) > :nth-child(3) > .form-control',{timeout:100000}).type(this.cred.amount);
        cy.get(':nth-child(2) > :nth-child(4) > .form-control',{timeout:100000}).type('Cypress automation Testing');
        cy.get('#tabs-tabpane-gibl > .button',{timeout:100000}).click()
        cy.wait(4000);
        cy.OTPtxn();
    });


    it('GIBL Fund Transfer using mobile number', function() {
        cy.visit('/dashboard/fund-transfer');
        cy.wait(2000);
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        
        cy.get('#tabs-tab-gibl',{timeout:10000}).click()
        cy.get('#mob_num').click();
        cy.get(':nth-child(1) > .manage-linked > .input-group > .form-control').click().type(this.cred.mobileNumber)
        cy.get('#tabs-tabpane-gibl > :nth-child(2) > :nth-child(2) > .form-control').click().type(this.cred.amount)
        cy.get(':nth-child(2) > :nth-child(3) > .form-control').click().type('Automate fund Transfer')
        cy.get('#tabs-tabpane-gibl > .button').click()
        cy.wait(4000);
        cy.OTPtxn();
    })
    });
    it(' IBFT ', function (){
        cy.visit('/dashboard/fund-transfer');
        cy.wait(2000);
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
      
        cy.get('#tabs-tab-otherBanks').click()
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .css-b62m3t-container > .css-1s2u09g-control > .css-1d8n9bt').click().type('NMB')
        cy.wait(2000)
        cy.get('#react-select-2-option-35').click()
        cy.get(':nth-child(2) > .manage-linked > .input-group > .form-control').type(this.cred.ibftaccountNumber)
        cy.get('#tabs-tabpane-otherBanks > :nth-child(1) > :nth-child(2) > :nth-child(1) > .form-control').type(this.cred.ibftreceiverName)
        cy.get('#tabs-tabpane-otherBanks > :nth-child(1) > :nth-child(2) > :nth-child(2) > .form-control').type(this.cred.amount)
        cy.get(':nth-child(3) > .form-group > .form-control').type('Sagar Testing')
        cy.get('#tabs-tabpane-otherBanks > .button').click()
        cy.wait(4000);
        cy.OTPtxn();
    })
})
})