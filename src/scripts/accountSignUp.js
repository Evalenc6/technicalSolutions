async function signUp(){
    const form = document.getElementById("signUpForm");
    if(!form){
        console.error("Form not found");
        return;
    }

    form.addEventListener('submit',async function(event){
        try{    
            event.preventDefault();

            const formData = new FormData(this)
            console.log("This button got pressed for singing in with this data:\n");
            const fName = formData.get("fName");
            const lName = formData.get("lName");
            const email = formData.get("email");
            const username = formData.get("username");
            const password = formData.get("password");


            const account = (fName+','+lName+','+email+","+username+","+password)
            

            const fs = require('fs')
            fs.appendFileSync('/exampleData/userNamePasswords.txt', account)
        }
        catch(error){
            console.log(error);
            return null;
        }
            
    })
}

window.addEventListener("DOMContentLoaded", signUp);