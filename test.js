const Email = require('./controllers/auth')

const User ={
    userEmail:'amir.mdm19@gmail.com'
}

Email.sendmail(User,(err,result)=>{
    if(err) console.log(err)
    else {
        console.log(`user's Token is : ${result.token}`)
    }
})