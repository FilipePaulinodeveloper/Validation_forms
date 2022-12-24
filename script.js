let Validador ={
    
    
    handleSubmit:(event)=>{
        event.preventDefault();
        let enviar = true;


        let inputs = form.querySelectorAll('input');

        Validador.errosClear();
       

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            // console.log(input);
            let check = Validador.checkInput(input);
            if(check !== true) {
                enviar = false;
              Validador.showError(input,check);
                
            }
        }
          
            if(enviar) {
                form.submit();               
            }
            
    },

        checkInput:(input) =>{

        let rules = input.getAttribute('data-importante');

        if(rules !== null) {
            
            rules = rules.split('|');
            for( let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    // VER SE TEM ALGO PREENCHIDO OU N
                    case 'required':
                        if(input.value == ''){
                            return 'campo nao pode ser vazio';
                      }
                        break;
                        case 'min':

                            if(input.value.length < rDetails[1]){
                                return 'Item tem que ter  '  +rDetails+ ' caracteres';
                            }
                      
                        break; 

                      case 'email': 
                       if (input.value !=""){
                           let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                           if(!regex.test(input.value.toLowerCase())){
                               return 'Email invalido, tente outro';
                           
                            }

                       break;    
                       }
                }
            }

        }
        return true;
    },
   showError:(input,error) =>{
       input.style.borderColor = 'red';

       let errorElement = document.createElement('div');
       errorElement.classList.add('error');
       errorElement.innerHTML = error;

       input.parentElement.insertBefore(errorElement,input.ElementSibling)
       
   },
   errosClear:() => {

    let inputs = form.querySelectorAll('input');
    for  ( let i = 0; i<inputs.length; i++){
        inputs[i].style = '';
    }

    let errorElements = document.querySelectorAll('.error');
    for(let i=0;i<errorElements.length; i++){
        errorElements[i].remove();
    }

   }
};


let form = document.querySelector('.validador');
form.addEventListener('submit', Validador.handleSubmit);
