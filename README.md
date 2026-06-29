# Persona

Homepage / dashboard with several features

![Persona App Screenshot](https://github.com/calamina/persona/raw/refs/heads/master/.github/persona.avif)

- [x] Favorites
- [x] Youtube
- [x] 4chan
- [x] Todos
- [x] RSS
- [x] Note
- [ ] Shortcuts
- [ ] Calendar ?
- [ ] Git status / repos ?
- [ ] Apps uptime / up ?

## Frontend

- `Vue`

## Backend

- `Drizzle ORM` to manage the _SQLite database_
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

- [ ] ! Streamline tabs (youtube / feed / 4chan?)
- [ ] ! Refactor Rss feature : better naming, subfolder
- [ ] ! Favorite add : ISO channel / rss add -> get title and confirm

- [ ] confirmation on add (notif / snack) ?
- [ ] actions like minimize -> activate in title bar
- [ ] refacto login / register for theme
- [ ] Add 4chan searchbar ?
- [ ] Register 4chan boards, favorite one ?
- [ ] Features tabs on mobile instead of stack
- [ ] change default favorite icon link
- [ ] manage errors (store messages ? error in title bar ! add orange and green)
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
- batch add (rss feeds, youtube channels)
```
