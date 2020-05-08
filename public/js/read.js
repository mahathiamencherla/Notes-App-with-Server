const createForm = document.querySelector('form')
const title = document.querySelector("#title")


createForm.addEventListener("submit", (e) => {
    e.preventDefault()
        axios({
            method: 'get',
            url: `/read`,
            
          }).then((response) => {
            console.log(response)
            window.location.href=`/read/${title.value}`
          })        
})