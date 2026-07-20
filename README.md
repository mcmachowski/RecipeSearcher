# RecipeSearcher

Aplikacja full-stack (React + Node.js/Express + MongoDB) do wyszukiwania przepisów kulinarnych z rozbudowanymi filtrami i wyszukiwaniem głosowym. Zawiera zarządzanie kontem użytkownika, listę ulubionych przepisów oraz panel administratora do zarządzania przepisami i użytkownikami.

🔗 **Live demo:** https://mcmachowski-recipe-searcher.netlify.app/

---

## 🧪 Testowanie i automatyzacja

Ten projekt jest dla mnie przede wszystkim poligonem do budowania frameworka do automatyzacji testów — nie tylko pisania testów, ale też ich utrzymania, organizacji i integracji z CI/CD.

**Stack testowy:** Playwright + TypeScript

### Zakres pokrycia

| Obszar                | Plik                     | Co jest testowane                                                 |
| --------------------- | ------------------------ | ----------------------------------------------------------------- |
| Logowanie             | `sign-in.spec.ts`        | poprawne/niepoprawne logowanie, walidacje                         |
| Rejestracja           | `sign-up.spec.ts`        | zakładanie nowego konta, walidacje formularza                     |
| Strona główna         | `home.spec.ts`           | wyświetlanie treści, elementy layoutu                             |
| Nawigacja             | `navigation.spec.ts`     | przechodzenie między widokami aplikacji                           |
| Przepisy              | `recipes.spec.ts`        | listowanie i interakcje z przepisami                              |
| Wyszukiwanie i filtry | `search.spec.ts`         | wyszukiwanie po frazie, kombinacje filtrów                        |
| Edycja profilu        | `edit.profile.spec.ts`   | zmiana danych konta                                               |
| Usuwanie danych       | `delete.spec.ts`         | usuwanie przepisu/konta                                           |
| Panel admina          | `admin.spec.ts`          | dodawanie, edycja i usuwanie przepisów, zarządzanie użytkownikami |
| Ulubione (user)       | `user.favorites.spec.ts` | dodawanie/usuwanie przepisów z ulubionych                         |

> 🔜 **W planach:** testy API (folder `all_tests/api` już przygotowany w strukturze, implementacja w toku).

### CI/CD

Testy są częścią pipeline'u GitHub Actions (`.github/workflows/ci.yml`), uruchamianego:

- przy każdym pushu i pull requeście do `main`,
- ręcznie (`workflow_dispatch`),
- **automatycznie co noc** (`cron`) — jako regularny regression check niezależny od aktywności w repo.

Pipeline:

1. instaluje zależności backendu,
2. instaluje zależności frontendu i buduje paczkę produkcyjną,
3. dopiero po tym odpala pełny zestaw testów Playwright,
4. publikuje raport HTML z wynikami na GitHub Pages i linkuje go w podsumowaniu joba.

**Najnowszy Raport z Testów E2E:** https://mcmachowski.github.io/RecipeSearcher/playwright-report/e2e/
**Najnowszy Raport z Testów API:** https://mcmachowski.github.io/RecipeSearcher/playwright-report/api/

### Uruchamianie testów lokalnie

```bash
cd tests
npm install
npx playwright install --with-deps

# wszystkie testy
npx playwright test

# tryb UI (podgląd krok po kroku)
npx playwright test --ui

# tylko jeden projekt
npx playwright test --project=admin-tests
```

Wymagane zmienne środowiskowe (plik `.env` w `tests/`):

```
BASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
NORMAL_USER_EMAIL=
NORMAL_USER_PASSWORD=
EDIT_PROFILE_USER_EMAIL=
EDIT_PROFILE_USER_PASSWORD=
```

---

## 🛠️ Stack technologiczny aplikacji

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Baza danych:** MongoDB (Mongoose)
- **Testy:** Playwright, TypeScript
- **CI/CD:** GitHub Actions

## 🚀 Instalacja i uruchomienie

1. Sklonuj repozytorium:

```bash
git clone https://github.com/mcmachowski/RecipeSearcher.git
```

2. Zainstaluj i uruchom frontend:

```bash
cd frontend
npm install
```

3. Zainstaluj i uruchom backend:

```bash
cd backend
npm install
```

4. Konta testowe do wypróbowania aplikacji:

```
Konto zwykłego użytkownika:
email = user@gmail.com
password = testers

Konto administratora:
email = admin@gmail.com
password = testers
```
