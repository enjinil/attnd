<h1 align="center">Attnd</h1>

<div align="center">Basic realtime attendance monitoring built with React and Phoenix.</div>

<br/>

<table>
  <tbody>
    <tr>
      <td><img width="100%" src="https://i.ibb.co.com/80DNDYp/attnd-admin.png" alt="attnd-admin" border="0"></td>
      <td><img width="100%" src="https://i.ibb.co.com/fkv0hWM/attnd-user.png" alt="attnd-user" border="0"></td>
    </tr>
  </tbody>
</table>

<h3 align="center">
  <a href="https://github.com/enjinil/attnd/tree/master/frontend">View frontend</a> |
  <a href="https://github.com/enjinil/attnd/tree/master/api">View API</a>
</h3>

<br/>
<br/>

<div align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white"/>
  <br/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Phoenix-FF2D20?style=flat&logoColor=white"/>
  <img src="https://img.shields.io/badge/GraphQL-E10098?logo=GraphQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/Cypress-69D3A7?style=flat&logo=cypress&logoColor=white"/>
</div>

<br/>
<br/>

## Features
- User can start and end a session to track their work hours
- Admin can track user attendance sessions in realtime
- Admin and user can view monthly total work hours summary
- Admin can manage users

## Setup development environment
- Install [postgreSQL](https://www.postgresql.org/)
- `git clone https://github.com/enjinil/attnd.git`
- Create `frontend/.env` and paste `frontend/.env.sample` content
- Setup api 
```bash
cd api && mix ecto.create && mix ecto.migrate
```
- Setup frontend
```bash
cd frontend && npm install
```
- Seed example data (optional)
  - Create admin user `admin@example.com` and insert other example data.
```bash
cd api
ADMIN_PASSWORD="anypassword123456" mix run priv/repo/seeds.exs
```
- Start the app
```bash
cd api && mix phx.server
cd frontend && npm run dev
```

## Running end-to-end tests
- Setup development environment
- Start the api 
```bash
cd api && mix phx.server
```
- Start the frontend client
```bash
cd frontend && npm run dev
```
- Run e2e tests
```bash
cd frontend && npm run e2e
```

## What's missing?

The following are things that are necessary but not covered yet

### Accessibility
The components have not yet implemented ARIA attributes for accessibility purposes.

### Unit/integration tests
Currently, the application relies solely on end-to-end tests to verify API and frontend functionality. However, many scenarios remain untested. Component integration tests can serve as an alternative for testing edge cases that are too expensive to validate through e2e testing. Unit tests would help verify that each component functions correctly and facilitate easier problem identification.

## License

[MIT](https://opensource.org/licenses/MIT)