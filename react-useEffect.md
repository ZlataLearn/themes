<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [useEffect и useLayoutEffect](#useeffect-%D0%B8-uselayouteffect)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Когда используется](#%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F)
  - [API](#api)
    - [Принимает](#%D0%BF%D1%80%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D1%82)
  - [Сразу сложный пример](#%D1%81%D1%80%D0%B0%D0%B7%D1%83-%D1%81%D0%BB%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80)
  - [Принцип работы](#%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
    - [1. Нет массива зависимостей](#1-%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9)
    - [2. Есть массив зависимостей](#2-%D0%B5%D1%81%D1%82%D1%8C-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9)
    - [3. Массив зависимостей пустой](#3-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9-%D0%BF%D1%83%D1%81%D1%82%D0%BE%D0%B9)
    - [4. Возвращение из эффекта функции очистки](#4-%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%89%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%B7-%D1%8D%D1%84%D1%84%D0%B5%D0%BA%D1%82%D0%B0-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D0%BE%D1%87%D0%B8%D1%81%D1%82%D0%BA%D0%B8)
  - [Отличие `useEffect` и `useLayoutEffect`](#%D0%BE%D1%82%D0%BB%D0%B8%D1%87%D0%B8%D0%B5-useeffect-%D0%B8-uselayouteffect)
  - [Оптимизация частоты обновления](#%D0%BE%D0%BF%D1%82%D0%B8%D0%BC%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D1%8F-%D1%87%D0%B0%D1%81%D1%82%D0%BE%D1%82%D1%8B-%D0%BE%D0%B1%D0%BD%D0%BE%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F)
    - [Пример](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80)
  - [Что дальше](#%D1%87%D1%82%D0%BE-%D0%B4%D0%B0%D0%BB%D1%8C%D1%88%D0%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# useEffect и useLayoutEffect

## Определение

**useEffect и useLayoutEffect** – хуки для организации дополнительных действий, которые должны выполняться после отрисовки.

## Когда используется

Наиболее частые примеры: 

* Подписка на события вне компонента (ресайз, сообщения по сети и т.д.)
* Использование сторонних не-реакт библиотек
* Модификация чего-то вне компонента
* Поддержание консистентности данных
* Отправка чего-либо по сети в зависимости от изменений данных
* Получение по сети, например, для вывода подсказок при поиске

## API

### Принимает

1. Функцию-эффект. Подробнее ниже
2. Массив зависимостей. Подробнее тоже ниже

## Сразу сложный пример

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(oldCount => oldCount + 1);
    }, delay);
    
    return () => clearInterval(interval);
  }, [delay]);
  
  return (
    <div>
      {count}
      <input value={delay} onChange={e => setDelay(+e.target.value)} />
    </div>
  );
}
```

Этот компонент будет увеличивать `count` на 1 каждую секунду. Если в инпуте поменять интервал, частота обновлений поменяется. **Ниже будет объяснение**.

Предлагаю вернуться к этому примеру после разбора всего ниже, и проверить, понятен ли он теперь.

## Принцип работы

Здесь я буду идти по пути от простого случая к сложному

### 1. Нет массива зависимостей

```javascript
useEffect(() => {
  alert(123);
});
```

Такая функция будет выполняться **каждый раз**, когда компонент будет перерисован. 

> Если бы компонент говорил с реактом, это было бы так:
>
> ---
>
> Реакт: вот тебе параметры, скажи, что нарисовать
>
> Компонент: нарисуй вот это *отдает разметку* и вызови потом `() => alert(123)`
>
> Реакт: ок, готово
>
> ----
>
> Реакт: тут параметры обновились, что нарисовать?
>
> Компонент: нарисуй вот это *отдает разметку* и вызови потом `() => alert(123)`
>
> Реакт: ок, готово

Применение:

* Вывод информации для отладки
* Подсчет количества перерисовок

### 2. Есть массив зависимостей

```javascript
const [count, setCount] = useState(0);
useEffect(() => {
  alert(`Count изменился, теперь он ${count}`);
}, [count]);
```

```javascript
const [value, setValue] = useState(0);
const [maxValue, setMaxValue] = useState(0);
useEffect(() => {
  if (maxValue < value) {
    setMaxValue(value);
  }
}, [value, maxValue]);
```

Такая функция будет вызываться **каждый раз, когда будет меняться что-то в массиве зависимостей**.

Существует рекомендация, согласно которой важно указывать в массиве **все данные, которые действительно использует эффект**. Так можно сильно сократить количество потенциальных багов.

> Реакт: вот тебе параметры, скажи, что нарисовать
>
> Компонент: нарисуй вот это *отдает разметку* и **если value или maxValue поменялись**, вызови потом эту функцию *отдает эффект*
>
> Реакт: ок, готово

### 3. Массив зависимостей пустой

```javascript
const [count, setCount] = useState(0);
useEffect(() => {
  alert(count);
}, []);
```

Это частный случай предыдущего примера. Такой эффект вызовется только один раз – при первой отрисовке компонента. 

> Реакт: вот тебе параметры, скажи, что нарисовать
>
> Компонент: нарисуй вот это *отдает разметку* и **если это первый рендер**, вызови потом эту функцию *отдает эффект*
>
> Реакт: ок, готово

**ВАЖНО!** Не стоит отдавать реакту пустой массив, если на самом деле изменяющиеся данные (даже если они не меняются сейчас, но могут меняться в принципе) используются. 

### 4. Возвращение из эффекта функции очистки

```javascript
const [socketAddr, setSocketAddr] = useState('...');
const [socket, setSocket] = useState();
useEffect(() => {
  const {unsubscribe, socket} = subscribeToSocket(socketAddr);
  /**
  	subscribeToSocket - воображаемая функция
  	представим, что она подписывается на соединение с сервером
  	и возвращает объект, где есть функция отписки и объект для работы с соединением
  */
  setSocket(socket);
  return unsubscribe;
}, [socketAddr]);
```

```javascript
const [size, setSize] = useState(0);
useEffect(() => {
  const onResize = () => {
  	 setSize(window.innerWidth);
  };
  onResize();
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
```

Из эффекта можно вернуть функцию. Эта функция будет вызываться всегда, когда старый эффект не нужен:

* При удалении компонента
* При изменении чего-либо в списке зависимостей, когда вызывается новый эффект

> Реакт: вот тебе параметры, скажи, что нарисовать
>
> Компонент: нарисуй вот это *отдает разметку* и вызови потом эту функцию *отдает эффект*.
>
> Реакт: ок, отрисовал, вызываю эффект
>
> Эффект: я сделяль. Когда будешь вызывать следующего, вызови *вот это* для очистки
>
> Реакт: ок, запомнил

## Отличие `useEffect` и `useLayoutEffect`

Отличие одно – синхронность выполнения. `useEffect` выполняется **асинхронно** после отрисовки, а `useLayoutEffect` – синхронно. 

Это приводит к тому, что `useEffect` меньше заметен пользователям, так как не тормозит рендер, но если в нем поменять что-то, что только что отрисовалось, пользователи это заметят. С другой стороны, `useLayoutEffect` тормозит рендер, но его результаты видны сразу, без показа пользователю промежуточного состояния. 

## Оптимизация частоты обновления

Чтобы эффект не обновлялся слишком часто, стоит обратить внимание на его список зависимостей.

* Не используйте в эффекте данные, использования которых можно избежать
* Прибегайте к передаче в `setState` функций, чтобы избавиться от использования старого значения
* Разбивайте эффекты на отдельные, если это возможно

### Пример

```javascript
useEffect(() => {
  if (maxValue < value) {
    setMaxValue(value);
  }
}, [value, maxValue]);
```

У этого эффекта есть одна проблема: он обновляется слишком часто. Каждый раз, когда меняется `value`, эффект выполняется, и это правильно. Но когда `value` оказывается больше `maxValue`, эффект вызывает `setMaxValue`, что меняет `maxValue` и он обновляется еще раз, хотя это и не нужно.

Этого можно избежать, если убрать `maxValue` из зависимостей. Но как сделать это "честно", ведь эффект его использует? Ответ: вместо сравнения внутри эффекта можно делать это внутри `setMaxValue`, ведь он пришлет нам актуальное значение:

```javascript
useEffect(() => {
  setMaxValue(oldMaxValue => {
    if (setMaxValue < value) {
      return value;
    } else {
      return oldMaxValue;
    }
  })
}, [value]);
```

Теперь переменная `maxValue` не входит в зависимости эффекта и он будет обновляться **только** тогда, когда меняется `value`.

## Что дальше

* [Крутая статья про useEffect](https://overreacted.io/a-complete-guide-to-useeffect/)

