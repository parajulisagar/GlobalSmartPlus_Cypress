/// <reference types="cypress" />

describe("FundTransfer Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar@yopmail.com"
    let password = 'autoTest@0110'

    let invpw='ajsgdsjfasdkjasfiuew'
    let invemail='paraju@gmail.com'
   

    // let email = userdata.email
    // let password = userdata.password

    let accno = 3307010894241
    let amt = 5000
    let name = 'SHACHIN BAJIMAYA'
    before(() => {
        cy.visit('');
        cy.Clogin(email, password);
    });
    it('Succcessful GIBL Fund Transfer using mobile number', () => {
        cy.visit('/dashboard/fund-transfer');
        cy.wait(2000);
        cy.get(':nth-child(1) > .manage-linked > .input-group > .form-control').type(accno);
        cy.wait(2000);
        cy.get('#tabs-tabpane-gibl > :nth-child(2) > :nth-child(2) > .form-control').type(name);
        cy.wait(2000);
        cy.get(':nth-child(2) > :nth-child(3) > .form-control').type(amt);
        cy.wait(2000);
        cy.get(':nth-child(2) > :nth-child(4) > .form-control').type('Cypress Testing');
        cy.wait(2000);
        cy.get('#tabs-tabpane-gibl > .button').click()
        cy.wait(2000);
        cy.get('.d-flex > div > .btn-primary').click().then(w => {
            cy.get('.form-control').then(w => {
        var otp = window.prompt("Enter your OTP: ");
        cy.get('.form-control').type(otp)
        })
        }).then(()=>{
            var transPin = window.prompt("Enter your OTP: ");
            cy.get('.form-group > .form-control').type(transPin)
        })

        cy.get(':nth-child(3) > .button').click()
    });
    it('Succcessful GIBL Fund Transfer using mobile number', () => {
        cy.visit('/dashboard/fund-transfer');
        cy.wait(2000);
        cy.get('#mob_num').click();
        cy.get(':nth-child(1) > .manage-linked > .input-group > .form-control').click().type('9846823853')
        cy.get('#tabs-tabpane-gibl > :nth-child(2) > :nth-child(2) > .form-control').click().type('1000')
        cy.get(':nth-child(2) > :nth-child(3) > .form-control').click().type('Automate fund Transfer')
        cy.get('#tabs-tabpane-gibl > .button').click()
        cy.wait(3000)
        cy.get('.d-flex > div > .btn-primary').click()
        cy.wait(2000)
        cy.get('.form-control').then(w => {
            var otp = window.prompt("Enter your OTP: ");
            cy.get('.form-control').type(otp)
            }).then(()=>{
                var transPin = window.prompt("Enter your OTP: ");
                cy.get('.form-group > .form-control').type(transPin)
            })
    });
    it.only('Succcessful IBFT using mobile number', () => {
        cy.visit('/dashboard/fund-transfer');
        cy.wait(2000);
        cy.get('#tabs-tab-otherBanks').click()
        cy.get(':nth-child(1) > :nth-child(1) > :nth-child(1) > .css-b62m3t-container > .css-1s2u09g-control > .css-1d8n9bt').click()
    });
    
})