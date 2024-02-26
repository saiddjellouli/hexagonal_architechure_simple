# Banking App Backend

This project is a simple banking application backend developed using hexagonal architecture. It provides APIs for basic banking functionalities.

## Features

- Hexagonal architecture for maintainability and testability.
- Docker setup for running a local PostgreSQL database instance.
- Integration with Jest for writing and executing tests.

## Prerequisites

- Node.js installed on your local machine.
- Docker installed on your local machine.

## Getting Started

Follow these steps to get the project up and running on your local machine:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Start the local PostgreSQL database using Docker : `docker-compose up -d`

5. Run the backend server: `npm start`

## Testing

You can run the tests using the following command: `npm test`

Contributors are encouraged to write tests for new features and functionalities to ensure the stability of the application.

## Configuration

- The backend server is configured to connect to the local PostgreSQL database instance. You can modify the database configuration in the `src/sequelize.js` file if needed.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
