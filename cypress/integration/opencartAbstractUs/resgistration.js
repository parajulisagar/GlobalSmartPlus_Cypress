
/// <reference types="cypress" />

describe("Registration Specifcation of opencatr.abstract.us", ()=>{
    beforeEach(() => {
        cy.visit("?route=account/register")
       
        
    });
    

    // invalid text
    let inval_text='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var invtext = '';
    for(var i=0; i<35; i++){
        invtext += inval_text[Math.floor(Math.random() * inval_text.length)];
    }
    console.log(invtext)

    
    // email
    var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    var email = '';
    for(var i=0; i<15; i++){
        email += chars[Math.floor(Math.random() * chars.length)];
    }
    email +='@gmail.com';
    let fname='sagar'
    let lname='parajuli'
    let password='Swifttechdemo'
    let phone='9842605061'

    let arr=[''+'{backspace}'+':'+`${lname}`+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+`${password}`+':First Name must be between 1 and 32 characters!',
             ''+`${invtext}`+':'+`${lname}`+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+`${password}`+':First Name must be between 1 and 32 characters!',
            ''+`${fname}`+':'+'{backspace}'+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+`${password}`+':Last Name must be between 1 and 32 characters!',
            ''+`${fname}`+':'+`${invtext}`+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+`${password}`+':Last Name must be between 1 and 32 characters!',   
            ''+`${fname}`+':'+`${invtext}`+':'+'{backspace}'+':'+`${phone}`+':'+`${password}`+':'+`${password}`+':E-Mail Address does not appear to be valid!',
            ''+`${fname}`+':'+`${lname}`+':'+`${email}`+':'+'{backspace}'+':'+`${password}`+':'+`${password}`+':Telephone must be between 3 and 32 characters!',
            ''+`${fname}`+':'+`${lname}`+':'+`${email}`+':'+`${phone}`+':'+'{backspace}'+':'+`${password}`+':Password must be between 4 and 20 characters!',
            ''+`${fname}`+':'+`${lname}`+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+'{backspace}'+':Password confirmation does not match password!',
            ''+`${fname}`+':'+`${lname}`+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+`${invtext}`+':Password confirmation does not match password!',
            ''+`${fname}`+':'+`${lname}`+':'+`${email}`+':'+`${phone}`+':'+`${password}`+':'+`${password}`+':Thank you for registering with Your Store!',
            ]

        var Fnames=[]
        var Lnames=[]
        var Emails=[]
        var Phones=[]
        var Passwords=[]
        var Cpasswords=[]
        var Tests=[]
        
        for(var j=0;j<arr.length;j++){
            var prop = arr[j].split(':')
            var creds = prop
            var Fname = creds[0]
            var Lname = creds[1]
            var Email = creds[2]
            var Phone = creds[3]
            var Password= creds[4]
            var Cpassword= creds[5]
            var Test= creds[6]
            Emails.push(Email)
            Passwords.push(Password)
            Tests.push(Test)
            Fnames.push(Fname)
            Lnames.push(Lname)
            Phones.push(Phone)
            Cpasswords.push(Cpassword)
        }
    for (let i = 0; i< arr.length ; i++) {
        let f = String(Fnames[i])
        let l = String(Lnames[i])
        let e = String(Emails[i])
        let ph = String(Phones[i])
        let p = String(Passwords[i])
        let s = String(Cpasswords[i])
        let t = String(Tests[i])
        let cl='.text-danger'
        it('should display '+Tests[i], () => {
            cy.Eregister(f,l,e,ph,p,s)
            if(i<9){
                cy.get('.text-danger').contains(t)
            }
            else{
                cy.get('#content > :nth-child(2)').contains(t)
            }

        });
    }
})