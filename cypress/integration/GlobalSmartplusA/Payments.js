/// <reference types="cypress" />

describe("Payments Specifcation of Global Smart Plus", ()=>{



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
    // it('Successful mobile topup', function(){
    //     // cy.visit('/dashboard/payment')
    //     cy.get('[href="/dashboard/payment"] > .container > .linkIconWrapper').click()
    //     cy.wait(2000)
    //     cy.get('[href="/dashboard/payment/topup"] > .listView').click()
        
    //     cy.get('.logo-top')
    //     cy.log(cy.get('.logo-top'))
    //     cy.get('.dashboard__content').then((w)=>
    //     {
    //         cy.get('.input-group > .form-control').type('9811235917')
    //     })
        
    //     cy.get('.input-group > .form-control').type('9811235917')
    //     cy.get('.form-group > .form-control').type('10')
    //     cy.get('.button').click()
    //     cy.get('.d-flex > div > .btn-primary',{timeout:10000}).then((w)=>{
    //         cy.get('.d-flex > div > .btn-primary').click()
    //     cy.get('.form-control').then(w => {
    //         var otp = window.prompt("Enter your OTP: ");
    //         cy.get('.form-control').type(otp)
    //     })
    //     cy.get('.input-group-append > .btn-primary').click({ force: true })
    //     })
    //     cy.get('.ml-auto > .add-accounts-btn',{timeout:10000}).click().then(()=>{
    //         cy.log('Transaction report successfully downloaded')
    //     })
        
    // });

    // it('Cable car booking', function () {
    //     cy.visit('/dashboard/payment')
    //     cy.wait(1000)
    //     cy.fixture('credentials').then((cred)=>{
    //         this.cred = cred;
        
    //     cy.get('[href="/dashboard/payment/cableCar"] > .listView').click()
    //     cy.wait(1000)
    //     cy.get('[href="/dashboard/payment/cableCar/manakamana"] > .listView').click()
    //     cy.wait(1000)
    //     cy.get(':nth-child(1) > :nth-child(3) > .input-group > .input-group-append > .btn',{timeout:100000}).wait(1000).click()
    //     .then(()=>{
    //     cy.get('.input-group > .form-control').type('Sagar')
    //     cy.wait(1000)
    //     cy.get(':nth-child(4) > :nth-child(2) > .form-control').type(this.cred.email)
    //     cy.wait(1000)
    //     cy.get('.button').click()
    //     cy.wait(1000)
    //     cy.paymentOTPtxn();
        
    //     })
    // });

    it.only('Merchant payment', function () {
        cy.visit('/dashboard/payment/merchant')
        cy.wait(1000)
        cy.fixture('credentials').then((cred)=>{
            this.cred = cred;
        cy.get('.input-group > .form-control').select('Binup Pay')
        cy.get('.col-md-6 > .form-control').type(this.cred.amount)
        cy.get('.button').click()
        cy.paymentOTPtxn();
        })
        })
        })
    // })
// })