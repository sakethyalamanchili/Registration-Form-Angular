# ANGULAR REACTIVE FORM

This project is an Angular-based registration form that includes various input fields for personal details, address, skills, and experience. The form is designed to be user-friendly and includes validation for required fields and custom validators.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Form Details](#form-details)
- [Custom Validators](#custom-validators)
- [Styling](#styling)
- [Contributing](#contributing)
- [Development Server](#development-server)
- [Code Scaffolding](#code-scaffolding)
- [Build](#build)
- [Running Unit Tests](#running-unit-tests)
- [Running End-to-End Tests](#running-end-to-end-tests)
- [Further Help](#further-help)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sakethyalamanchili/Registration-Form-Angular.git
   cd Registration-Form-Angular
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## Usage

- Fill in the required fields in the registration form.
- Add skills and experience as needed.
- Submit the form to see the entered data in the console.

## Form Details

The form includes the following sections:
- **Personal Details**: First Name, Last Name, Email, Username, Date of Birth, Gender
- **Address**: Street, Country, City, Region, Postal Code
- **Skills**: Add multiple skills
- **Experience**: Add multiple experiences including company name, position, total experience, start date, and end date

## Custom Validators

- **noSpaceAllowed**: Ensures that the first name and last name do not contain spaces.
- **checkUserName**: Asynchronously checks if the username is already taken.

## Styling

The form is styled using a combination of CSS and media queries to ensure a responsive design.

## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any enhancements or bug fixes.

## Development Server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.
