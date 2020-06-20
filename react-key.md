<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Key. Списки в React.](#key-%D1%81%D0%BF%D0%B8%D1%81%D0%BA%D0%B8-%D0%B2-react)
  - [Примеры применения](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B-%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F)
  - [Варианты реализации](#%D0%B2%D0%B0%D1%80%D0%B8%D0%B0%D0%BD%D1%82%D1%8B-%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%B0%D1%86%D0%B8%D0%B8)
      - [1. Отдельная переменная](#1-%D0%BE%D1%82%D0%B4%D0%B5%D0%BB%D1%8C%D0%BD%D0%B0%D1%8F-%D0%BF%D0%B5%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%BD%D0%B0%D1%8F)
      - [2. Метод map](#2-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4-map)
  - [Key](#key)
      - [Это может вызывать следующие проблемы:](#%D1%8D%D1%82%D0%BE-%D0%BC%D0%BE%D0%B6%D0%B5%D1%82-%D0%B2%D1%8B%D0%B7%D1%8B%D0%B2%D0%B0%D1%82%D1%8C-%D1%81%D0%BB%D0%B5%D0%B4%D1%83%D1%8E%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%BE%D0%B1%D0%BB%D0%B5%D0%BC%D1%8B)
      - [Решение – key](#%D1%80%D0%B5%D1%88%D0%B5%D0%BD%D0%B8%D0%B5--key)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Key. Списки в React. 

React позволяет выводить массивы элементов так же, как выводятся отдельные элементы. 

Например:

```javascript
const items = [
  <Item />,
  <Item />,
  <Item />,
];

const list = <div>
  {list}
</div>;
```

## Примеры применения

Большая часть случаев применения вывода массивов касаются вывода данных, которые мы не знаем заранее (динамические). К таким случаям относятся, например:

* Посты/комментарии
* Список результатов поиска
* Список дел
* Список сообщений
* И т.д.

Однако, их удобно использовать и для статических данных, таких как:

* Пункты меню
* Однотипные подсказки/блоки с разными данными

## Варианты реализации

Так или иначе, для вывода массива любых данных, достаточно передать в JSX его значение. React выведет все элементы "как есть", если они являются элементами HTML или React-компонентами, или преобразует к строкам, если нет. 

Чаще всего данные хранятся не в виде элементов, а в чем-то таком:

```javascript
const menu = [
  {
    href: "/",
    text: "Главная",
  },
  {
    href: "/settings",
    text: "Настройки",
    icon: SETTINGS_ICON,
  },
  {
    href: "https://app-play.google.apple/cool-app",
    text: "Скачать приложение",
    mobileOnly: true,
  },
]
```

И эти данные нам нужно преобразовать в массив готовых элементов перед тем, как передавать реакту. Обычно используют один из двух вариантов:

#### 1. Отдельная переменная

Что-то вроде

```javascript
const menuItems = [];
for (const item of menu) {
  menuItems.push(<Link href={item.href}>{item.text}</Link>);
}
return (
  <div>
    Меню:
    {menuItems}
  </div>
);
```

#### 2. Метод map

Отличается тем, что мы не создаем новых переменных, а подставляем сразу результат работы [map](array_useful_methods.md):

```javascript
return (
  <div>
    Меню:
    {menu.map(item => <Link href={item.href}>{item.text}</Link>)}
  </div>
);
```

Это может быть удобнее, когда логика вывода простая и нам нужно просто вывести все элементы из одного массива. Если набор данных сложный, например, их нужно собрать из разных мест, можно использовать предыдущий способ. 

## Key

Часто в выведеном списке что-то может поменяться. Например, удалится элемент или два элемента поменяются местами. 

Представим пример, компонент выводит такое дерево:

```javascript
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
</ul>
```

В какой-то момент пользовательские данные меняются и список становится таким (мы удалили элемент "2"):

```javascript
<ul>
  <li>1</li>
  <li>3</li>
  <li>4</li>
</ul>
```

Однако реакт не знает, что удалился элемент "2". Для него все выглядит так:

* Первый элемент остался таким же
* У второго текст поменялся с 2 на 3
* У третьего текст поменялся с 3 на 4
* Четвертый элемент удалился

[Подробнее про процесс reconciliation](react-reconciliation.md).

#### Это может вызывать следующие проблемы:

* Падение производительности

  > Вместо удаления одного элемента в середине списка реакт удаляет последний и меняет текст всех остальных. Особенно заметно, если в списке несколько тысяч элементов.

* Неправильная обработка фокуса

  > Пример: Вывод списка чего-то, у чего есть кнопка "поднять вверх". 
  >
  > ```javascript
  > <ul>
  >   <li>
  >     1
  >     <button>Поднять элемент 1</button>
  >   </li>
  >   <li>
  >     2
  >     <button>Поднять элемент 2</button>
  >   </li>
  >   <li>
  >     3
  >     <button>Поднять элемент 3</button>
  >   </li>
  >   <li>
  >     4
  >     <button>Поднять элемент 4</button>
  >   </li>
  > </ul>
  > ```
  >
  > Пользователь кликает на кнопку (например, у третьего элемента) и список меняется с 1-2-3-4 на 3-1-2-4. 
  >
  > Для реакта это снова не перенос элемента, а изменение текста и контента у всего в списке. Можно сказать, что реакт в какой-то момент делает вывод "*тут была кнопка, и теперь тут тоже кнопка, значит это тот же элемент, только нужно обновить текст и функцию для обработки клика*".
  >
  > Поэтому фактически та кнопка, которая означала "Поднять элемент 3" остается той же, хотя теперь и выглядит как "Поднять элемент 2". Это приводит к тому, что кнопка, поменявшая текст, может остаться выделенной, как только что нажатая, ведь пользователь на неё только что кликнул (хоть и думает, что она перенеслась).

#### Решение – key

Для решения этих проблем в реакт есть правило: **каждый элемент списка должен иметь уникальный атрибут key**.

Так, при изменении порядка или удалении элементов, реакт поймет, что произошло, и действительно перенесет или удалит элементы.

Рассмотрим пример из прошлой секции:

```javascript
<ul>
  <li key={1}>1</li>
  <li key={2}>2</li>
  <li key={3}>3</li>
  <li key={4}>4</li>
</ul>
```

> Я пишу тут `key` для каждого элемента, но подразумеваю вывод этих элементов из массива

Теперь, если удалить элемент "2", реакт поймет, что произошло:

* Первый (`key === 1`) элемент остался таким же
* Второй (`key === 2`) удален
* Третий (`key === 3`) остался таким же
* Четвертый (`key === 4`) остался таким же

Так обновится только один элемент – тот, который действительно изменился.

> Заметка: key не попадает в параметры выводимого с ним компонента, а используется реактом напрямую. Например, `<Item key={2} visible />` получит только `{ visible: true }`.