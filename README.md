# PREDICT

## Parkinson Database Creator

The Parkinson Database Creator can be accessed on this [link](https://free214.cs.upt.ro:6060/). Make sure you follow the steps written in this [tutorial](https://aquamarine-karlen-77.tiiny.site/).

This README file provides an overview and instructions for setting up and running the Parkinson Database Creator app using Yarn package manager.

### Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Additional Resources](#additional-resources)

### Overview

The Parkinson Database Creator app is a React PWA (Progressive Web App) designed to standardize and facilitate the gathering of data to be used in Parkinson's disease research.

### Installation

To install and run this React app, please follow these steps:

1. Ensure you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com/) installed on your machine.
2. Clone the repository or download the source code.
3. Open a terminal or command prompt and navigate to the project's root directory.
```shell
cd my-app
```
4. Run the following command to install the necessary dependencies:

```shell
yarn install
```
## Usage

To run the React app locally, follow these steps:
1. Make sure you are in the project's root diretory.
2. Run the following command to start the development server:

```shell
yarn start
```
3. Open a web browser and visit http://localhost:3000 to view the app.

### Folder structure

The project structure is organized as follows:
- **node_modules/**: This folder contains all the project dependencies.
- **public/**: This folder contains the public assets of the app, such as the HTML file.
- **src/**: This folder contains the source code of the app.
- **src/App.js**: The main component that represents the app.
- **src/index.js**: The entry point of the app.

### Available Scripts

In the project directory, you can run the following scripts:
- **yarn start**: Runs the app in development mode. Open http://localhost:3000 to view it in the browser.
- **yarn test**: Launches the test runner in interactive watch mode.
- **yarn build**: Builds the app for production in the build/ folder.
- **yarn eject**: Removes the single build dependency and allows customization.

### Deployment

To deploy the app, you can use various methods, including static hosting platforms like Netlify or Vercel. You can also deploy it manually to a web server.

Make sure you run the following command before deploying:
```shell
yarn build
```
This command generates an optimized production build of the app in the build/ folder. You can deploy the contents of this folder to your hosting provider.

### Additional resources
- [React Documentation](https://legacy.reactjs.org/docs/getting-started.html)
- [Create React App Documentation](https://create-react-app.dev/docs/getting-started/)
- [Making a Progressive Web App](https://create-react-app.dev/docs/making-a-progressive-web-app/)

## /notebooks
In the /notebooks folder you can find Python notebooks that can be run in Google Collab.
## /backend
The folder contains the files that are used for the backend server to host the app.
