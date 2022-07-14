/// <reference types="cypress" />

describe('Bypass login',()=>{
    beforeEach(()=>{
        cy.request({
            url : "https://opencart.abstracta.us/index.php?route=account/login",
            method : "POST",
            body:{
                user: { email:"parajuli.sagar198@gmail.com", password : "password"}
            }
        }).then((res)=>{
            cy.visit('/')
        })
    })
    it('add to cart', () => {
        cy.get('#content > .row > :nth-child(1)')
        cy.get('[onclick="cart.add('+"'43'"+');"]').click()
        cy.get('.alert')
        cy.get('.btn-inverse').click()
        cy.wait(2000)
        cy.get('[href="http://opencart.abstracta.us:80/index.php?route=checkout/cart"] > strong').click()
    });
})
