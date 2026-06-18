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

## Features

- [x] Favorites
- [x] Youtube
- [x] 4chan
- [ ] Todos
- [ ] Links
- [ ] RSS ?
- [ ] Calendar ?

## TODO

- [ ] DRY Tabs : component / shared styles
- [ ] Channel add : refacto style for widescreen
- [ ] Add 4chan searchbar
- [ ] Register 4chan boards, favorite one ?
- [ ] Enable / disable features
- [ ] Features tabs fullscreen on mobile + main + small core recap ?
- [ ] change default favorite icon link
- [ ] manage errors (store mmessages ?)
- [ ] Loading component
- [ ] multi-use inputs ? search and add if not found
- [ ] add themes
- [ ] redirect on register + redirect on mail send
- [ ] add password reset
- [ ] check account existing
- [ ] add animations / transitionGroups
- [ ] add favorite folders
- [ ] responsive
- [ ] yaml config ?

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
