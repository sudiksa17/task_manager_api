const sgMail = require('@sendgrid/mail')
const sendgridAPIKey = process.env.SENDGRID_API_KEY 

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email,name) =>{
    sgMail.send({
        to: email,
        from: 'sudiksha1701@gmail.com',
        subject: 'Thanks for joining in',
        text: `Hey ${name} , we welcome you with us.`
    })
}

const sendCancelEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:'sudiksha1701@gmail.com',
        subject: 'Removing of account',
        text: `Dear ${name} .We have recieved your request for removing your account from us. we would like to know why you did so.Regards.`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancelEmail
}