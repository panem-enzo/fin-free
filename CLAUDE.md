# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FinFree is a personal finance / budget tracking app: React + TypeScript frontend, Spring Boot backend, PostgreSQL database. Currently the only implemented domain concept is **Expense** — there is no Budget, Account, or Income entity yet despite the README's feature list, and no auth.

## Repository Layout

- `frontend/` — Vite + React 19 + TypeScript + TailwindCSS 4 SPA
- `backend/spring-boot/` — Spring Boot 3.5 (Java 21) REST API
- Database is PostgreSQL run via Docker (see `backend/spring-boot/docker-compose.yml`), not embedded in the backend module

## Common Commands

### Frontend (`frontend/`)
```bash
npm install       # install deps
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # preview production build
```
There is no frontend test runner configured.

### Backend (`backend/spring-boot/`)
```bash
./mvnw spring-boot:run                 # run the API at http://localhost:8080
./mvnw test                            # run all tests
./mvnw test -Dtest=ApplicationTests    # run a single test class
./mvnw clean package                   # build jar
```

### Database
```bash
cd backend/spring-boot
docker compose up -d    # starts Postgres on host port 5332 (mapped from container 5432)
```
The datasource URL in `application.properties` points at `jdbc:postgresql://localhost:5332/finfree` with user/password `finfree`/`password`, matching `docker-compose.yml`. `spring.jpa.hibernate.ddl-auto=update` — schema is derived from JPA entities automatically, there are no migration scripts (no Flyway/Liquibase).

## Architecture

### Backend — standard layered Spring Boot structure
`com.finfree` package, one vertical slice per domain concept (currently just `expense`):
- `controller/ExpenseController` — REST endpoints under `api/v1/expenses`, `@CrossOrigin("*")` (open CORS, backend has no auth/security layer at all)
- `service/ExpenseService` — business logic, calls repository directly, throws `IllegalStateException` on not-found (no custom exception types or global `@ControllerAdvice` yet)
- `repository/ExpenseRepository` — `JpaRepository<Expense, Integer>` plus a custom `@Query` (`calculateTotal`) that sums all expense amounts server-side
- `model/Expense` — JPA entity, plain getters/setters, no Lombok

When adding a new domain entity (e.g. Budget, Account), mirror this same controller/service/repository/model package structure.

### Frontend — component tree under `App.tsx`
- `App.tsx` renders a 6-column CSS grid: `Sidebar` (1 col) + `ExpenseWrapper` (5 cols)
- `ExpenseWrapper` is the top-level page component: fetches expenses and the total via `services/api.ts` on mount, holds `expenses`/`total` state, and composes `OverviewItem` (balance/income/expense summary tiles — currently hard-coded numbers, not wired to real data), `ExpenseForm`, `ExpenseReport`, `ExpenseTable`
- `ExpenseTable` renders a list of `ExpenseItem` rows; each row has local editable input state but update-to-backend wiring is incomplete (see in-code `* NEED TO UPDATE *` / `* NEED TO IMPLEMENT *` markers in `ExpenseItem.tsx`)
- `services/api.ts` — axios client (`baseURL: http://localhost:8080/api/v1`), one function per endpoint. Note `insertExpense` and `deleteAllExpenses` are NOT async/await despite calling a promise-based axios client — `insertExpense` returns before the API response arrives (marked `*UPDATE THIS* to async` in source); don't assume its return value reflects the persisted record when writing code that depends on it
- `services/currencyFormatter.ts` — `cadFormatter`, an `Intl.NumberFormat` for CAD currency, used wherever amounts are displayed
- `types/index.ts` — shared `Expense` interface, mirrors the backend entity shape

### Frontend/backend contract
The frontend's `Expense` type and the backend's `Expense` entity must be kept in sync manually — there's no shared schema/codegen. Date is a plain string (`M/D/YYYY`, client-generated), not a real date type on either side.
