/// <reference types="cypress" />

describe("AirlineTicket Specifcation of Global Smart Plus", ()=>{
 
    let Child = '10'
    let Adult = '1'
    let totalPassenger = parseInt(Child)+parseInt(Adult)

    var tomorrow = new Date();
    var rdate = new Date();
    var dd = String(tomorrow.getDate()+1).padStart(2, '0');
    var mm = String(tomorrow.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tomorrow.getFullYear();
    tomorrow = mm + '-' + dd + '-' + yyyy;

    var dd = String(rdate.getDate()+1).padStart(2, '0');
    var mm = String(rdate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = rdate.getFullYear();

    rdate = mm + '-' + dd + '-' + yyyy;
    


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
    
    it.only('Successful  One way Airline ticket booking', function(){
        cy.wait(3000)
        cy.visit('/dashboard/airlines/search-flight')
        cy.get('[name="SectorFrom"]',{timeout:10000}).select('BHARATPUR')
        cy.wait(1000)
        cy.get('[name="SectorTo"]').select('KATHMANDU')
        cy.get('input').clear().type(tomorrow)
        cy.wait(1000)
        cy.get('form > :nth-child(3) > :nth-child(1) > .form-control').select(Adult, {force: true})
        cy.wait(1000)
        cy.get('[name="ChildCount"]').select(Child)
        cy.wait(1000)
        cy.get('form > .btn').click()
        
        cy.get(':nth-child(6) > .ticket_wrapper > .book_now',{ timeout: 100000 }).click({ force: true })
        cy.get('[name="fromAccountNumber"]',{ timeout: 100000 }).then((w)=>{
            // cy.get('#fromAccountNumber').select(accno)
            cy.get('#ContactPersonName').clear().type(this.cred.fullName)
            cy.get('#ContactPersonMobile').clear().type(this.cred.mobileNo)
            cy.get('#ContactPersonEmail').clear().type(this.cred.email)
        }).then((w)=>{
            cy.get('.passenger_header > .btn',{ timeout: 1000 }).click()
            for (let i = 0; i < totalPassenger; i++) {
                cy.wait(1000)
                cy.get('[name="PassengerList['+`${i}`+'].FullName"]').click().type(this.cred.fullName)
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


    it('Successful  Round Airline ticket booking', function(){
        cy.wait(3000)
        cy.visit('/dashboard/airlines/search-flight',{ timeout: 100000})
        cy.get('#tabs-tab-R',{ timeout: 100000}).click()
        cy.get('[name="SectorFrom"]',{ timeout: 100000}).select('BHARATPUR')
        cy.wait(1000)
        cy.get('[name="SectorTo"]').select('KATHMANDU')
        cy.get('[placeholder="Select departure date"]').click().clear().type(tomorrow)
        cy.get('[placeholder="Select return date"]').click().clear().type(rdate)
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
            cy.get('#ContactPersonName').clear().type(this.cred.fullName)
            cy.get('#ContactPersonMobile').clear().type(this.cred.mobileNo)
            cy.get('#ContactPersonEmail').clear().type(this.cred.email)
        }).then((w)=>{
            cy.get('.passenger_header > .btn',{ timeout: 1000 }).click()
            for (let i = 0; i < totalPassenger; i++) {
                cy.wait(1000)
                
                cy.get('[name="PassengerList['+`${i}`+'].FullName"]').click().type(this.cred.fullName)
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