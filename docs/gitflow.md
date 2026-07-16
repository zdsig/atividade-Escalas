# Git Flow

## Objetivo

Definir o fluxo de trabalho Git utilizado no projeto para garantir organização, rastreabilidade e previsibilidade durante o desenvolvimento, homologação e publicação de novas versões.

---

# Estrutura de Branches

## Main

A branch `main` representa o ambiente de produção.

### Regras

- Deve conter apenas código estável.
- Não são permitidos commits diretos.
- Alterações devem chegar através de Pull Requests.
- Todo merge deve passar por revisão.

---

## Develop

A branch `develop` representa o ambiente de desenvolvimento.

### Regras

- Serve como branch de integração.
- Recebe merges das branches de feature.
- Deve permanecer sempre funcional.

---

## Feature Branches

Utilizadas para desenvolvimento de novas funcionalidades.

### Padrão

```text
feature/nome-da-funcionalidade
```

### Exemplos

```text
feature/user-authentication
feature/create-order
feature/payment-integration
```

### Origem

```text
develop
```

### Destino

```text
develop
```

---

## Bugfix Branches

Utilizadas para correções encontradas durante o desenvolvimento.

### Padrão

```text
bugfix/descricao-do-bug
```

### Exemplos

```text
bugfix/fix-login-validation
bugfix/fix-payment-calculation
```

### Origem

```text
develop
```

### Destino

```text
develop
```

---

## Release Branches

Utilizadas para preparar uma nova versão.

### Padrão

```text
release/vX.Y.Z
```

### Exemplos

```text
release/v1.0.0
release/v1.2.0
release/v2.0.0
```

### Origem

```text
develop
```

### Destino

```text
main
develop
```

---

## Hotfix Branches

Utilizadas para correções urgentes em produção.

### Padrão

```text
hotfix/descricao-da-correcao
```

### Exemplos

```text
hotfix/fix-production-login
hotfix/fix-security-vulnerability
```

### Origem

```text
main
```

### Destino

```text
main
develop
```

---

# Fluxo de Desenvolvimento

## Nova Funcionalidade

### 1. Atualizar a branch develop

```bash
git checkout develop
git pull origin develop
```

### 2. Criar uma feature

```bash
git checkout -b feature/user-authentication
```

### 3. Realizar commits

```bash
git add .
git commit -m "feat(auth): implement user authentication"
```

### 4. Enviar para o repositório remoto

```bash
git push origin feature/user-authentication
```

### 5. Criar Pull Request

Destino:

```text
develop
```

---

# Convenção de Commits

Utilizar o padrão Conventional Commits.

## Tipos Permitidos

### feat

Nova funcionalidade.

```text
feat(auth): add JWT authentication
```

### fix

Correção de bug.

```text
fix(payment): correct total calculation
```

### refactor

Refatoração sem alteração de comportamento.

```text
refactor(user): simplify validation flow
```

### docs

Alteração de documentação.

```text
docs(gitflow): update branching strategy
```

### test

Criação ou manutenção de testes.

```text
test(auth): add login test cases
```

### chore

Tarefas de suporte e manutenção.

```text
chore(deps): update dependencies
```

### perf

Melhoria de performance.

```text
perf(cache): optimize cache strategy
```

### ci

Alterações relacionadas ao pipeline.

```text
ci(github): update workflow
```

---

# Pull Requests

## Regras
