# Область видимости

## Определение и принцип работы

**Область видимости** это совокупность правил, по которым выполняется поиск переменных при их использовании. 

При выполнении программы выполняется два этапа:

1. При инициализации переменной компилятор создает её и привязывает к области, в которой она была создана. Например, для `var` это "рамки" текущей функции, а для `let` и `const` – текущего блока. 

2. При выполнении, когда переменная используется, движок пытается найти её в текущей области видимости (чтобы знать, куда записывать значение или откуда его читать). 

## Правила поиска переменных

* Переменная ищется в той области видимости, где находится её использование
* Если она не найдена, она ищется в области видимости “выше”
* Поиск продолжается, пока она не будет найдена, или пока движок не дойдет до глобальной области видимости

## Результаты поиска

* Если переменная была найдена на каком-то из шагов, поиск останавливается, и она используется там, где она была нужна
* Если поиск дошел до конца, а переменная не была найдена, то результат зависит от двух условий:
  * Если переменная ищется для записи значения:
    * Если включен [строгий режим](strict_mode.md), поиск завершится ошибкой
    * Если [строгий режим](strict_mode.md) выключен, будет создана новая переменная в глобальной области видимости
  * Если переменная ищется для чтения значения, поиск завершится ошибкой

## Что определяет границы области видимости

#### Для `var`

Переменная создается в рамках функции, в которой находится объявление

#### Для `let` и `const`

Переменная создается в рамках блока кода (области между `{` и `}`, даже если это не функция, а условие или цикл)

> К блоку кода также относится область внутри круглых скобок с условиями циклов

> Также блок кода можно объявить, просто написав фигурные скобки без каких-либо операторов:
>
> ```javascript
> {
>   let a;
> }
> a = 3; // a не будет найдена
> ```

## Примеры

### 1

```javascript
function foo() {
  var bar;
  bar = 3;
}
```

На первом этапе будет создана переменная `bar`, привязанная к области видимости функции `foo`. 

На втором этапе, когда выполнение кода будет на третьей строке, движок обращается за переменной `bar`, ищет её объявление в области функции `foo`, в которой на тот момент находится. Он находит её в этой области и записывает `3` в переменную, которая была объявлена строкой выше. 

#### 2

```javascript
let a;

function foo() {
  let a;
  
  function bar() {
    a = 2;
  }
  
  function baz() {
    let a;
    a = 10;
  }
}
```

В этом примере объявляются три переменные с названием `a`:

* В глобальной области видимости
* В области видимости функции `foo` 
* В области видимости функции `baz`

Когда движок ищет переменную `a` для функции `bar`, он не находит её в области этой функции и поднимается выше. Там он находит переменную `a` и использует её. 

Когда движок ищет переменную `a` для функции `baz`, он находит её в своей области видимости и использует для записи в неё значения. 

Переменная `a`, объявленная глобально, не будет использована. 

#### 3

```javascript
function foo() {
  function bar() {
    var a;
  }
  function baz() {
    for (let a = 0; a < 5; a++) {
      // тут какие-то действия, здесь это не принципиально
    }
    a = 3;
  }
}
```

Здесь поиск переменной завершится ошибкой (или созданием новой переменной глобально, в зависимости от [строгого режима](strict_mode.md)). Движок будет искать переменную в `baz`, затем в `foo`, затем глобально, но не зайдет ни в `bar`, ни в блок цикла `for`, к которому привязаны свои переменные `a`. 

Если бы переменная для цикла была объявлена с помощью `var`, то она бы прикрепилась к функции `baz`, а не к блоку цикла, и нашлась бы на первом шаге (однако это не означает, что это лучше или удобнее, так как обычно приводит к возможности случайно изменить переменную, которую менять не планировалось).

## Связанные темы

* [Замыкания](closure.md)
* [Всплытие](hoisting.md)
