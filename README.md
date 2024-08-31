#### TFG-TeamUP-front

  Este es el módulo front-end de la aplicación Team UP, desarrollado en React con Vite.

#### Instalar dependencias

  Las bibliotecas necesarias para su funcionamiento se encuentran en el archivo package.json. Para instalarlas hay que tener         previamente instalado npm, una vez instalado ejecutar el comando 'npm install'.

#### Estructura del proyecto

  En el directorio /public se encuentran las imagenes y archivos estaticos del proyecto.
  
  En node_modules se descaragŕan las dependencias necesarias.
  
  El archivo index.html llama a la clase main.jsx para renderizar el html.
  
  El archivo vite.config.js define algunas propiedades para el despliege del cliente, en este caso lo mas importante es el puerto.
  
  En el directorio /src se encuentra main.jsx, donde se crea el DOM de React y se define la estructura de la aplicación, siendo App el componente que va a alojar el resto de componentes de la aplicación y toastContainer el componente para mostrar los toast.
  
  En el directorio /src/components se encuentras todos los componentes de la aplicacion en su respectivo directorio, junto con su archivo .css para los estilos. 

#### Ejecución

  Para lanzar el cliente hay que ejecutar el comando 'npm run-script dev' y será accesible desde la ruta 'http://localhost:[puerto definido]'
