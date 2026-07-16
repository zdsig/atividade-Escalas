# Coding Conventions

## Objetivo

Definir padrões de nomenclatura e organização para garantir consistência, legibilidade e manutenção do código.

---

# Naming Conventions

## Environment Variables

Todas as variáveis de ambiente devem utilizar **UPPER_SNAKE_CASE**.

### Exemplo

```env
DATABASE_URL=
API_KEY=
JWT_SECRET=
REDIS_HOST=
```

---

## Global Variables

Variáveis globais devem utilizar **camelCase**.

### Exemplo

```ts
const applicationConfig = {};
const currentUser = {};
const requestTimeout = 3000;
```

---

## Local Variables

Variáveis locais devem utilizar **camelCase**.

### Exemplo

```ts
const totalAmount = 100;
const customerName = "John Doe";
const isActive = true;
```

---

## Constants

Constantes devem utilizar **UPPER_SNAKE_CASE**.

### Exemplo

```ts
const MAX_RETRY_ATTEMPTS = 5;
const DEFAULT_TIMEOUT = 3000;
const HTTP_STATUS_OK = 200;
```

---

## Functions

Funções devem utilizar **camelCase** e iniciar preferencialmente com um verbo.

### Exemplo

```ts
function getUserById() {}
function calculateTotal() {}
function validateToken() {}
function sendNotification() {}
```

---

## Classes

Classes devem utilizar **PascalCase**.

### Exemplo

```ts
class UserService {}
class PaymentProcessor {}
class DatabaseConnection {}
```

---

## Interfaces

Interfaces devem utilizar **PascalCase**.

### Exemplo

```ts
interface UserProfile {}
interface PaymentRequest {}
```

---

## Enums

Enums devem utilizar **PascalCase**.

Os valores internos devem utilizar **UPPER_SNAKE_CASE**.

### Exemplo

```ts
enum UserStatus {
  ACTIVE,
  INACTIVE,
  PENDING_APPROVAL
}
```

---

## Types

Types devem utilizar **PascalCase**.

### Exemplo

```ts
type UserResponse = {};
type PaymentPayload = {};
```

---

## Files

Arquivos devem utilizar **kebab-case**.

### Exemplo

```text
user-service.ts
payment-controller.ts
database-config.ts
```

---

## Directories

Diretórios devem utilizar **kebab-case**.

### Exemplo

```text
src/user-management
src/payment-service
src/shared-utils
```

---

# Code Guidelines

## Language

- Utilizar inglês para nomes de variáveis, funções, classes, interfaces, arquivos e diretórios.
- Comentários podem ser escritos em português quando necessário.

## Naming

- Utilizar nomes claros e descritivos.
- Evitar abreviações desnecessárias.
- Priorizar legibilidade em vez de nomes curtos.
- Evitar nomes genéricos como:
  - `data`
  - `temp`
  - `value`
  - `obj`
  - `item`

### Bom exemplo

```ts
const customerEmail = "";
const pendingInvoices = [];
const calculatedDiscount = 0;
```

### Evitar

```ts
const data = "";
const temp = [];
const x = 0;
```

---

# Quick Reference

| Elemento | Convenção |
|-----------|-----------|
| Environment Variables | `UPPER_SNAKE_CASE` |
| Global Variables | `camelCase` |
| Local Variables | `camelCase` |
| Constants | `UPPER_SNAKE_CASE` |
| Functions | `camelCase` |
| Classes | `PascalCase` |
| Interfaces | `PascalCase` |
| Types | `PascalCase` |
| Enums | `PascalCase` |
| Enum Values | `UPPER_SNAKE_CASE` |
| Files | `kebab-case` |
| Directories | `kebab-case` |