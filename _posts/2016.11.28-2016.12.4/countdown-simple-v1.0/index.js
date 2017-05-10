//问题1:setInterval写得太难看了
//问题2:countNumber函数中，每次都要将h/m/s字符串进行数字化，有没有一开始就数字化的方法呢？
//问题3:countNumber函数里，更新DOM对象内容的写法是不是太长了一点？（果然原生JS还是jQuery操作来得好啊）



const startBtn = document.querySelector('#J_start');
const pauseBtn = document.querySelector('#J_pause');
const leftHour = document.querySelector('#J_hour');
const leftMin = document.querySelector('#J_minute');
const leftSec = document.querySelector('#J_second');
var countId;

startBtn.addEventListener('click', () => {
    startBtn.classList = ['start-btn hide'];
    pauseBtn.classList = ['pause-btn'];
    countId = setInterval('countNumber(leftHour.textContent,leftMin.textContent,leftSec.textContent);',1000);
});

pauseBtn.addEventListener('click', () => {
    startBtn.classList = ['start-btn'];
    pauseBtn.classList = ['pause-btn hide'];
    clearInterval(countId);
});

function countNumber(h,m,s){

  h=h*1;
  m=m*1;
  s=s*1;

  let totalSec = (h*3600)+(m*60)+s;
  totalSec--;
  if(totalSec === 0 ){
    clearInterval(countId);
    return 0;
  }
  leftHour.textContent = h = parseInt(totalSec/3600);
  leftMin.textContent = m = parseInt((totalSec-3600*h)/60);
  leftSec.textContent = s = parseInt((totalSec-3600*h-60*m));
  
}


