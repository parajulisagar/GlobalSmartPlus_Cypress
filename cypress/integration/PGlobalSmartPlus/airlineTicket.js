/// <reference types="cypress" />

describe("AirlineTicket Specifcation of Global Smart Plus", ()=>{
 
    let email = "sagar123@yopmail.com"
    let password = 'autoTest@0110'
    let Child = '1'
    let Adult = '1'
    let fName = 'SAGAR PARAJULI'
    let mobile = '9842605061'
    let accno = '20707010010056'
    let totalPassenger = parseInt(Child)+parseInt(Adult)
    
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
                    cy.Clogin(email, password);      
                    }
            }
            else if ($body.find('[data-test="userDataField"]').length > 0) {   //evaluates as true
                cy.Clogin(email, password);      
                }
        })
    });
    
    it('Successful  One way Airline ticket booking', function ()  {
        cy.wait(3000)
        cy.visit('/dashboard/airlines/search-flight')
        cy.wait(5000)
        cy.get('[name="SectorFrom"]').select('BHARATPUR')
        cy.wait(1000)
        cy.get('[name="SectorTo"]').select('KATHMANDU')
        cy.get('input').clear().type('2022-08-29')
        cy.wait(1000)
        cy.get('form > :nth-child(3) > :nth-child(1) > .form-control').select(Adult, {force: true})
        cy.wait(1000)
        cy.get('[name="ChildCount"]').select(Child)
        cy.wait(1000)
        cy.get('form > .btn').click()
        cy.get(':nth-child(6) > .ticket_wrapper > .book_now',{ timeout: 100000 }).click({ force: true })
        cy.get('[name="fromAccountNumber"]',{ timeout: 100000 }).then((w)=>{
            // cy.get('#fromAccountNumber').select(accno)
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


    it.only('Successful  Round Airline ticket booking', () => {
        cy.wait(3000)
        cy.visit('/dashboard/airlines/search-flight',{ timeout: 100000})
        cy.get('#tabs-tab-R',{ timeout: 100000}).click()
        cy.get('[name="SectorFrom"]').select('BHARATPUR')
        cy.wait(1000)
        cy.get('[name="SectorTo"]').select('KATHMANDU')
        cy.get('[placeholder="Select departure date"]').click().clear().type('2022-08-29')
        cy.get('[placeholder="Select return date"]').click().clear().type('2022-08-29')
        cy.wait(1000)
        cy.get('[name="AdultCount"]').select(Adult)
        cy.wait(1000)
        cy.get('[name="ChildCount"]').select(Child)
        cy.wait(1000)
        cy.get('form > .btn').click()
        cy.get('.dashboard__content > :nth-child(5)',{ timeout: 100000 }).click()
        cy.get(':nth-child(5) > .ticket_wrapper > .book_now',{ timeout: 100000 }).click({ force: true })
        
        cy.get('[name="fromAccountNumber"]',{ timeout: 100000 }).then((w)=>{
            // cy.get('[name="fromAccountNumber"]').select(1)
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