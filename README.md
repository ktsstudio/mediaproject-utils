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
* [noop](./src/noop.ts) - просто пустая функция
* [pluralize](./src/pluralize.ts) - утилита определения падежного окончания слова в зависимости от числа сущностей
* [randomNumber](./src/randomNumber.ts) - генератор случайных чисел

### Хуки

* [useAndroidKeyboard](./src/hooks/useAndroidKeyboard.ts) - хук для отслеживания открытия клавиатуры на андроиде
* [useOrientationChange](./src/hooks/useOrientationChange.ts) - хук для определения изменения ориентации мобильного устройства
* [useScrollTop](./src/hooks/useScrollTop.ts) - хук для прокрутки страницы на верх
* [orientationContext](./src/hooks/orientationContext.tsx) - хук для получения ориентации мобильного устройства из контекста и компонент-провайдер
* [usePolling](./src/hooks/usePolling.ts) - хук для поллинга
* [usePreviousState](./src/hooks/usePreviousState.ts) - хук для получения предыдущего значения переменной
* [useValueTransition](./src/hooks/useValueTransition.ts) - хук для получения измененного значение переменной с задержкой


### Обратная связь

Любой фидбэк вы можете передать нам на почту [hello@ktsstudio.ru](mailto:hello@ktsstudio.ru) в письме с темой "mediaproject-utils"
