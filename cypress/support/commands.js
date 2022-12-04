Cypress.Commands.add('Clogin', (Email,Password) => { 
    cy.visit('')
    cy.get('[data-test="userDataField"]',{timeout:10000}).type(Email);
    cy.get('form > :nth-child(4)').click()
    cy.wait(1000);
    cy.get("body").then($body => {
        if ($body.find('.swal-title').length > 0){
            cy.log('sorry User not registered')
            cy.wait(1000)
            cy.get(':nth-child(1) > .swal-button').click()
        }
        else{
            cy.get('[name="password"]').click().type(Password);
            cy.get('.button').contains('Login').click();
            if ($body.find('.fade').length > 0){
                cy.log('Invalid Username and password. You have n attempt left')
            }
            else{
                cy.log('Login successfully')
            }
        }
    })
})

Cypress.Commands.add('OTPtxn', () => { 
    cy.get("body").then($body => {
            
        if ($body.find('.Toastify__toast-body').length > 0) {   //evaluates as true
            cy.log('Display error Message')    
            }
        else{
            cy.get('.d-flex > div > .btn-primary',{timeout:200000}).click().then(w => {
                cy.get('.form-control').then(w => {
            var otp = window.prompt("Enter your OTP: ");
            cy.get('.input-group > .form-control').type(otp)
            cy.wait(2000)
            cy.get("body").then($body => {
                
                if ($body.find(':nth-child(2) > .form-group > .form-control').length > 0){
                    var transPin = window.prompt("Enter your trans pin: ");
                    cy.get(':nth-child(2) > .form-group > .form-control').type(transPin)
                    cy.get(':nth-child(3) > .button').click()
                    cy.wait(2000)
                }
                else{
                    cy.get('.input-group-append > .btn-primary').click()
                }
            })
            cy.get("body").then($body => {
                
                if ($body.find('.noMargin').length > 0){
                    cy.log(' Transaction successfully Completed')
                }
                else{
                    cy.log('Transaction Failed.')
                }
            })
            
            })
            })     
        }
    })
})

Cypress.Commands.add('schedulePayment', () => { 

        
        cy.wait(2000)
        cy.get("body").then($body => {
            
            if ($body.find('.Toastify__toast-body').length > 0) {   //evaluates as true
                cy.log('Display error Message')    
                }
            else{
                cy.get('.d-flex > div > .btn-primary',{timeout:200000}).click().then(w => {
                    cy.get('.form-control').then(w => {
                var otp = window.prompt("Enter your OTP: ");
                cy.get('.input-group > .form-control').type(otp)
                cy.wait(2000)
                cy.get("body").then($body => {
                    
                    if ($body.find(':nth-child(2) > .form-group > .form-control').length > 0){
                        var transPin = window.prompt("Enter your trans pin: ");
                        cy.get(':nth-child(2) > .form-group > .form-control').type(transPin)
                        cy.get(':nth-child(3) > .button').click()
                        cy.wait(2000)
                    }
                    else{
                        cy.get('.input-group-append > .btn-primary').click()
                    }
                })
                cy.wait(2000)
                cy.get("body").then($body => {
                    cy
                    if ($body.find('.input-group > .form-control').length > 0){
                        cy.log('OTP / Transaction failed.')
                    }
                    else{
                        cy.log('Transaction Scheduled Successfully!')
                    }
                })
                
                })
                })     
            }
        })
})
Cypress.Commands.add('paymentOTPtxn', () => { 
    cy.get("body").then($body => {
            
        if ($body.find('.Toastify__toast-body').length > 0) {   //evaluates as true
            cy.log('Display error Message')    
            }
        else{
            cy.get('.d-flex > div > .btn-primary',{timeout:200000}).click().then(w => {
                cy.get('.form-control').then(w => {
            var otp = window.prompt("Enter your OTP: ");
            cy.get('.input-group > .form-control').type(otp)
            cy.wait(2000)
            cy.get("body").then($body => {
                
                if ($body.find(':nth-child(2) > .form-group > .form-control').length > 0){
                    var transPin = window.prompt("Enter your trans pin: ");
                    cy.get(':nth-child(2) > .form-group > .form-control').type(transPin)
                    cy.get('.otp-transaction-view > :nth-child(3) > .button').click()
                    cy.wait(2000)
                }
                else{
                    cy.get('.input-group-append > .btn-primary').click()
                }
            })
            cy.get('.fade',{timeout:10000})
            cy.get("body").then($body => {
                
                if ($body.find('.d-flex > :nth-child(1)').length > 0){
                    cy.log('Payment successfully Completed')
                }
                else{
                    cy.log('Transaction Failed.')
                }
            })
            
            })
            })     
        }
    })
})