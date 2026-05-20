# 📅 Appointment Manager PM3

## 📌 Descripción
Aplicación **full stack** para la gestión de citas. Permite crear, listar y administrar turnos de manera sencilla, integrando **frontend en Next.js** y **backend en NestJS**, con base de datos en **Neon (PostgreSQL)** y despliegue en **Render/Railway**.

---

## 🌐 Demo Online
- **Frontend:** [Appointment Manager Front](https://appointment-manager-pm3-1.onrender.com)  
- **Backend:** [Appointment Manager API]( https://appointment-manager-pm3.onrender.com )  

---

## 🚀 Instalación Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Ivan-Baez/APPOINTMENT-MANAGER-pm3-.git

2. Instalar dependencias en frontend y backend:

   cd frontend
   npm install
   cd ../backend
   npm install
   
3- Levantar los servicios:
 
  Backend:
  bash
  npm run start:dev

  Frontend:
  bash
  npm run dev

4- Acceder desde el navegador:
👉 http://localhost:3000

🛠️ Tecnologías
Frontend: Next.js

Backend: NestJS

Base de datos: Neon (PostgreSQL)

Hosting: Render / Railway

Control de versiones: Git/GitHub


## 📷 Capturas de pantalla

### Frontend
<img src="https://github.com/user-attachments/assets/7540e461-9f47-4953-b619-14ecc599238c" width="600" /><br/><br/>

<img src="https://github.com/user-attachments/assets/65df21ae-544e-483a-ac69-f7a31a12b1ea" width="600" /><br/><br/>

<img src="https://github.com/user-attachments/assets/01c8587e-322e-4715-89fb-ff3a71ec1cb3" width="600" /><br/><br/>

<img src="https://github.com/user-attachments/assets/9d6a27a7-bc86-4e80-9108-e51c27a4619b" width="600" /><br/><br/>

<img src="https://github.com/user-attachments/assets/be77a483-37ec-4123-a106-390695377e9e" width="600" /><br/><br/>

### Backend
<img src="https://github.com/user-attachments/assets/602fd1c4-04b9-45cd-a120-bba32889709d" width="600" /><br/><br/>

<img src="https://github.com/user-attachments/assets/8686e4c8-a6eb-4d89-b153-ce24a6ba812f" width="600" /><br/><br/>


🧩 User Stories – Backend
Registro de usuarios: como nuevo usuario quiero registrarme con mis datos personales.

Autenticación: como usuario registrado quiero iniciar sesión con mis credenciales.

Gestión de credenciales: como admin quiero que las credenciales se almacenen de forma segura.

Consulta de usuarios: como admin quiero obtener la lista de usuarios registrados.

Consulta por ID: como admin quiero buscar un usuario por su ID.

Validación de datos: como dev quiero validar la entrada antes de procesarla.

Estructura modular: cada funcionalidad separada en servicios.

Uso de DTOs: asegurar estructura clara en entrada/salida.

Simulación con arrays locales: testear lógica sin DB externa.

Separación lógica/rutas: mantener código limpio y escalable.


## 🏗️ Arquitectura del Proyecto

El sistema se compone de tres capas principales:

- **Frontend (Next.js)** → Interfaz de usuario, desplegado en Render.  
- **Backend (NestJS)** → API REST, desplegado en Render.  
- **Base de datos (Neon PostgreSQL)** → Almacenamiento de usuarios y turnos.

- 
  graph TD;
  A[Frontend - Next.js] --> B[Backend - NestJS];
  B --> C[(Neon PostgreSQL)];



👤 Autor
Ivan Báez






