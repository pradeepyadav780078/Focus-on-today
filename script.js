const checkboxList = document.querySelectorAll('.custom-checkbox')
const inputfiels = document.querySelectorAll('.goal-inut')
const errorlink = document.querySelector('.error-label')
const progressLable = document.querySelector('.progress-label')
const progressbar = document.querySelector('.progress-bar')
const progressvalue = document.querySelector('.progress-value')

const allQuotes = [
  'Raise the bar by completing your goals',
  'Well begun is helf done!',
  'Just a step away, keep going',
  'whoa! You just completed all the goals, time for chill :D',
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) ||   {
  first:{
    name:'',
    completed:false,
  },
  second:{
    name:'',
    completed:false,
  },
  third:{
    name:'',
    completed:false,                   
  },
}   
let completedGoalsCount = Object.values(allGoals).filter( (goal) => goal.completed).length
   progressvalue.style.width =  `${(completedGoalsCount / 3) * 100}%`
   progressvalue.firstElementChild.innerText = `${completedGoalsCount}/3 completed `
   progressLable.innerText = allQuotes[completedGoalsCount]

checkboxList.forEach((checkbox) =>{
   checkbox.addEventListener('click' , () =>{
    const allGoalsAdded = [...inputfiels].every(function (input) {
        return input.value
    })
    if(allGoalsAdded){
        checkbox.parentElement.classList.toggle('Completed')
        const  inputId = checkbox.nextElementSibling.id
        allGoals[inputId].completed = !allGoals[inputId].completed
         completedGoalsCount = Object.values(allGoals).filter( (goal) => goal.completed).length
          progressvalue.style.width =  `${completedGoalsCount / 3 * 100}%`
          progressvalue.firstElementChild.innerText = `${completedGoalsCount}/3 completed `
          progressLable.innerText = allQuotes[completedGoalsCount]
         localStorage.setItem('allGoals' , JSON.stringify(allGoals)) 

    }
    else{
        progressbar.classList.add('show-error')     
    }
     
   })
  

})
inputfiels.forEach((input) =>{ 
  if(allGoals[input.id]){
    input.value = allGoals[input.id].name
    if(allGoals[input.id].completed) {
      input.parentElement.classList.add('completed')
  }
    
}
    input.addEventListener('focus' , () =>{
        progressbar.classList.remove('show-error')  
    })  
    input.addEventListener('input' , (e) => {
    if(allGoals[input.id] && allGoals[input.id].completed){
      input.value = allGoals[input.id].name
      return
      
    }
    if(allGoals[input.id]){
       allGoals[input.id].name = input.value}
       else{
        allGoals[input.id] = {
          name:input.value,
          completed:false,
        
        }
       }
        
       localStorage.setItem('allGoals' , JSON.stringify(allGoals))  
     })
                         
})  
 