# Persona

Frontend :

- **Vue**

Backend :

- **Drizzle** as an _ORM_ to manage the _SQLite database_
- **Better-auth** for everything _auth_ related (server/client)
- **Resend** for everything _email_ related (verification, password reset, ...)
- **Cron** job for _database backups_ each day at midnight (with _14 day retention_)
- **Litecli** for _production db management_ through _ssh in the vps and docker volume_.

Tech :

- **Bun**
- **Docker Compose**
- **Github Actions**
- **Oxlint** + **Oxfmt**

![Persona App Screenshot](https://github.com/calamina/persona/raw/refs/heads/master/.github/persona.avif)

## TODO

- [ ] clean feed parser
- [ ] add password reset
- [ ] check account existing
- [ ] finish feed block
- [ ] add animations / transitionGroups
- [ ] add favorite folders
- [ ] add favorite singleton check
- [ ] add todos
- [ ] add rss
- [ ] add main links
- [ ] add calendar ??

## Info

- frontend : http://localhost:5173
- backend : http://localhost:3000

## How to use

Run stuff :

- `bun dev`
- Back : `bun dev:api`
- Front: `bun dev:web`

Install stuff :

- `bun add` in app folder

`bun install` at root or in app :)
