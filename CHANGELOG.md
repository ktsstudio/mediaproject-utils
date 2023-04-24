### v4.1.1

- [+] настроенно тестирование утилит с помощью `Jest`
- [*] обновлены скрипты сборки для исключения тестовых файлов и утилит
- [+] покрыты тестами: `pluralize`, `splitIntoLines`, `useOrientationChange`, `useAndroidKeyboard`, `usePolling`
- [*] `splitIntoLines`: в режиме разделения строк переносами теперь не оборачивает фрагменты строк в `span`
- [*] поднята версия `axios` до версии, используемой в шаблонах
- [*] исправлен [баг в api](https://github.com/ktsstudio/mediaproject-utils/issues/15)
- [*] `findGetParameter`: вместо `substr` используется `substring`

## v4.1.0

- [*] pluralize: добавлена возможность не указывать variantsAfter
- [*] api: функция callApi больше не возвращает весь объект с ответом, если поле data пустое
- [*] api: можно передать ожидаемый тип ответа
- [+] splitIntoLines
- [+] sleep

# v4.0.0

- [+] OrientationProvider, useOrientationContext
- [+] usePolling
- [+] usePreviousState
- [+] useValueTransition
- [*] api принимает объект типа UrlConfigType
- [+] checkDev
- [*] в initializeAppParams устанавливается поле is_dev
- [*] изменена сигнатура метода pluralize, добавлен метод plural
- [*] в randomNumber добавлена возможность получать дробное число

# v3.0.0

- [-] markup перемещен в @ktsstudio/mediaproject-styles

## v2.1.0

- [+] useAndroidKeyboard
- [+] useOrientationChange
- [+] useScrollTop
- [*] fix JSDoc syntax
- [*] checkMobile adds classname 'desktop'

### v2.0.6

- [+] markup: optional parameter withCheckMobile
- [*] markup: parameter markupConst is now optional

### v2.0.5

- [*] pluralize: added variants before count

### v2.0.4

- [*] api type

### v2.0.3

- [*] api type

### v2.0.2

- [*] exports

### v2.0.1

- [*] README

# v2.0.0

- [+] JSDoc
- [+] Exported type Window
- [*] All types moved to src/types
- [-] checkIOS
- [+] initializeAppParams
- [+] fixActive
- [*] README

### v1.0.2

- [*] Code-style

### v1.0.1

- [+] Метод проверки текущей платформы на IOS
- [*] Поле IS_MOBILE в Window, типы

# v1.0.0

- [+] Базовые утилиты
