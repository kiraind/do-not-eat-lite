# do-not-eat-lite

### Экраны приложения

1. Экран приветствия
    1. Приветствие, описание функционала, терминологии
2. Экран начальной настроки
    1. Ввод имени
    2. Ввод целевого потребления калорий
    3. Переключатель сохранять ли местоположение
3. Основной экран приложения
    1. Кнопка перехода на экран настроек
    2. Кнопка перехода на экран приема пищи | в «Тарелку»
    3. График голода
    4. Сколько калорий сегодня съедено от цели
    5. Кнопка перехода на экран холодильника
    6. Кнопка перехода на экран готовки блюда
    7. Кнопка перехода на экран добавления продукта
    8. Кнопка перехода на экран поиска продукта
    9. Лента приемов пищи
4. Экран настроек
    1. Имя
    2. Целевое потребление калорий
    3. Переключатель сохранять ли местоположение
5. Экран приема пищи | «Тарелка»
    1. Список блюд
        1. Количество
        2. Калории
        3. Кнопка «Убрать»
    2. Сумма калорий
    3. Кнопка «Подтвердить»
6. Экран холодильника
    1. Список блюд
        1. Кнопка «Съесть»
        2. Кнопка «Выбросить»
    2. Список продуктов
        1. Кнопка «Съесть»
        2. Кнопка «Выбросить»
7. Экран готовки блюда
    1. Список известных блюд
    2. Кнопка «Новое блюдо»
    2. Список продуктов
        1. Поле «Количество»
    3. Кнопка «Добавить продукт»
    4. Кнопка «Приготовить»
8. Экран добавления продукта
    1. Штрих-код
    2. Название
    3. Категория
    4. Единицa измерения
    5. Калорий на единицу измерения
    6. Массовая доля белков
    7. Массовая доля жиров
    8. Массовая доля углеводов
9. Экран поиска продукта
    1. Сканер штрихкода
    2. Поле текстового запроса
    3. Список результатов поиска
    4. Выбранный / найденный по штрихкоду продукт
    5. Кнопка подтверждения

### Таблицы

1. Приемы пищи
    1. ID
    2. Дата и время
    3. Широта
    4. Долгота
    5. Ярлык
2. Блюда
    1. ID
    2. Название
    3. Метод приготовления
    4. Количество при готовке
    4. Единицa измерения
    5. Калорий на единицу измерения
    6. Массовая доля белков
    7. Массовая доля жиров
    8. Массовая доля углеводов
3. Связь: Приемы пищи—Блюда
    1. ID Приема пищи
    2. ID Блюда
    3. Количество блюда
4. Продукты
    1. ID
    2. Название
    3. Штрих-код
    4. Единицa измерения
    5. Калорий на единицу измерения
    6. Массовая доля белков
    7. Массовая доля жиров
    8. Массовая доля углеводов
5. Связь: Блюда—Продукты
    1. ID Блюда
    2. ID Продукта
    3. Массовая доля продукта 
6. Холодильник: блюда
    1. ID блюда
    2. Оставшееся количество
7. Холодильник: продукты
    1. ID продукта
    2. Оставшееся количество