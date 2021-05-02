<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Классовые компоненты](#%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%BE%D0%B2%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D1%8B)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Синтаксис](#%D1%81%D0%B8%D0%BD%D1%82%D0%B0%D0%BA%D1%81%D0%B8%D1%81)
  - [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Жизненный цикл](#%D0%B6%D0%B8%D0%B7%D0%BD%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D1%86%D0%B8%D0%BA%D0%BB)
    - [Подробнее про методы](#%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5-%D0%BF%D1%80%D0%BE-%D0%BC%D0%B5%D1%82%D0%BE%D0%B4%D1%8B)
      - [`constructor(props)`](#constructorprops)
      - [`static getDerivedStateFromProps(props, state)`](#static-getderivedstatefrompropsprops-state)
      - [`componentDidMount()`](#componentdidmount)
      - [`shouldComponentUpdate(nextProps, nextState)`](#shouldcomponentupdatenextprops-nextstate)
      - [`getSnapshotBeforeUpdate(prevProps, prevState)`](#getsnapshotbeforeupdateprevprops-prevstate)
      - [`componentDidUpdate(prevProps, prevState, snapshot)`](#componentdidupdateprevprops-prevstate-snapshot)
      - [`componentWillUnmount()`](#componentwillunmount)
  - [API компонентов](#api-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2)
  - [Свойства `this`](#%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0-this)
  - [Свойства класса](#%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0-%D0%BA%D0%BB%D0%B0%D1%81%D1%81%D0%B0)
    - [`defaultProps`](#defaultprops)
  - [Пример компонента со счетчиком](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0-%D1%81%D0%BE-%D1%81%D1%87%D0%B5%D1%82%D1%87%D0%B8%D0%BA%D0%BE%D0%BC)
  - [Осторожность с контекстом](#%D0%BE%D1%81%D1%82%D0%BE%D1%80%D0%BE%D0%B6%D0%BD%D0%BE%D1%81%D1%82%D1%8C-%D1%81-%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82%D0%BE%D0%BC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Классовые компоненты

## Определение

**Классовые компоненты** – реакт-компоненты, описанные не в виде функции, а в виде класса/конструктора.

Основные отличия:

* Жизненный цикл
* Контекст через `this`

## Синтаксис

Классовые компоненты описываются как класс, унаследованный от класса `React.Component`. 
Единственный метод, который обязательно нужно описать, это `render`. 
Он будет вызываться тогда, когда реакт будет отрисовывать/обновлять ваш компонент.

То, что возвращает метод `render`, будет отрисовано в дереве.

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Привет, {this.props.name}</h1>;
  }
}
```

## Использование

В использовании таких компонентов отличий нет. Как и с функциональными, это `<ComponentName />`.

## Жизненный цикл

Для классовых компонентов реакт вызывает определенные методы тогда, когда наступает тот или иной этап "жизни" компонента.

Этапы жизненного цикла такие:

* Монтирование
* Обновление
* Размонтирование

Для каждого этапа вызывается цепочка методов (если они описаны в компоненте):

* Монтирование
    - `constructor`
    - `static getDerivedStateFromProps`
    - `render`
    - `componentDidMount`
* Обновление
    - `static getDerivedStateFromProps`
    - `shouldComponentUpdate`
    - `render`
    - `getSnapshotBeforeUpdate`
    - `componentDidUpdate`
* Размонтирование
    - `componentWillUnmount`
    
### Подробнее про методы

#### `constructor(props)`

Вызывается первым в компоненте, используется редко. Может понадобиться, например, для установки начального состояния:

```javascript
constructor(props) {
  super(props);
  this.state = { counter: 0 };
}
```

#### `static getDerivedStateFromProps(props, state)`

Реакт вызывает его, чтобы получить из пропсов состояние. Например, если для любых входящих данных вам нужны одинаковые преобразования.

Метод статический, поэтому не имеет доступа к данным конкретного экземпляра компонента. 

#### `componentDidMount()`

Вызывается после того, как результат рендера компонента был вставлен в DOM

#### `shouldComponentUpdate(nextProps, nextState)`

Вызывается до начала обновления. Если метод вернет false, обновление не будет произведено.

#### `getSnapshotBeforeUpdate(prevProps, prevState)`

Результат работы этого метода попадет в `componentDidUpdate` как параметр. Почти не используется.

#### `componentDidUpdate(prevProps, prevState, snapshot)`

Вызывается как `componentDidMount`, но после обновления

#### `componentWillUnmount()`

Вызывается перед удалением компонента из дерева.

## API компонентов

Методы класса могут использовать следующие методы для работы с компонентом:

* `this.setState`
* `this.forceUpdate`

`setState` принимает на вход объект с изменениями и, опционально, коллбек. 
- После вызова `setState` создается "заявка на обновление", компонент обновляется не моментально.
- Состояние обновляется, а не перезаписывается. Например, если состояние было `{a: 1, b: 2}`, а `setState` был вызван с `{b: 3, c: 4}`, то состояние станет `{a: 1, b: 3, c: 4}`

`forceUpdate` вызывает обновление компонента без изменений, принимает опциональный коллбек.

## Свойства `this`

* `this.state` – объект с состоянием компонента
* `this.props` - объект с параметрами "снаружи"

## Свойства класса

### `defaultProps`

```javascript
class Greeting extends ...

Greeting.defaultProps = {}
```

В этом объекте можно описать значения, которые попадут в `this.props` компонента, 
если не будут указаны при использовании.

## Пример компонента со счетчиком

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        count: 0,
    };
  }
    
  render() {
    return <div>
        <button onClick={() => this.setState({count: count + 1})}>{this.state.count}</button>
    </div>
  }
}
```

## Осторожность с контекстом

В прошлом примере увеличение счетчика можно было бы вынести в отдельный метод:

```jsx
increaseCount() {
    this.setState({count: count + 1})
}

render() {
    return <div>
        <button onClick={increaseCount}>{this.state.count}</button>
    </div>
}
```

Однако, пусть это и не очевидно, `this` внутри `increaseCount` не будет указывать на компонент. 
Дело в том, что обработчики вызываются вне контекста компонента, это выглядит не как `component.increaseCount()`, а, 
скорее, как `clickHandler()`, из-за чего контекст теряется.
Решить это можно тремя способами:
- Поменять обработчик на стрелочную функцию (`increaseCount = () => {}`)
- Добавить `bind` при передаче в `onClick` (`onClick={this.increaseCount.bind(this)}`)
- Закрепить контекст в конструкторе (`this.increaseCount = this.increaseCount.bind(this)`)