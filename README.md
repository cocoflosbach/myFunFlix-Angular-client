# MyFunFlixAngularClient

Built Using Angular, this is the client-side for a movie directory application called myFunFlix based on its existing
server-side code (REST API and database).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.4.

## Essential Views and Features

Main view
- Returns a list of ALL movies to the user (each listed item with an image, title, and description)
- Sorting and filtering
- Ability to select a movie for more details

Single movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

Login view
- Allows users to log in with a username and password

Registration view
- Allows new users to register (username, password, email, birthday)

Genre view
- Returns data about a genre, with a name and description
- Displays example movies

Director view
- Returns data about a director (name, bio, birth year, death year)
- Displays example movies


## Live website

Visit myFlixAngularClient [here](https://cocoflosbach.github.io/myFunFlix-Angular-client/welcome) and sign up to explore the app!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
