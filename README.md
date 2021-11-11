![kts](./logo.png)

# @ktsstudio/mediaproject-utils

Общие утилиты для медиапроектов.

### Использование

`npm install @ktsstudio/mediaproject-utils`

`yarn add @ktsstudio/mediaproject-utils`

### Утилиты

* [api](./src/api.ts) - утилита для отправки запросов к api. Работает поверх axios
* [checkMobile](./src/checkMobile.ts) - утилита для проверки, является ли текущий девайс мобильным устройством. Осуществляет проверку путем применения регулярного выражения к user agent
* [copyToClipboard](./src/copyToClipboard.ts) - утилита для копирования в буфер
* [findGetParameter](./src/findGetParameter.ts) - утилита для парсинга квери параметров
* [fixActive](./src/fixActive.ts) - утилита для отключения :active для safari
* [getter](./src/getter.ts) - геттер для вложенных полей объектов
* [initializeAppParams](./src/initializeAppParams.ts) - утилита для инициализации медиапроекта с инициализацией основных параметров и их записи в localStorage
* [loadImages](./src/loadImages.ts) - утилита для загрузки изображений на промисах
* [localStorage](./src/localStorage.ts) - имитация localStorage, хранимая в Window
* [markup](./src/markup.ts) - утилита для адаптивной верстки на rem
* [noop](./src/noop.ts) - просто пустая функция
* [pluralize](./src/pluralize.ts) - утилита для выбора нужного падежного окончания слова
* [randomNumber](./src/randomNumber.ts) - генератор случайных чисел

### Хуки

* [useAndroidKeyboard](./src/hooks/useAndroidKeyboard.ts) - хук для отслеживания открытия клавиатуры на андроиде
* [useOrientationChange](./src/hooks/useOrientationChange.ts) - хук для определения изменения ориентации мобильного устройства
* [useScrollTop](./src/hooks/useScrollTop.ts) - хук для прокрутки страницы на верх


### Обратная связь

Любой фидбэк вы можете передать нам на почту [hello@ktsstudio.ru](mailto:hello@ktsstudio.ru) в письме с темой "mediaproject-utils"
