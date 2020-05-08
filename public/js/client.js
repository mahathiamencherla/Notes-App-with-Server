const createForm = document.querySelector('form')
const title = document.querySelector("#title")
const body = document.querySelector("#content")
const msg  = document.querySelector("#errorMessage")



createForm.addEventListener("submit", (e) => {
    e.preventDefault() 
        axios({
            method: 'post',
            url: '/add',
            data: {
              title: title.value,
              body: body.value,
            }
          })
        console.log("Success")
        msg.textContent = "Success!"
    
        
})