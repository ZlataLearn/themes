<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Хуки](#%D1%85%D1%83%D0%BA%D0%B8)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Правила хуков](#%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%85%D1%83%D0%BA%D0%BE%D0%B2)
  - [Что дальше](#%D1%87%D1%82%D0%BE-%D0%B4%D0%B0%D0%BB%D1%8C%D1%88%D0%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Хуки

## Определение

**Хуки** в React – встроенные функции, позволяющие расширять работу компонентов. 

В React есть следующие (наиболее часто используемые) хуки:

* [useState](react-useState.md) для управления состоянием компонента
* [useRef](react-useRef.md) для работы со ссылками на DOM-элементы
* [useEffect](react-useEffect.md) и [useLayoutEffect](react-useEffect.md) для реализации дополнительной логики "вне" рендера (например, подписка на события, походы по сети)
* [useMemo](react-useMemo.md) для мемоизации любых данных
* [useCallback](react-useCallback.md) для мемоизации колбеков
* [useContext](react-useContext.md) для работы с [контекстом](react-context.md)
* [useReducer](react-useReducer.md) для более сложной работы с состоянием

## Правила хуков

Для корректной работы хуков стоит понимать, как реакт различает вызовы хуков между собой. При первой отрисовке запоминается порядок, которому в будущем соответствуют возвращаемые значения.

Поэтому есть несколько правил:

* Хуки должны всегда следовать в одном порядке (не могут быть внутри условий, циклов и т.д.)
* Количество хуков всегда должно быть одним (хук не может быть после условного `return`)

## Что дальше

* [Про хуки в документации](https://ru.reactjs.org/docs/hooks-reference.html)
* [Переиспользование хуков, кастомные хуки](react-custom-hooks.md)