<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Асинхронные функции](#%D0%B0%D1%81%D0%B8%D0%BD%D1%85%D1%80%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Синтаксис](#%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%81)
  - [Принцип работы](#%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
  - [`Await`](#await)
  - [Обработка ошибок](#%D0%BE%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0-%D0%BE%D1%88%D0%B8%D0%B1%D0%BE%D0%BA)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Асинхронные функции

## Определение

**Асинхронные функции** – вид функций, позволяющий работать с асинхронными операциями так, как если бы они были синхронными. 

## Синтаксис

Функция будет считаться асинхронной, если добавить перед её объявлением ключевое слово `async`:

* `async function foo() {...}`
* `async function() {...}`
* `async () => {...}`

## Принцип работы

* Асинхронная функция в начале работы сразу возвращает [промис](async_promises.md)
* Когда в асинхронной функции встречается `return` (или она завершается без `return`), возвращенный промис отмечается выполненным с этим значением
* В асинхронных функциях доступно ключевое слово `await`, позволяющая ожидать выполнения промисов

## `Await`

Ключевое слово `await` предназначено для того, чтобы представить асинхронный код с обработчиками в `then` и `catch` в виде синхронного. Если указать `await` перед промисом (в том числе вызовом другой асинхронной функции), функция остановится и будет ожидать его выполнения. В случае завершения промиса **успешно**, его значение будет возвращено:

```javascript
const result = await axios.get("https://google.com");
```

> Это позволяет представить такой код:
>
> ```javascript
> doSomething()
> 	.then(doSomethingElse)
> 	.then(doSomethingElse2)
> 	.then(doSomethingElse3)
> 	.then(doSomethingElse4)
> ```
>
> В таком виде:
>
> ```javascript
> await doSomething();
> await doSomethingElse();
> await doSomethingElse2();
> await doSomethingElse3();
> await doSomethingElse4();
> ```

## Обработка ошибок

В асинхронных функциях обработка ошибок аналогична таковой в обычных функциях (см [обработка ошибок](errors.md)):

```javascript
try {
  // любой код
  const result = await axios.get("https://google.com");
  // любой код
} catch(error) {
 	// обработка ошибки 
}
```

