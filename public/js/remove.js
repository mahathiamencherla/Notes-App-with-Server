const createForm = document.querySelector('form')
const title = document.querySelector("#title")



createForm.addEventListener("submit", (e) => {
    e.preventDefault()
        console.log(title.value)
        axios({
            method: 'get',
            url: `/remove`,
            
          }).then((response) => {
            console.log(response)
            window.location.href=`/remove/${title.value}`
          }).catch((e) => {
            console.log(e)
          })
        
})