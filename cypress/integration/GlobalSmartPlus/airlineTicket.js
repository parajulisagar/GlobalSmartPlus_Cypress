/// <reference types="cypress" />

describe("FundTransfer Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar@yopmail.com"
    let password = 'autoTest@0110'
    let Child = '1'
    let Adult = '0'
    let fName = 'SAGAR PARAJULI'
    let mobile = '9842605061'
    let totalPassenger = parseInt(Child)+parseInt(Adult)
    before(() => {
        cy.visit('');
        cy.log(totalPassenger)
        cy.Clogin(email, password);
    });
    
    it('Successful  One way Airline ticket booking', () => {
        cy.visit('/dashboard/airlines/search-flight')
        cy.wait(5000)
        cy.get('[name="SectorFrom"]').select('BHARATPUR')
        cy.wait(1000)
        cy.get('[name="SectorTo"]').select('KATHMANDU')
        cy.get('input').clear().type('2022-08-08')
        cy.wait(1000)
        cy.get('[name="AdultCount"]').select(Adult)
        cy.wait(1000)
        cy.get('[name="ChildCount"]').select(Child)
        cy.wait(1000)
        cy.get('form > .btn').click()
        cy.get(':nth-child(4) > .ticket_wrapper > .book_now',{ timeout: 100000 }).click({ force: true })
        cy.get('[name="fromAccountNumber"]',{ timeout: 100000 }).then((w)=>{
            cy.get('[name="fromAccountNumber"]').select(1)
            cy.get('#ContactPersonName').clear().type(fName)
            cy.get('#ContactPersonMobile').clear().type(mobile)
            cy.get('#ContactPersonEmail').clear().type(email)
        }).then((w)=>{
            cy.get('.passenger_header > .btn',{ timeout: 1000 }).click()
            for (let i = 0; i < totalPassenger; i++) {
                cy.wait(1000)
                cy.get('[name="PassengerList['+`${i}`+'].FullName"]').click().type(fName)
                cy.get('[name="PassengerList['+`${i}`+'].Title"]').select(1)
                cy.get('[name="PassengerList['+`${i}`+'].Nationality"]').select(1)        
                cy.get('.modal-footer > .btn',{ timeout: 10000 }).click() 
            }
            cy.get('.booking_submit').click()
            cy.get('.d-flex > div > .btn-primary').click().then((w)=>{
                cy.get('.form-control').then(w => {
                    var otp = window.prompt("Enter your OTP: ");
                    cy.get('.form-control').type(otp)
                })
            })
            cy.get('.input-group-append > .btn-primary',{ timeout: 10000 }).click()
            cy.log('Now downlaod Ticket')
            cy.get('.d-flex > :nth-child(1)',{ timeout: 1000000 }).click()
            cy.log('Ticket Downloaded Successfully')
        })
    });


    it.only('Successful  One way Airline ticket booking', () => {
        cy.visit('/dashboard/airlines/search-flight',{ timeout: 100000})
        cy.get('#tabs-tab-R',{ timeout: 100000}).click()
        cy.get('[name="SectorFrom"]').select('BHARATPUR')
        cy.wait(1000)
        cy.get('[name="SectorTo"]').select('KATHMANDU')
        cy.get('[placeholder="Select departure date"]').click().clear().type('2022-08-08')
        cy.get('[placeholder="Select return date"]').click().clear().type('2022-08-10')
        cy.wait(1000)
        cy.get('[name="AdultCount"]').select(Adult)
        cy.wait(1000)
        cy.get('[name="ChildCount"]').select(Child)
        cy.wait(1000)
        cy.get('form > .btn').click()
        cy.get('.active_ticket',{ timeout: 100000 }).click()
        cy.get(':nth-child(4) > .ticket_wrapper > .book_now',{ timeout: 100000 }).click({ force: true })
        
        cy.get('[name="fromAccountNumber"]',{ timeout: 100000 }).then((w)=>{
            cy.get('[name="fromAccountNumber"]').select(1)
            cy.get('#ContactPersonName').clear().type(fName)
            cy.get('#ContactPersonMobile').clear().type(mobile)
            cy.get('#ContactPersonEmail').clear().type(email)
        }).then((w)=>{
            cy.get('.passenger_header > .btn',{ timeout: 1000 }).click()
            for (let i = 0; i < totalPassenger; i++) {
                cy.wait(1000)
                
                cy.get('[name="PassengerList['+`${i}`+'].FullName"]').click().type(fName)
                cy.get('[name="PassengerList['+`${i}`+'].Title"]').select(1)
                cy.get('[name="PassengerList['+`${i}`+'].Nationality"]').select(1)        
                cy.get('.modal-footer > .btn',{ timeout: 10000 }).click()
                
            }
            
            cy.get('.booking_submit').click()
            cy.get('.d-flex > div > .btn-primary').click().then((w)=>{
                cy.get('.form-control').then(w => {
                    var otp = window.prompt("Enter your OTP: ");
                    cy.get('.form-control').type(otp)
                })
            })
            cy.get('.input-group-append > .btn-primary',{ timeout: 10000 }).click()
            cy.log('Now downlaod Ticket')
            cy.get('.d-flex > :nth-child(1)',{ timeout: 1000000 }).click()
            cy.log('Ticket Downloaded Successfully')
        })
        
    });
})