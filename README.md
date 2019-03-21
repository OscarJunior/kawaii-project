This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# Ejercicios

## Ejercicio 1

Ahora mismo, los kawaii son felices únicamente si están en la columna inicial, el primer ejercicio es implementar el switch *make kawaiis happy*, es decir, aunque los ítems de la columnas se hayan modificado, restauren su posición inicial, y todos sean felices

## Ejercicio 2

Con ayuda del *localStorage* del navegador, permitir al usuario que su configuración de kawaiis se mantenga la próxima vez que entre a la app

## Ejercicio 3

En las columnas de kawaiis, cuando cambiamos uno de los kawaiis por un tipo primitivo distinto, nos llevará a la pantalla de error oh-no, por ejemplo colocando un 1 en lugar de una función kawaii. Cuando esto suceda necesitamos también informar de lo ocurrido, en Formarketer usamos *sentry* para lograrlo, en este ejercicio, tenemos que configurar la app para que sea capaz de enviar datos a sentry

[Docs - JavaScript](https://docs.sentry.io/platforms/javascript/?platform=browsernpm)

## Ejercicio 4

Usar un kawaii componente para personalizar el “no data” por defecto de antd, y personalizar otro cuando la llamada a la Api de GitHub devuelva una lista vacía

## Ejercicio 5

Llamar a la API pública de GitHub para obtener los commits que se realizaron para cada uno de los repositorios

[https://developer.github.com/v3/repos/commits/](https://developer.github.com/v3/repos/commits/) 

## Ejercicio 6

Personalizar un loading a través de nuestros componentes kawaiis, este componente deberá aparecer en cada llamada a la Api de GitHub

## Ejercicio 7

Implementar el envío de notificaciones a través de antd para proporcionar feedback al usuario de las principales acciones que esta realizando

* Error en llamada Axios
* Cambio de estado de un Kawaii, en las acciones del DragAndDrop