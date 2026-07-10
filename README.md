# Persona

Homepage / dashboard with several features

![Persona App Screenshot](https://github.com/calamina/persona/raw/refs/heads/master/.github/persona.avif)

![Persona App Alternative theme](https://github.com/calamina/persona/raw/refs/heads/master/.github/persona-alt.avif)

![Persona App Dark theme](https://github.com/calamina/persona/raw/refs/heads/master/.github/persona-dark.avif)

- [x] Favorites
- [x] Youtube
- [x] 4chan
- [x] Todos
- [x] RSS
- [x] Note
- [x] Links
- [x] Search
- [x] Git events & repos
- [ ] Calendar ?

## Frontend

- `Vue`
- `Tanstack Query`

## Backend

- `Drizzle ORM` to manage the _SQLite database_
- `Better-auth` for everything _auth_ related (server/client)
- `Resend` for everything _email_ related (verification, password reset, ...)

## Tech

- `Bun`
- `Docker Compose`
- `Github Actions`
- `Oxlint` + `Oxfmt`
- `Litecli` for _production db management_ through _ssh in the vps and docker volume_.
- `Cron job` for _database backups_ each day at midnight (with _14 day retention_)

---

## TODO

- ! Inputs : check FieldBase & ModalInput and DRY
- ! manage errors (store messages ? error in title bar ?)
- confirmation on add (notif / snack) ?
- Register 4chan boards, favorite one ?
- search : add bangs / shortcuts
- tabs instead of windows on mobile
- redirect on register + redirect on mail send
- add password reset
- check account existing
- sort links and categs, maybe todos ?

---

## Config (todo)

```yaml
- theme selection
- spacing (compact / minimal / biggie)
- features (enable/disable)
- chan selection & default
- batch add (rss feeds, youtube channels)
```
