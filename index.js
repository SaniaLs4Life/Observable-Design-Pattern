window.addEventListener('load', () => {
  class Observable {
    constructor() {
      this.observers = [];
    }

    subscribe(fn) {
      this.observers.push(fn);
    }
    unsubscribe(fn) {
      this.observers = this.observers.filter((subscriber) => subscriber !== fn);
    }
    notify(data) {
      this.observers.forEach((observer) => observer(data));
    }
  }

  // Elements
  const btnSubscribe = document.querySelector('#btnSubscribe');
  const btnUnsubscribe = document.querySelector('#btnUnsubscribe');
  const result = document.querySelector('.result');
  const input = document.querySelector('.input');
  const textSpan = document.querySelector('.name-text');

  // Functions
  const handleChangeName = (text) => (textSpan.textContent = text);
  const handleChangeResult = (text) => (result.textContent = text);

  // Observable instances
  const inputObserver = new Observable();
  const fetchObserver = new Observable();

  // Events
  btnSubscribe.addEventListener('click', () => {
    inputObserver.subscribe(handleChangeName);
  });
  btnUnsubscribe.addEventListener('click', () => {
    inputObserver.unsubscribe(handleChangeName);
  });
  input.addEventListener('keyup', (e) => {
    inputObserver.notify(e.target.value);
  });

  // Fetch Request
  async function getSource() {
    const number = Math.floor(Math.random() * 6) + 1;
    const data = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${number}`
    );
    const jsondata = await data.json();
    return await jsondata.title;
  }

  // Subscribe Fetch Request
  async function subscribeFetchRequest() {
    fetchObserver.subscribe(handleChangeResult);
    const result = await getSource();
    fetchObserver.notify(result);
  }

  // Timer
  setInterval(subscribeFetchRequest, 1000);
});
