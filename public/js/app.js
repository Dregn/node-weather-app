

console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const searchElemnet = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messagetwo = document.querySelector('#messagetwo')

messageOne.textContent=""
messagetwo.textContent=""

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= searchElemnet.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        messageOne.textContent=""
        messagetwo.textContent=""
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent= data.error
        }
        else {
            messagetwo.textContent= "Location : "+data.location+". Forecast: "+data.forecast
        }
    })
})
   
    console.log(location)
})