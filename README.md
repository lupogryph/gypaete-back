# Gypaete Backend

## Description

The backend of [gypaete-admin](https://github.com/lupogryph/gypaete-admin)

API for 
- Home page CRUD
- House CRUD
  - description
  - photo upload / gallery
  - services
  - tarifs
- Rooms CRUD
  - Create, Delete Room
  - Room CRUD
    - description
    - photo upload / gallery
    - services
    - tarifs
- Reservation CRUD
  - links to reservation thirdparties
  - (not implemented yet) Reservation management with calendar
- Social informations CRUD
- Contact informations CRUD
- Users CRUD
- Internal JWT auth

Support roles

## Technology

NestJS / openapi / postgresql

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
