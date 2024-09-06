
# TeamUP - Front-End

Este es el módulo **front-end** de la aplicación **TeamUP**, desarrollado en **React** utilizando **Vite**.

## Instalación de dependencias

Para instalar las bibliotecas necesarias para el funcionamiento de la aplicación:

1. Asegúrate de tener **npm** instalado en tu sistema.
2. Ejecuta el siguiente comando para instalar las dependencias definidas en el archivo `package.json`:

   ```bash
   npm install
   ```

## Estructura del proyecto

La estructura principal del proyecto está organizada de la siguiente manera:

- **/public**: Contiene las imágenes y archivos estáticos del proyecto.
- **/node_modules**: Aquí se descargan las dependencias necesarias para el funcionamiento del proyecto.
- **index.html**: Archivo principal que llama a la clase `main.jsx` para renderizar el HTML de la aplicación.
- **vite.config.js**: Archivo de configuración de Vite. Define algunas propiedades clave para el despliegue del cliente, como el puerto del servidor.
- **/src**: Directorio principal del código fuente:
  - `main.jsx`: Aquí se crea el DOM de React y se define la estructura inicial de la aplicación. El componente `App` alberga todos los demás componentes, mientras que `toastContainer` maneja las notificaciones **toast**.
  - **/src/components**: Contiene los componentes de la aplicación, cada uno en su propio directorio, junto con su respectivo archivo `.css` para los estilos.

## Ejecución del proyecto

Para lanzar el cliente:

1. Ejecuta el siguiente comando:

   ```bash
   npm run-script dev
   ```

2. La aplicación será accesible desde la siguiente URL: 

   ```bash
   http://localhost:[puerto definido]
   ```

