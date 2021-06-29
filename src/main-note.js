// JSON 파일에서 items data를 동적으로 가져오기!
function loadItems() {
  return fetch('data/data.json') // 경로나 url을 지정하면 간단하게 데이터를 네트워크를 통해 받아올 수 있다.
    .then((response) => response.json()) // 성공시 response object를 전달해 준다. json()을 이용해 response body를 json의 object로 변환한다.
    .then((json) => json.items); // json의 items만 return!
}

// items로 목록 업데이트 후 페이지에 표시!
function displayItems(items) {
  const container = document.querySelector('.items'); // 부모 컨테이너 안에 추가해야되기 때문에 container요소를 정의한다.
  // const html = items.map((item) => createHTMLString(item)).join('');
  // console.log(html);
  container.innerHTML = items.map((item) => createHTMLString(item)).join(''); // items를 createHTMLString함수를 이용해 HTML li태그로 변환한다.
} // 문자열의 배열을 join을 이용해서 한가지의 문자열로 병합

// item을 HTML로 변환하기! (li요소 문자열 변환)
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumnail">
      <span class="item__description">${item.gender}___${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, itmes) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  // console.log(event.target.dataset.key); // 출력 확인
  // console.log(event.target.dataset.value);

  // 버튼 빈 공간을 클릭할 경우 undefined이 콘솔에 확인이 되어 이 부분을 처리하는 if문!
  if (key == null || value == null) {
    return; // 필터링할 수 있는 정보가 없으면 아무것도 처리하지 않고 함수를 끝낸다.
  }
  const filterd = itmes.filter((item) => item[key] === value);
  console.log(filterd);
  displayItems(filterd);
  // 해당 코드의 단점: 클릭할 때마다 요소들을 새로 만들어서 다시 container.innerHTML에 업데이트한다.
  // 방법: 전체적으로 리스트를 유지하면서 버튼이 클릭 되었을때 해당하는 요소만 class를 visible이라는 것에 추가해서
  //        display에 추가하고 해당되지 않는 것들은 display none을 해서 보여지지 않도록 한다.
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  // 이벤트 위임 => 이벤트들이 들어있는 container에 이벤트를 등록해서 한 곳에서만 핸들링 할 수 있게! (효율적!!!)
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items)); // 버튼을 클릭하면 이벤트를 처리할 수 있도록 event, items를 인자로 전달한다.
}

// Main
loadItems() // JSON에 있는 데이터를 받아와 items에 전달하며 동적으로 받아오기 때문에 시간이 걸려 promise를 리턴한다.
  .then((items) => {
    // console.log(items); // items 배열만 출력!
    // 성공시 items를 받아온다.
    displayItems(items); // items를 HTML에 보여준다.
    setEventListeners(items); //  button을 누르면 필터링하는 함수
  })
  .catch(console.log); // 실패시 에러 메세지를 보여준다.
