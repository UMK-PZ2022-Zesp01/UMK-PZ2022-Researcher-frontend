# JustResearch - Dokumentacja

## Opis aplikacji

## Technologie
Część frontendowa aplikacji JustResearch została stworzona przy użyciu następujących technologii:
- ReactJS
- HTML
- CSS
- Google Maps API
- Własne API napisane w języku Kotlin

## Instrukcje instalacji

Aby zainstalować i uruchomić aplikację JustResearch, wykonaj poniższe kroki:

1. Sklonuj repozytorium:
```
  git clone https://github.com/UMK-PZ2022-Zesp01/UMK-PZ2022-Researcher-frontend.git
```

2. Przejdź do folderu projektu:
```
 cd UMK-PZ2022-Researcher-frontend
```

3. Zainstaluj wymagane zależności:

```
  npm install
```

4. Skonfiguruj klucz Google Maps API:
- Utwórz plik `.env` w głównym katalogu projektu.
- W pliku `.env` dodaj klucz API:
```
  REACT_APP_GOOGLE_MAPS_API_KEY=<twój_klucz_api>
```

5. Uruchom aplikację:

```
  npm start
```

Aplikacja JustResearch powinna być dostępna w przeglądarce pod adresem `http://localhost:3000`.

## Funkcjonalności
Poniżej przedstawiamy podstawowe funkcjonalności oferowane przez aplikację JustResearch:

### Dla badaczy:

1. Autoryzacja użytkownika
2. Utworzenie nowego ogłoszenia o badaniu uwzględniając kryteria przynależności do grupy badanej
3. Zarządzanie utworzonymi badaniami
4. Śledzenie ilości zarejestrowanych na badanie użytkowników
5. Odpowiadanie na pytania użytkowników dotyczące badania

### Dla osób chcących wziąć udział w badaniach:

1. Autoryzacja użytkownika
2. Przeglądanie prowadzonych badań
3. Sortowanie i filtrowanie badań
4. Zadanie pytania autorowi badania na publicznym forum lub drogą mailową
5. Rejestracja na wybrane badania

## Wsparcie techniczne

W aplikacji w panelu użytkownika znajduje się specjalna rubryka z możliwością zgłoszenia błędów/uwag do administratorów aplikacji. Można też skontaktować się mailowo:
```
researcher.pz2022@gmail.com
```

## Autorzy
* [Mateusz Maszkiewicz](https://github.com/mmaszkie) (opiekun zespołu)
* [Dawid Odolczyk](https://github.com/odolczykd) (kierownik zespołu, programista fullstack)
* [Michał Szczepański](https://github.com/RimbiBimbi1) (sekretarz zespołu, programista fullstack)
* [Paweł Osiński](https://github.com/Osik2000) (programista backend, tester)
* [Konrad Żyra](https://github.com/Zyrekk) (programista fullstack)
* [Jakub Farkasinszki](https://github.com/JJJayKob) (programista frontend)

____
JustResearch to projekt na zaliczenie przedmiotu **Programowanie Zespołowe**.

[Wydział Matematyki i Informatyki](https://www.mat.umk.pl/) - [Uniwersytet Mikołaja Kopernika](https://www.umk.pl) w Toruniu.
____
