# Brigia Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Estrutura

```code
app/
 ├── core/          (serviços globais, interceptors, auth guard)
 ├── shared/        (componentes reutilizáveis: botões, inputs, tabelas)
 ├── features/      (módulos de funcionalidade: login, pacientes, etc)
 ├── app.component.ts
 ├── app.config.ts
 ├── app.routes.ts
```

## Development server

### Local development server:
```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:8081/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests
```bash
ng test
```
