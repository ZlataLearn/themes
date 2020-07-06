# Redux

## Определение

**Redux** – библиотека для осуществления работы с единым для всего приложения хранилищем состояния. Часто используется вместе с React. 

## Зачем он нужен

Redux (и подобные библиотеки) нужен для того, чтобы решить проблему, возникающую при росте любого приложения: одни и те же данные нужны в разных местах. 

> **Например**, для личного кабинета чего-либо данные о пользователе могут быть нужны в:
>
> * Компоненте, отрисовывающем хэдер
> * Компоненте настроек
> * Компоненте какой-нибудь платежной формы
> * Компоненте с кнопкой логаута
> * Компоненте с фотографией пользователя

Когда возникает такая ситуация, становится сложно передавать данные и изменения в них между компонентами. Редакс помогает вынести эти данные из дерева и использовать везде, где они нужны. 

## Основные концепции

Основной частью в редакс является **хранилище (стор/store)**. Это место, где хранятся все данные приложения, которые нужны более чем одному компоненту. Стор представляет из себя обычный объект.

Для изменения данных в сторе используются два механизма – **редьюсеры** и **экшены**. Что это такое:
**Редьюсер** – это функция, которая получает на вход два значения – старый объект стора и экшен. На выходе редьюсер должен отдать новый объект стора с новыми значениями.
**Экшен** – это объект, описывающий изменения. Обычно имеет **тип** и **полезную нагрузку (payload)**.

> Пример экшена: 
>
> ```javascript
> {
>   type: "PROFILE_PHOTO_CHANGED",
>   payload: "https://aaa.bbb/new-proto.jpg",
> }
> ```

## Жизненный цикл

1. Инициализация
2. Подписка
3. Экшен
4. Обновление всех подписанных
5. Повторить пункт 3

### 1. Инициализация

При запуске приложения редакс получает редьюсер, создает с помощью него первое значение стора. 

### 2. Подписка

Компонентам, подписавшимся на стор, редакс отдает текущее состояние. Далее при всех обновлениях он будет автоматически передавать им новые данные.

### 3. Экшен

Когда в каком-то месте возникает потребность изменить данные в сторе, кто-то запускает экшен. Он поступает в редакс, тот передает его редьюсеру. Ответ редьюсера считается новым состоянием стора. 

### 4. Обновление всех подписанных

После обновления редакс обновляет данные у всех, кто на его состояние подписан. 

## API

### Создание стора

Для создания стора используется функция `createStore`.

Она принимает три аргумента:

1. Редьюсер
2. [Состояние, с которого начинается работа]
3. [Middlewares] (ниже)

```javascript
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

export default store;
```

### Редьюсер

Для редьюсеров нет специального API, это обычные функции. Вот пример типового редьюсера:

```javascript
const INITIAL_VALUE = {
  name: '',
  lastName: '',
  photo: '',
};
// INITIAL_VALUE нужен для инициализации. 
// Тогда еще нет store, и редьюсер должен будет его создать

const reducer = (store = INITIAL_VALUE, action) => {
  switch (action.type) {
    case 'CHANGE_PROIFLE_PHOTO':
    	return {
        ...store,
        photo: action.payload
      }
      
    case 'CHANGE_PROIFLE_NAME':
    	return {
        ...store,
        name: action.payload
      }
      
    case 'CHANGE_PROIFLE_LAST_NAME':
    	return {
        ...store,
        lastName: action.payload
      }
      
    default:
      return store; // Это нужно для инициализации и для экшенов, которые редьюсер пропускает
  }
}
```

### Подключение к приложению

Чаще всего в React для подписки и удобного взаимодействия со стором используется библиотека `react-redux`. Она является прослойкой между реактом и редаксом. Для подключения стора к реакт-приложению нужно обернуть все приложение в `Provider` из `react-redux`:

```javascript
import { Provider } from 'react-redux'
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

Это нужно для того, чтобы все компоненты через [контекст](react-context.md) имели доступ к конкретному стору. 

### Подписка на стор

`react-redux` предоставляет **два варианта** интерфейса для подписки:

#### Connect (для старых версий)

```javascript
import React from 'react';
import { connect } from 'react-redux';

const Component = ({ name, lastName }) => {
  // ...
};

export default connect((store) => ({
  name: store.account.name,
  lastName: store.account.lastName
}))(Component);
```

Функция `(store) => ({ name: store.account.name, lastName: store.account.lastName })` здесь называется **селектором**. Эта функция получает все значение стора, а отдает объект с нужными компоненту данными. Эти данные попадут в `props` компонента.

#### useSelector (для новых версий)

```javascript
import React from 'react';
import { useSelector } from 'react-redux';

const Component = () => {
  const name = useSelector(store => store.account.name);
  const lastName = useSelector(store => store.account.lastName);
  // ...
};

export default Component;
```

Здесь **селектор** разбит на два отдельных, каждый получает только нужные данные. К тому же, как и с остальными хуками, их можно вынести в [кастомный хук](react-custom-hooks.md).

### Отправка экшена

При использовании react-redux для отправки экшена есть тоже два варианта, но оба они используют концепцию **action creator** (создатель/генератор экшена (?)). Это функция, которая создает объект экшена, но позволяет не думать о нем детально, например:

```javascript
const updatePhoto = (newUrl) => {
  return {
    type: 'PROFILE_PHOTO_CHANGED',
    payload: newUrl
  }
}
```

Такие функции ничего особенного не делают, но облегчают восприятие кода.

Теперь можно рассмотреть способы отправки экшена:

#### Connect (для старых версий)

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { updatePhoto } from './store/actions';

const Component = ({ photo, updatePhoto }) => {
  // ...
  updatePhoto('https://placekitten.com/100/100');
  // ...
};

export default connect(
  (store) => ({
    photo: store.account.photo
  }), 
  {
    updatePhoto
  }
)(Component);
```

Вторым аргументом `connect` принимает объект, содержащий генераторы экшенов. Они тоже попадают в `props` компонента, но в преобразованном виде. Компоненту достаточно вызвать их с нужными данными, чтобы они сразу попали к редаксу. 

#### useDispatch

`dispatch` в редакс – это функция, которая отдает экшен в обработку. Хук `useDispatch` из пакета react-redux отдает нам эту функцию, сразу привязанную к стору:

```javascript
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePhoto } from './store/actions';

const Component = () => {
  const photo = useSelector(store => store.account.photo);
  const dispatch = useDispatch('https://placekitten.com/100/100');
  // ...
  dispatch(updatePhoto())
  // ...
};

export default Component;
```

В отличие от `connect`, `useDispatch` не преобразовывает action creators, поэтому мы должны сами передать их результат в `dispatch`.

> Кстати, `dispatch` может принимать массив экшенов, тогда редакс выполнит их друг за другом. 

## Правила

### 1. Синхронность

Редьюсеры не могут содержать асинхронных действий. Их нужно выносить в компоненты или в middleware (ниже)

### 2. Иммутабельность

Стор нельзя менять. Редьюсеры могут только создать новый объект и вернуть его.

Это нужно для того, чтобы редакс мог понять – поменялось значение или нет без проверки всего объекта. 

## Комбинация редьюсеров

Часто в приложении нужно хранить более чем один тип данных, и держать все в одном редьюсере неудобно. Для этого есть функция `combineReducers`, позволяющая создать один редьюсер из нескольких:

```javascript
import { combineReducers } from 'redux';
import profile from './reducers/profile';
import balance from './reducers/balance';
import posts from './reducers/posts';

const store = createStore(combineReducers({
  profile,
  balance,
  posts
}))
```

Результатом станет стор такого вида:

```javascript
{
  profile: {}, // то, что вернул редьюсер profile
  balance: {}, // то, что вернул редьюсер balance
  posts: {}, // то, что вернул редьюсер posts
}
```

На каждый экшен будут вызываться все редьюсеры, а их результаты будут складываться в соответствующие записи в сторе. 

## Middleware

Для расширения функциональности редакса используются сторонние библиотеки, "вклинивающиеся" в жизненный цикл стора. Самый частый пример такого – библиотеки для организации асинхронности в redux. 

### Redux-thunk

Одним из популярных middleware для асинхронности является [redux-thunk](https://github.com/reduxjs/redux-thunk).

Принцип работы у него такой:

Если вместо объекта экшена задиспатчить функцию, `redux-thunk` её вызовет и передаст ей функцию `dispatch` и функцию `getState` (её вызов вернет актуальное состояние стора). В этой функции можно делать любые асинхронные действия, а после задиспатчить новые экшены. 

#### Подключение

Для подключения нужно передать `thunk` в `createStore` в качестве middleware. Это можно сделать с помощью `applyMiddleware` из `redux`:

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
```

С этого момента все экшены (как обычные, так и те, что на самом деле функции), будут сначала проходить через `redux-thunk`.

#### Создание thunk-а

Thunk в концепции `redux-thunk` – это функция, которая возвращена другой функцией. В нашем случае – action creator'ом:

```javascript
const updatePhoto = (newUrl) => {
  return async (dispatch) => {
    dispatch({
      type: 'PROFILE_UPDATE_LOADING_START',
    });
    await axios.post('/user/photo', newUrl);
    dispatch([
      {
        type: 'PROFILE_PHOTO_CHANGED',
        payload: newUrl
      },
      {
        type: 'PROFILE_UPDATE_LOADING_END',
      },
    ]);
  }
} 
```

#### Использование

Использование таких экшенов не отличается от обычного – компоненту не нужно знать, что отдает action creator – объект экшена или функцию для redux-thunk.

```javascript
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';

import Loader from './components/loader';
import { updatePhoto } from './store/actions';

const Component = () => {
  const photo = useSelector(store => store.account.photo);
  const loading = useSelector(store => store.account.loading);
  const dispatch = useDispatch('https://placekitten.com/100/100');
  // ...
  dispatch(updatePhoto())
  // ...
  
  if (loading) {
    return <Loader />;
  }
  
  // ...
};

export default Component;
```

> Кстати, в случае с thunk-экшенами, компонент может добавить подписку на их выполнение, как с промисами:
>
> ```javascript
> dispatch(updatePhoto()).then(() => {/* ... */})
> ```

