async function singIn(){

    const form=document.getElementById("signInForm");
    if(!form){
        console.error("Form not found")
        return;
    }

    form.addEventListener('submit', async function(event){
        try{
        event.preventDefault();

        const formData = new FormData(this);
        console.log("This button got pressed for singing in with this data:\n");
        const username = formData.get("username");
        const password = formData.get("password");
        console.log(username, ", ", password);
            const file= await fetch('/exampleData/userNamePasswords.txt');
            if(!file.ok){
                throw new Error(`HTTP error! status: ${file}`);
            }
                const content = await file.text();
                
                for(const item of content.split('\n')){
                    const items = item.split(',')
                    const user = items[0].trim();
                    const pass = items[1].trim();
                    console.log(user + "==" + username + ":" + pass+"=="+ password);
                    if(user == username && pass == password){
                        console.log("Login Successful");
                        const response = new Response(JSON.stringify({sucess: true, user:username}),{
                            status: 200,
                            headers: {"Content-Type": "application/json"}
                        });

                        window.location.href = "/pages/userpage.html";
                        return response;
                    }
                }
                throw new Response(JSON.stringify({ success: false, message: "Invalid username or password" }), {
                status: 401,
                headers: { "Content-Type": "application/json" }
                 });

                
        }
        catch(error){
            console.log("Erorr loading txt file: ", error)
            return null;
        }
    })
}

window.addEventListener("DOMContentLoaded", singIn);