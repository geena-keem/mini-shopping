// ✔ JSON에서 items 데이터를 동적으로 가져오기
function loadItems() {
  return (
    fetch('data/data.json')
      .then((response) => response.json())
      //json()을 이용해 response body를 json의 object로 변환
      .then((json) => json.items)
  );
}

// ✔ items로 목록 업데이트 후 페이지에 표시
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// ✔ item을 HTML로 변환하기
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumnail">
      <span class="item__description">${item.gender}　|　${item.color}　|　${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, items) {
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  console.log(filtered);
  displayItems(filtered);
}

function setEventListeners(items) {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

// ✔ Main
loadItems()
  .then((items) => {
    // console.log(items);
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
