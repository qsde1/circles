import './App.css'

function createCircle(){
  let place = document.querySelector('.elements-place')
  let circle = document.createElement('div');
  circle.classList.add('elements-place__circle');
  
  let placeX = place.getBoundingClientRect().x;
  let placeY = place.getBoundingClientRect().y;
  let placeWidth = place.getBoundingClientRect().width;
  let placeHeight = place.getBoundingClientRect().height;
  
  let percent =  Math.floor(Math.random() * (10 - 5 + 1)) + 5;

  //случайный процент размеров
  let circleSize = placeWidth / 100 * percent;

  //задание рамеров создаваемого круга
  circle.style.width = circleSize + 'px';
  circle.style.height = circleSize + 'px';
  
  //генерация случайных координат создаваемого круга и минус 2 пикселя(чтобы не упирался в границу)
  let left = Math.floor(Math.random() * (placeWidth-circleSize-2)) + 1;
  let top = Math.floor(Math.random() * (placeHeight-circleSize-2)) + 1;
  
  //позиционирование создаваемого круга
  circle.style.left = left + 'px';
  circle.style.top = top + 'px';

  place.append(circle);

  circle.addEventListener('mousedown', (e) => {
    //координаты курсора на ПЕРЕДВИГАЕМОМ ЭЛЕМЕНТЕ(начало координат - левый верхний угол нажимаемого элемента) в момент нажания на него
    let shiftX = e.clientX - circle.getBoundingClientRect().x;
    let shiftY = e.clientY - circle.getBoundingClientRect().y;

    //функция для передвижения элемента(вызывается обработчиком события mousemove)
    function moveCircle(e){

      //координаты курсора на экране в момент движения мыши
      let mousePositionX = e.clientX;
      let mousePositionY = e.clientY;
      
      console.log(`shiftX: ${shiftX}, shiftY: ${shiftY}`);
      
      //размеры передвигаемого элемента
      let circleWidth = circle.getBoundingClientRect().width;
      let circleHeight = circle.getBoundingClientRect().height;
      
      //потенциально новые координаты элемента после движения мыши, с учетом смещения элемента относительно курсора мыши
      let newPositionX = mousePositionX - shiftX;
      let newPositionY = mousePositionY - shiftY;

      //если элемент не выходит за границы - передвинуть его(относительно родительсокго relative элемента)
      //проверка координат по оси x
      if(newPositionX > placeX && newPositionX + circleWidth < placeX + placeWidth){
        let newPositionXInParentElement = newPositionX - placeX;
        circle.style.left = newPositionXInParentElement + 'px';
      }
      //проверка координат по оси y
      if(newPositionY > placeY && newPositionY + circleHeight < placeY + placeHeight){
        let newPositionYInParentElement = newPositionY - placeY;
        circle.style.top = newPositionYInParentElement + 'px';
      }
    }

      //обработчик на документ, а не на передвигаемый элемент
      document.addEventListener('mousemove', moveCircle);

      //функция удаления обработчиков с передвигаемого круга после окончания передвижения
      function cleaerEventListeners(){
        console.log('mouseup');
        document.removeEventListener('mousemove', moveCircle);
        circle.removeEventListener('mouseup', this);    
      }

      circle.addEventListener('mouseup', cleaerEventListeners);
  })  

  
}

function App() {
  return (
    <>
      <div className="main">
        <div className="container">
          <button
            className="button"
            onClick={createCircle}
          >
            <p>Добавить круг</p>
          </button>
          <div className="elements-place">

          </div>
        </div>
      </div>
    </>
  )
}

export default App