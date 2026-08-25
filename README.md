# ReTrueque

ReTrueque es una plataforma colaborativa de intercambio de servicios. Permite publicar servicios, solicitar intercambios, gestionar solicitudes entre usuarios y dejar calificaciones una vez completado un acuerdo.

## Demo y documentación

- Frontend: https://retrueque.cambers.lat
- Backend / Swagger: https://api.retrueque.cambers.lat/swagger-ui/index.html
- Portafolio: https://cambers.lat

## Origen y contexto

ReTrueque nació como un proyecto colaborativo dentro de una simulación de No Country y fue desarrollado por un equipo multidisciplinario.

Este repositorio es mi fork personal del proyecto original. Lo conservo como parte de mi portafolio y como referencia de mi evolución como desarrollador backend, incluyendo trabajo y ajustes posteriores realizados sobre mi versión.

- Repositorio original del equipo: https://github.com/No-Country-simulation/s17-11-n-java-next
- Mi fork: https://github.com/EdgarCamberos1894/ReTrueque

## Estructura del repositorio

```text
ReTrueque/
├── frontend/     # Aplicación web con Next.js
├── retrueque/    # API REST con Java y Spring Boot
├── .github/      # Automatización y plantilla de pull requests
└── README.md
```

`main` es la rama destinada a representar la versión canónica del proyecto. Las ramas históricas del frontend y backend se conservan como referencia del flujo de trabajo previo a esta consolidación.

## Mi aporte

Mi trabajo se centró principalmente en el backend: diseño de endpoints y reglas de negocio, autenticación JWT, autorización, flujo de solicitudes, emails transaccionales, carga de imágenes en Amazon S3, migraciones de base de datos y documentación de la API.

También mantuve posteriormente mi fork para corregir el despliegue, preparar una experiencia de demostración y consolidar frontend y backend dentro de una única versión navegable del proyecto.

## Tecnologías

### Backend

- Java 17
- Spring Boot 3
- Spring Security con JWT
- Spring Data JPA
- PostgreSQL
- Flyway
- Amazon S3
- Thymeleaf y Resend
- OpenAPI / Swagger
- Docker

### Frontend

- Next.js
- TypeScript
- React
- Tailwind CSS
- TanStack Query
- Zustand
- React Hook Form + Zod

## Funcionalidades destacadas

- Registro, autenticación y verificación de cuentas por correo.
- Publicación, edición y eliminación de servicios con control de propiedad.
- Búsqueda paginada y filtros por categoría, provincia y departamento.
- Solicitudes entre usuarios, con aceptación o rechazo por parte del dueño del servicio.
- Comentarios y calificaciones disponibles tras una solicitud aceptada.
- Subida de imágenes a Amazon S3.
- Documentación interactiva de la API con Swagger.

## Acceso demo

Las dos cuentas existen para poder probar un flujo entre usuarios. No representan dos roles de autorización distintos.

- John, cuenta solicitante: `john_doe@example.com`
- Jane, cuenta prestadora: `jane_smith@example.com`
- Contraseña para ambas: `Demo123!`

Puedes utilizar John para explorar servicios y generar solicitudes, y Jane para revisar el flujo desde el otro lado de la interacción.

## Ejecutar el frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Por defecto, el frontend queda disponible en `http://localhost:3000`.

Variables principales:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Ejecutar el backend

1. Entra en la carpeta `retrueque`.
2. Copia `.env.example` como `.env` y completa las variables con tus credenciales locales.
3. Crea una base de datos PostgreSQL vacía y ajusta `DATABASE`, `DB_USER` y `DB_PASSWORD`.
4. Inicia la aplicación en modo desarrollo.

En PowerShell:

```powershell
cd retrueque
Copy-Item .env.example .env
$env:SPRING_PROFILES_ACTIVE="dev"
.\mvnw.cmd spring-boot:run
```

Flyway crea y versiona el esquema de base de datos. Swagger UI queda disponible localmente en:

`http://localhost:8080/swagger-ui/index.html`

## Rutas principales de la API

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET|POST|PUT|DELETE /api/v1/service`
- `GET|POST|PUT /api/v1/requests`

## Despliegue

La estructura está preparada para desplegar ambos componentes desde la misma rama:

- Vercel: rama `main`, directorio raíz `frontend`.
- Backend: rama `main`, directorio raíz `retrueque`.

Las credenciales y variables de entorno deben configurarse en cada plataforma de despliegue y no versionarse en el repositorio.
