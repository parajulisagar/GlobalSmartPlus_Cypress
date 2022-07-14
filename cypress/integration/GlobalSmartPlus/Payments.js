/// <reference types="cypress" />

describe("FundTransfer Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar@yopmail.com"
    let password = 'autoTest@0110'


    before(() => {
        cy.visit('');
        cy.Clogin(email, password);
    });
    it('Successful mobile topup', () => {
        cy.visit('/dashboard/payment')
        cy.get('[href="/dashboard/payment/topup"] > .listView').click()
        cy.get('.form-control').type("9849650000")
        cy.get('.form-group > .form-control').type('10')
        cy.get('.button').click()
        cy.get('.d-flex > div > .btn-primary',{timeout:10000}).then((w)=>{
            cy.get('.d-flex > div > .btn-primary').click()
        cy.get('.form-control').then(w => {
            var otp = window.prompt("Enter your OTP: ");
            cy.get('.form-control').type(otp)
        })
        cy.get('.input-group-append > .btn-primary').click()
        })
        cy.get('.ml-auto > .add-accounts-btn',{timeout:10000}).click().then(()=>{
            cy.log('Transaction report successfully downloaded')
        })
        
    });

    it('Successful Cable car booking', () => {
        cy.visit('/dashboard/payment')
        cy.get('[href="/dashboard/payment/cableCar"] > .listView').click()
        cy.get('[href="/dashboard/payment/cableCar/manakamana"] > .listView').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > :nth-child(3) > .input-group > .input-group-append > .btn',{timeout:100000}).wait(1000).click()
        .then(()=>{
        cy.get('.input-group > .form-control').type('Sagar')
        cy.get(':nth-child(4) > :nth-child(2) > .form-control').type(email)
        cy.get('.button').click()
        cy.get('.d-flex > div > .btn-primary',{timeout:100000}).click()
        cy.get('.form-control').then(w => {
            var otp = window.prompt("Enter your OTP: ");
            cy.get('.form-control').type(otp)
        })
        cy.get('.input-group-append > .btn-primary').click()
        })
        cy.get('.d-flex > :nth-child(1)').click().then(()=>{
            cy.log("Cable car ticket  successfully downloaded")
        })
    });

    // it.only('Successful UtilityPamynet (NEA)', () => {
    //     cy.visit('/dashboard/payment')
    //     cy.get('[href="/dashboard/payment/utilityPayment"] > .listView').click()
    //     cy.get('[href="/dashboard/payment/utilityPayment/electricity"] > .listView').click()
    // });
})