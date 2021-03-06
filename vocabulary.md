<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Словарь](#%D1%81%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C)
  - [Нативно/нативное](#%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%BD%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5)
  - [Императивное программирование](#%D0%B8%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Декларативное программирование](#%D0%B4%D0%B5%D0%BA%D0%BB%D0%B0%D1%80%D0%B0%D1%82%D0%B8%D0%B2%D0%BD%D0%BE%D0%B5-%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Спрайты](#%D1%81%D0%BF%D1%80%D0%B0%D0%B9%D1%82%D1%8B)
  - [Микроразметка](#%D0%BC%D0%B8%D0%BA%D1%80%D0%BE%D1%80%D0%B0%D0%B7%D0%BC%D0%B5%D1%82%D0%BA%D0%B0)
  - [Docker](#docker)
  - [Nginx](#nginx)
  - [CI/CD](#cicd)
  - [Автотесты](#%D0%B0%D0%B2%D1%82%D0%BE%D1%82%D0%B5%D1%81%D1%82%D1%8B)
  - [Gracefull degradation](#gracefull-degradation)
  - [Progressive enhancement](#progressive-enhancement)
  - [Express.js](#expressjs)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Словарь

Набор не связанных друг с другом определений. 

## Нативно/нативное

**Нативным** называют инструменты, которые реализованы для конкретной платформы. Например, для HTML нативными будут чекбоксы, написанные через `<input type="checkbox">`, а не нативными (кастомными) – написанные поверх нативных инструментов, например, на React.  

## Императивное программирование

**Императивным** называется подход, когда каждая единица программы, инструкция, сообщает системе, как нужно *изменить* состояние системы. Например, для интерфейса императивная обработка открытия меню выглядела бы так:

```
- При клике на меню
	- Добавить к body класс no-scroll
	- Создать элемент div
	- Добавить к нему класс overlay
	- Добавить этот элемент в body
	- Добавить к меню класс menu--visible
- При клике на overlay
	/* Все обратные инструкции */
```

Минус такого подхода в том, что для того, чтобы программа работала стабильно, и её можно было поддерживать и расширять, нужно уделять много времени консистентности – тому, чтобы всё состояние во все моменты времени оставалось правильным, никакие элементы, добавленные в разных местах, не забывали удаляться при обратном действии и т.д.

## Декларативное программирование

**Декларативный подход** предполагает, что программа сообщает системе не о необходимых *изменениях*, а о необходимом актуальном *состоянии*, а система автоматически приводит свое состояние в актуальный вид. Такой подход использует React.

```
- При клике на меню
	- Меню должно иметь классы menu и menu--visible
	- В body должен быть div с классом overlay
	- Body должно иметь класс no-scroll
- При клике на overlay 
	- Меню должно иметь класс menu
```

## Спрайты

**Спрайт** – изображение, объединяющее множество иконок, и используещееся затем для отображения любой из них. 

```css
.icon {
  background-image: url(sprite.jpg);
}

.icon--ok {
  width: 10px;
  height: 10px;
  background-position: 10px 10px;
}

.icon--not-ok {
  width: 10px;
  height: 10px;
  background-position: 20px 10px;
}
```

Польза спрайтов в том, что вместо загрузки нескольких десятков изображений, которые бы создавали очередь и тратили время на установку связи с сервером, загружается только одно.

## Микроразметка

**Микроразметка** – это дополнительная разметка страниц сайта "поверх" html. Обычно реализуется дополнительными атрибутами тегов с указанием в их значениях того, какую "роль" они выполняют. Один из самых распространенных стандартов – schema.org. Вот пример кода с такой разметкой:

```html
<div itemscope itemtype="http://schema.org/Movie">
	<h1 itemprop="name">Титаник</h1>
	<div itemprop="director" itemscope itemtype="http://schema.org/Person">
    Режиссер:
		<span itemprop="name">Джеймс Кэмерон</span>
		(род. <span itemprop="birthDate">16 августа 1954 г.</span>)
	</div>
	<span itemprop="genre">
    мелодрама
  </span>
	<a href="..." itemprop="trailer">Трейлер</a>
</div>
```

С помощью микроразметки внешние сервисы и поисковые боты могут легче читать сайты, так как им не нужно пытаться распознавать содержимое страницы, а можно ориентироваться на микроразметку.

## Docker

**Docker/докер** – система развертывания приложений. Работает с "контейнерами", в которых разработчики приложений описывают, какое окружение им нужно для работы приложения.

Например, для какого-нибудь телеграм-бота на node.js контейнер требует node.js версии 14, база mongodb и установленные инструменты для распознавания речи от Яндекса. А для бэкенда другого сервиса нужна node.js версии 10 и mongodb. 

Докер создаст для них независимые изолированные пространства, где они смогут работать так, как будто работают на отдельных, настроенных по требованиям приложений, серверах.

Базовые команды для терминала:

- `docker ps` выведет список работающих контейнеров
- `docker start <container>` запустит контейнер
- `docker stop <container>` остановит контейнер

## Nginx

**Nginx** – часто используемый сервер. Помогает организовывать работу с доменами, кешированием, предоставляет быструю отдачу статичных файлов, позволяет перенаправлять запросы внутренним приложениям, например, все запросы на `https://aaa.ru` перенаправлять в `localhost:3333`.

## CI/CD

**CI** – continuous integration – непрерывная интеграция – практика, предполагающая частое вливание рабочих веток в основную и автоматизированный запуск сборок и тестирования проекта в целях выявления проблем интеграции на ранних стадиях.

**CD** – continuous delivery – непрерывное развертывание – практика, предполагающая частое (обычно ручное) разворачивание новых версий продукта. Позволяет быстро отдавать пользователям изменения, быстро получать от них фидбек, видеть проблемы и исправлять их.

## Автотесты

**Автотесты** – тесты продукта, которые производятся и обрабатываются не человеком, а программой. 

Виды автотестов:

- Юнит (или модульные).
  Проверяют отдельную единицу продукта, например, функцию или компонент. Часто работают как "если на входе А, то на выходе должно быть Б".

- Интеграционные.
  Проверяют весь продукт в сборе. В вебе это обычно тесты, запускаемые в управляемом браузере, который заходит на страницы, выполняет какие-либо действия, как пользователь, и проверяет результат. Часто именно такие тесты в разговоре называют автотестами.

- Сервисные. 
Что-то среднее между юнит-тестами и интеграционными тестами. Проверяют отдельные части продукта, которые не являются независимыми единицами (юнитами), но и не требуют сборки всего продукта вместе. Например, тесты одного из сервисов бэкенда, используемого ботами и фронтендом, но без подключения действительных ботов и фронтенда.

## Gracefull degradation

**Постепенная деградация** – подход к разработке веб-сервисов, делающий упор на отказоустойчивость. Подразумевает, что если при использовании сервиса что-то не сработало (не загрузились скрипты, у пользователя старый браузер, интернет плохой), сервис должен продолжить работать и выглядеть нормально. 

Например, если сервис делает для интерфейса кастомный выбор дат, требующий работающего JavaScript и загруженных стилей, он должен убедиться, что при отсутствии чего-либо из этого пользователь увидит, пусть и не такой удобный, но работающий, нативный html-интерфейс.

## Progressive enhancement

**Постепенное улучшение** – подход, похожий на предыдущий, но он более явно указывает на порядок разработки – сначала, до любых сложных интерфейсов, разрабатывается минимальная html-разметка, которая будет работать практически во всех браузерах. Затем пишется CSS для нее, но без использования новых "фич". Затем более сложная стилизация, и потом динамика – JavaScript.

## Express.js

**Express** – довольно популярный (17 миллионов загрузок в неделю) сервер для node.js. Предоставляет роутинг, кеширование, шаблонизацию, middleware, соединение с базами данных.