# Sistema de Banco de Horas

### Para executar a aplicação

- Maven

```console
mvn clean spring-boot:run
```



### Informações adicionais



- Administrador: admin@bh.com and 123

- Recurso disponivel para todos os usuários: 
    - [http://localhost:8080/api/usuarios](http://localhost:8080/api/usuarios)
    - [http://localhost:8080/api/cadastroUsuario](http://localhost:8080/api/cadastroUsuario)
    - [http://localhost:8080/api/horarios](http://localhost:8080/api/horarios)
    - [http://localhost:8080/api/horarios/id](http://localhost:8080/api/horarios/id)
- Recurso administrativo: [http://localhost:8080/api/users/adm](http://localhost:8080/api/users/adm)

### Exemplos de request

- Gerar token de acesso Windows: 

```console
curl localhost:8080/login -H "Content-Type: application/json" -X POST -d '{\"email\":\"[EMAIL]\", \"senha\":\"[SENHA]\"}'
```
- Gerar token de acesso *nix ou Mac OSX: 
```console
curl localhost:8080/login -H "Content-Type: application/json" -X POST -d '{"email":"[EMAIL]", "senha":"[SENHA]"}'
```

```json
{
  "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiREEyRDUzMkQxQkVqd3RyZXNvdXJjZWlkIl0sInVzZXJfbmFtZSI6ImdhYnJpZWxjemFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTcyNzMwNTQ3OCwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImY4MTJkYzBlLWZiZmItNDQ1My04ZDI2LTY5NmM2NWQ0MzA5ZiIsImNsaWVudF9pZCI6InNwcmluZy1yZXN0LW9hdXRoMi1qd3QifQ.ExobK5qYHzSxVpoPUvT8uQwBfZwsefYWsEjsxJopni0",
  "token_type":"bearer"
}
```

- Renovar Token: o usuário precisa está logado para renovar seu token

```console
curl localhost:8080/auth/refresh_token
```

- Acessar recurso:
    - Obter todos os usuários
```console
curl http://localhost:8080/api/usuarios
```

```json
[
  {
    "id": 1,
    "nome": "ADMIN",
    "email": "admin@bh.com",
    "perfis": [
      {
        "id": 1,
        "nome": "ROLE_ADMIN",
        "authority": "ROLE_ADMIN"
      }
    ]
    }
]
```
- Acessar recurso:
    - Obter todos os horarios por id do usuario ou pelo usuário da sessão
```console
Por id
curl http://localhost:8080/api/horario/1
```
```console
Por usuário da sessão
curl http://localhost:8080/api/horario
```

```json
[
  {
    "id": 1,
    "qtdHoras": 8,
    "data": "13/03/2019"
  },
  {
    "id": 2,
    "qtdHoras": 8,
    "data": "14/03/2019"
  }
]
```
- Acessar recurso:
    - Cadastro de usuário no Windows e no (*nix ou Max), segue a ordem
```console
Windows
curl http://localhost:8080/api/cadastroUsuario -H "Content-Type: application/json" -X POST -d '{\"nome\":\"[NOME]\", \"email\":\"[EMAIL]\", \"senha\":\"[SENHA]\"}'
```
```console
(*nix ou Max)
curl http://localhost:8080/api/cadastroUsuario -H "Content-Type: application/json" -X POST -d '{"nome":"[NOME]", "email":"[EMAIL]", "senha":"[SENHA]"}'
```
```json
{
  "id": 5,
  "nome": "Patrick",
  "email": "patrickep123@alu.ufc.br",
  "perfis": [
    {
      "id": 5,
      "nome": "ROLE_USUARIO",
      "authority": "ROLE_USUARIO"
    }
  ]
}
```
- Acessar recurso:
    - Cadastro de horario no Windows e no (*nix ou Max), segue a ordem
```console
Windows
curl http://localhost:8080/app/horario -H "Content-Type: application/json, Authorization: Bearer [ACCESS_TOKEN]" -X POST -d '{\"qtdHoras\":[NUMERO DE HORAS],\"data\":\"[DATA]\"}'
```
```console
(*nix ou Max)
curl http://localhost:8080/app/horario -H "Content-Type: application/json, Authorization: Bearer [ACCESS_TOKEN]" -X POST -d '{"qtdHoras":[NUMERO DE HORAS],"data":"[DATA]"}'
```
```json
{
  "id": null,
  "qtdHoras": 8,
  "data": 1552532400000
}
```

- Acessar recurso:
    - Cadastro de horario por id de usuário no Windows e no (*nix ou Max), segue a ordem
```console
Windows
curl http://localhost:8080/app/horario/{id} -H "Content-Type: application/json, Authorization: Bearer [ACCESS_TOKEN]" -X POST -d '{\"qtdHoras\":[NUMERO DE HORAS],\"data\":\"[DATA]\"}'
```
```console
(*nix ou Max)
curl http://localhost:8080/app/horario/{id} -H "Content-Type: application/json, Authorization: Bearer [ACCESS_TOKEN]" -X POST -d '{"qtdHoras":[NUMERO DE HORAS],"data":"[DATA]"}'
```
```json
{
  "id": null,
  "qtdHoras": 8,
  "data": 1552532400000
}
```