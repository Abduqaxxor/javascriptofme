let score=JSON.parse(localStorage.getItem('score')) || { 
  wins:0,
  losses:0,
  ties:0
};
updatescore();


let isAutoplaying=false;
let intervalid;

function resetScore(){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score')
    updatescore();
   
}

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="js-reset-confirm-yes reset-confirm-button">
        Yes
      </button>
      <button class="js-reset-confirm-no reset-confirm-button">
        No
      </button>
    `;
  
  document.querySelector('.js-reset-confirm-yes')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });
  
  document.querySelector('.js-reset-confirm-no')
    .addEventListener('click', () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}

function autoplay(){
  if(!isAutoplaying){
    intervalid=setInterval(()=>{
      const playermove=pickcomputer();
      playgame(playermove);
    }, 1000);
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Stop Playing';
    isAutoplaying=true;

  } else{
    clearInterval(intervalid);
    isAutoplaying=false;
    document.querySelector('.js-auto-play-button')
      .innerHTML = 'Auto Play';
  } 
    
}


document.querySelector('.js-rock').addEventListener('click',()=>{
  playgame('rock');
});

document.querySelector('.js-paper').addEventListener('click',()=>{
  playgame('paper');
});

document.querySelector('.js-scissors').addEventListener('click',()=>{
  playgame('scissors');
});

document.querySelector('.js-auto-play-button').addEventListener('click',()=>{
  autoplay();
});
document.querySelector('.js-reset-score').addEventListener('click',()=>{
  resetScore();
});


document.body.addEventListener('keydown',(event)=>{
  if(event.key=='r'){
    playgame('rock');
  } else if(event.key=='p'){
    playgame('paper');
  } else if(event.key=='s'){
    playgame('scissors');
  } else if(event.key=='a'){
    autoplay();
  }
  else if(event.key=='Backspace'){
    showResetConfirmation();  
  }
});

function playgame(playermove){
  const computer = pickcomputer();  

  let result=''

  if(playermove==='scissors'){
    if (computer==='rock'){
    result='You lose';
    } else if(computer==='paper'){
      result='You win!';
    } else if(computer==='scissors'){
      result='Tie';
    }

  } else if(playermove==='paper'){
    if (computer==='rock'){
      result='You win!';
    } else if(computer==='paper'){
    result='Tie';
    } else if(computer==='scissors'){
    result='You lose';
    }

  } else if(playermove==='rock'){
    if (computer==='rock'){
      result='Tie';
    } else if(computer==='paper'){
      result='You lose';
    } else if(computer==='scissors'){
      result='You win!';
    }
  }
  if (result==='You win!'){
    score.wins+=1;
  } else if(result==='You lose'){
    score.losses+=1;
  } else if(result==='Tie'){
    score.ties+=1;
  }

  localStorage.setItem('score',JSON.stringify(score));
  updatescore();

  document.querySelector('.js-result').innerHTML=result;

  document.querySelector('.js-moves').innerHTML=`You
    <img src="${playermove}-emoji.png">
    <img src="${computer}-emoji.png">
    Computer`;


}

function updatescore(){
  document.querySelector('.js-score').innerHTML=`
  wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

function pickcomputer(){
  let randomnumber = (Math.random());
  let computer='';

  if(randomnumber>=0 && randomnumber< 1/3 ){
    computer='rock';
  } else if (randomnumber>1/3 && randomnumber<2/3){
    computer= 'paper';
  } else if (randomnumber>=2/3 && randomnumber<1){
    computer='scissors';
  }  
  return computer;
}


