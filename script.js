const checkBoxList = document.querySelectorAll('.custom-cheackbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLavel = document.querySelector('.error-label');
const progressBar = document.querySelector('.progress-bar');
const progressValue = document.querySelector('.progress-value');

const progressLavel = document.querySelector('.progress-lavel');

const allQuotes = [
    'Raise the bar by completing your goals !',
    'Well begun is half done !',
    'Just a step away, keep doing',
    'Wow! Goals crushed—now enjoy the well-earned peace!'

]


const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressLavel.innerText = allQuotes[completedGoalsCount]
 
 progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
 progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFields.length} completed`


checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', (e) => {
        const allFieldsFilled = [...inputFields].every((input) => {
            return input.value;
        });

        if (allFieldsFilled) {
            checkbox.parentElement.classList.toggle('completed');
    
            const inputId = checkbox.nextElementSibling.id;

            allGoals[inputId].completed = !allGoals[inputId].completed;

           completedGoalsCount =  Object.values(allGoals).filter((goal) => goal.completed).length
             progressValue.style.width = `${completedGoalsCount / inputFields.length * 100}%`
              
             progressValue.firstElementChild.innerText = `${completedGoalsCount} / ${inputFields.length} completed`
       
             progressLavel.innerText = allQuotes[completedGoalsCount]



            localStorage.setItem('allGoals', JSON.stringify(allGoals));
        } else {
            progressBar.classList.add('show-error');
        }
    });
});

inputFields.forEach((input) => {
   
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name;

        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed');
        }
    } else {
        
        allGoals[input.id] = { name: '', completed: false };
    }

    input.addEventListener('focus', () => {
        progressBar.classList.remove('show-error');
    });

    input.addEventListener('input', (e) => {
        
        if (allGoals[input.id].completed) {
           input.value = allGoals[input.id].name
           return ;
        }
        if(allGoals[input.id]) {
            allGoals[input.id].name  = input.value
        }else{
          
              
        allGoals[input.id] = {
            name: input.value,
            completed: false,
            }
        }


        
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    });
});
