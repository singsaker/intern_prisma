# Intern

This project is a continous build of the internal web page specifically developed for Singsaker Studenterhjem. The web page includes functionality for assigning work shifts, doing room distibution, administrating seniority, and much more.

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

Requirements for the software and other tools to build, test and push

- You will need a working copy of the MySQL database running locally on your machine or a connection URL a working MySQL database.

### Installing

A step by step series of examples that tell you how to get a development
environment running

Clone the repository to your local machine

    git clone https://github.com/singsaker/intern.git

Install dependencies for both frontend (.intern/frontend) and backend (.intern/backend)

    npm install

Create .intern/backend/.env

    APP_SECRET={SECRET PASSWORD}
    DATABASE_URL="mysql://USERNAME:PASSWORD@URL:PORT/DATABASE"
    ENVIORNMENT="dev"
    DB_ENV="testing"

Initiate prisma (from .intern/backend)

    npx prisma init

Introspect database

    npx prisma db pull

Generate prisma client

    npx prisma generate

## Running the tests

Run in developement mode

For both backend and frontend

    npm run dev

localhost:3000 is the URL for the frontpage and localhost:4000 is a URL for doing backend calls in GraphQL.

### Sample Tests

Test backend by opening localhost:4000 and run the following

    query {
        hentBeboere {
            id
            fornavn
            etternavn
        }
    }

## Built With

- [Prisma](https://www.prisma.io/) - Used
  as ORM for MySQL
- [Apollo with GraphQL](https://www.apollographql.com/) - Used as server and query language
- [NextJS](https://nextjs.org/) - React framework for production
- [Material-UI](https://mui.com/) - Used as UI library
- [React Redux](https://react-redux.js.org/) - Used as state container

## Authors

- **Kevin Nordnes** - _Project leader_ - [LinkedIn](https://www.linkedin.com/in/kevin-nordnes/)
- **Kaspar Paus Græsdal** - _Developer_
- **Mathias Raa** - _Developer_
- **Daniel Løvbrøtte Olsen** - _Developer_
