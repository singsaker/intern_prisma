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

    APP_SECRET={Secret passphrase}
    DATABASE_URL="mysql://USERNAME:PASSWORD@URL:PORT/DATABASE"
    ENVIORNMENT="dev"
    DB_ENV="testing"

Initiate prisma (from .intern/backend)

    npx prisma init

Introspect database

    npx prisma db pull

Genereta prisma client

    npx prisma generate

## Running the tests

Run in developement mode

For both backend and frontend

    npm run dev

localhost:3000 is the URL for the frontpage and localhost:4000 is a URL for doing backend calls in GrapQL.

### Sample Tests

Explain what these tests test and why

    Give an example

### Style test

Checks if the best practices and the right coding style has been used.

    Give an example

## Deployment

Add additional notes to deploy this on a live system

## Built With

- [Contributor Covenant](https://www.contributor-covenant.org/) - Used
  for the Code of Conduct
- [Creative Commons](https://creativecommons.org/) - Used to choose
  the license

## Authors

- **Billie Thompson** - _Provided README Template_ -
  [PurpleBooth](https://github.com/PurpleBooth)

See also the list of
[contributors](https://github.com/PurpleBooth/a-good-readme-template/contributors)
who participated in this project.
