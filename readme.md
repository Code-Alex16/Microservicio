# Agenda de Contactos - Microservicios & Angular

Este proyecto es una aplicación web de agenda de contactos, desarrollada con una arquitectura de microservicios utilizando Node.js y Express para el backend, y Angular para el frontend. Permite a los usuarios registrarse, iniciar sesión y gestionar sus contactos personales, incluyendo la asignación de categorías.,

---

## 🚀 Características

* **Autenticación y Autorización:**
    * Registro de nuevos usuarios.
    * Inicio de sesión seguro mediante JWT (JSON Web Tokens).
    * Rutas protegidas que requieren autenticación.
* **Gestión de Contactos (CRUD):**
    * Creación de nuevos contactos asociados al usuario.
    * Visualización de todos los contactos del usuario.
    * Edición de contactos existentes.
    * Eliminación de contactos.
* **Gestión de Categorías:**
    * Asignación de categorías predefinidas a los contactos.
    * Visualización del nombre y color de la categoría de un contacto en la lista.
* **Arquitectura de Microservicios:**
    * **Usuario-Service:** Maneja la lógica de autenticación y gestión de usuarios.
    * **Contactos-Service:** Gestiona las operaciones CRUD de los contactos.
    * **Categorias-Service:** Administra las categorías disponibles para los contactos.
    * **API Gateway:** Punto de entrada único para el frontend, que enruta las solicitudes a los microservicios correspondientes y aplica middlewares de autenticación.
* **Base de Datos:** MySQL para el almacenamiento de usuarios, contactos y categorías.
* **Frontend Moderno:** Desarrollado con Angular para una interfaz de usuario dinámica y reactiva.

---

## 🛠️ Tecnologías Utilizadas

### Backend (Microservicios)
* **Node.js:** Entorno de ejecución.
* **Express.js:** Framework web para construir APIs.
* **JSON Web Tokens (JWT):** Para autenticación.
* **bcrypt.js:** Para el hash de contraseñas.
* **MySQL2:** Conector MySQL para Node.js.
* **dotenv:** Para gestión de variables de entorno.

### Frontend
* **Angular:** Framework para la construcción de la interfaz de usuario.
* **TypeScript:** Lenguaje de programación.
* **HTML5 / CSS3:** Estructura y estilos.
* **Angular CLI:** Herramienta de línea de comandos para Angular.

### Base de Datos
* **MySQL:** Sistema de gestión de bases de datos relacionales.

---

## ⚙️ Cómo Usar el Proyecto (Desarrollo Local)

Para poner en marcha el proyecto en tu máquina local, sigue estos pasos:

### 1. Requisitos Previos

* **Node.js:** Versión 16.x o superior. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
* **Angular CLI:** Instálalo globalmente con npm:
    ```bash
    npm install -g @angular/cli
    ```
* **MySQL:** Un servidor de base de datos MySQL en ejecución. Puedes usar XAMPP, WAMP, MAMP, o instalar MySQL Server directamente.

### 2. Configuración de la Base de Datos

1.  Abre tu cliente MySQL (ej. MySQL Workbench, phpMyAdmin, HeidiSQL).
2.  Crea una nueva base de datos (por ejemplo, **`db_agenda_contactos`**).
3.  Ejecuta el siguiente script SQL para crear las tablas y las categorías iniciales en tu base de datos:

    ```sql
    -- Creación de tablas
    CREATE TABLE tbl_categorias (
        id_categoria INT PRIMARY KEY AUTO_INCREMENT,
        categoria VARCHAR(50) NOT NULL,
        color VARCHAR(7) DEFAULT '#CCCCCC' -- Columna para el color de la categoría
    );

    CREATE TABLE tbl_usuario (
        id_usuario INT PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL UNIQUE,
        passkey VARCHAR(255) NOT NULL
    );

    CREATE TABLE tbl_contactos (
        id_contacto INT PRIMARY KEY AUTO_INCREMENT,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100),
        telefono VARCHAR(20) NOT NULL,
        correo VARCHAR(50),
        id_usuario INT,
        id_categoria INT
    );

    -- Claves foráneas
    ALTER TABLE tbl_contactos
    ADD CONSTRAINT fk_contactos_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES tbl_usuario(id_usuario);

    ALTER TABLE tbl_contactos
    ADD CONSTRAINT fk_contactos_categoria
    FOREIGN KEY (id_categoria)
    REFERENCES tbl_categorias(id_categoria);

    -- Inserción de categorías iniciales
    INSERT INTO tbl_categorias(categoria, color) VALUES
    ('Familia', '#FF6347'),
    ('Universidad', '#4682B4'),
    ('Trabajo', '#32CD32'),
    ('Amigos', '#FFD700');
    ```

### 3. Configuración de Variables de Entorno para los Microservicios

En cada una de las carpetas de tus microservicios (`api-gateway`, `usuario-service`, `contactos-service`, `categorias-service`), crea un archivo llamado **`.env`** (sin extensión) con las siguientes variables. Ajusta los valores según la configuración de tu base de datos y tus secretos:

#### **`.env` (Dentro de `usuario-service`, `contactos-service`, `categorias-service`)**
```.env
PORT=300X               # Ejemplo: 3001 para categorias-service, 3002 para contactos-service, 3003 para usuario-service
DB_HOST=localhost       # Generalmente 'localhost' para desarrollo local
DB_USER=root            # Tu usuario de MySQL
DB_PASSWORD=            # Tu contraseña de MySQL (déjala vacía si no tienes)
DB_NAME=db_agenda_contactos # El nombre de tu base de datos
JWT_SECRET=tu_secreto_para_jwt # ¡Importante! Usa una cadena segura y única, y debe ser la misma en Usuario-Service y API-Gateway.
```

#### **`.env` (Dentro de `api-gateway`)**
```.env
PORT=300x                 # Puerto principal del API Gateway
PORT_CATALOG=300x         # Puerto del servicio de Categorías
PORT_CONTACT=300x         # Puerto del servicio de Contactos
PORT_USER=300x            # Puerto del servicio de Usuarios
JWT_SECRET=tu_secreto_para_jwt # ¡Importante! Debe coincidir con el usado en Usuario-Service.
CORS_ORIGIN=http://localhost:4200 # URL de tu frontend de Angular en desarrollo por defecto
```

### 4. Instalación y Ejecución de los Microservicios (Backend)

1.  Abre **cuatro ventanas de terminal separadas**.
2.  En cada terminal, navega a la carpeta de uno de tus microservicios:
    * `cd api-gateway`
    * `cd usuario-service`
    * `cd contactos-service`
    * `cd categorias-service`
3.  En cada terminal, primero instala las dependencias (solo la primera vez o si cambian las dependencias):
    ```bash
    npm install
    ```
4.  Luego, inicia cada microservicio. Puedes usar el script `dev` para desarrollo con recarga automática:
    ```bash
    npm run dev
    ```
    O para una ejecución estándar:
    ```bash
    npm start
    ```
    Asegúrate de que los cuatro microservicios estén ejecutándose y escuchando en sus respectivos puertos.

### 5. Instalación y Ejecución del Frontend (Angular)

1.  Abre una **nueva ventana de terminal**.
2.  Navega a la carpeta raíz de tu proyecto Angular (ej. `cd agenda-contactos-frontend`).
3.  Instala las dependencias (solo la primera vez):
    ```bash
    npm install
    ```
4.  Inicia el servidor de desarrollo de Angular:
    ```bash
    ng serve -o
    ```
    Esto compilará la aplicación y la abrirá automáticamente en tu navegador web predeterminado, generalmente en `http://localhost:4200`.

### 6. Uso de la Aplicación

1.  Una vez que el frontend cargue en tu navegador, deberías ver la página de inicio de sesión.
2.  **Regístrate** con un nuevo usuario.
3.  **Inicia sesión** con tus credenciales recién creadas.
4.  Explora la sección "Mis Contactos" para ver, añadir, editar y eliminar contactos.

---

## 👥 Creadores

Este proyecto ha sido desarrollado por:

* **Alexander Jorge Bastidas Ceron**
* **Mardy Enrique Inga Medina**
* **Jeremy Steven Posligua Holguin**