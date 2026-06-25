# Persona

Homepage / dashboard with several features

![Persona App Screenshot](https://github.com/calamina/persona/raw/refs/heads/master/.github/persona.avif)

- [x] Favorites
- [x] Youtube
- [x] 4chan
- [x] Todos
- [x] RSS
- [x] Note
- [ ] Links
- [ ] Calendar ?

## Frontend

- `Vue`

## Backend

- `Drizzle` as an _ORM_ to manage the _SQLite database_
- `Better-auth` for everything _auth_ related (server/client)
- `Resend` for everything _email_ related (verification, password reset, ...)
- `Cron job` for _database backups_ each day at midnight (with _14 day retention_)
- `Litecli` for _production db management_ through _ssh in the vps and docker volume_.

## Tech

- `Bun`
- `Docker Compose`
- `Github Actions`
- `Oxlint` + `Oxfmt`

## TODO

- [ ] ! shared loading layout + async loading
- [ ] ! shared action wrapper
- [ ] ! shared item component (small/regular)
- [ ] ! rss performance + dynamic list

- [ ] refacto login / register for theme
- [ ] Favorite add : on title check fill field and enable edit
- [ ] Add 4chan searchbar
- [ ] Register 4chan boards, favorite one ?
- [ ] Features tabs on mobile instead of stack
- [ ] change default favorite icon link
- [ ] manage errors (store messages ?)
- [ ] multi-use inputs ? search / add
- [ ] redirect on register + redirect on mail send
- [ ] add password reset
- [ ] check account existing
- [ ] add animations / transitionGroups
- [ ] add favorite folders

## Config (todo)

```yaml
- theme selection
- spacing (compact / minimal / biggie)
- features (enable/disable)
- chan selection & default
```
