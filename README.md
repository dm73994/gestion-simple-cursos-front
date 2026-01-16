# Gestión de Cursos - Frontend

## Descripción

Aplicación frontend desarrollada en **React + TypeScript** con Vite para la gestión de alumnos, materias y notas. El proyecto implementa una **Screaming Architecture** que hace evidente su propósito desde la estructura de carpetas, y utiliza un **boilerplate optimizado** para desarrollo rápido y escalable.

Se aplicaron principios de **diseño minimalista** con enfoque **responsive**, garantizando una experiencia de usuario limpia y adaptable a diferentes dispositivos. La arquitectura se organiza en capas bien definidas, separando las **peticiones HTTP**, **servicios** y **lógica de componentes** mediante **custom hooks** para mantener el código modular y reutilizable.

## Tecnologías Utilizadas

- React 19
- TypeScript 5.9
- Vite 7
- React Router DOM 7
- React Hook Form + Zod (validaciones)
- Axios
- SweetAlert2
- Bootstrap Icons

## Requisitos Previos

- Docker y Docker Compose
- Backend ejecutándose en `http://localhost:7399`

## Configuración

### Variables de Entorno

La aplicación utiliza la siguiente variable de entorno:
```env
VITE_API_URL=http://localhost:7399/api/v1
```

**⚠️ Importante**: Debes crear un archivo `.env` en la raíz del proyecto con esta variable. Aunque el proyecto incluye un valor por defecto, **es necesario configurarla según tu entorno**:
```bash
# Crear archivo .env en la raíz del proyecto
echo "VITE_API_URL=http://localhost:7399/api/v1" > .env
```

Si tu backend corre en una URL diferente, ajusta el valor de `VITE_API_URL` según corresponda.

## Instrucciones de Ejecución

### Con Docker (Recomendado)
```bash
# 1. Construir y levantar el contenedor
docker compose up --build -d
```

La aplicación estará disponible en: **http://localhost:3000**

### Desarrollo local (opcional)
```bash
# 1. Crear archivo .env (si no existe)
echo "VITE_API_URL=http://localhost:7399/api/v1" > .env

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

## Detener los Servicios
```bash
# Detener el contenedor
docker compose down

# Para eliminar también los volúmenes
docker compose down -v
```

## Funcionalidades

### Gestión de Alumnos
- ✅ Listar todos los alumnos
- ✅ Crear nuevo alumno
- ✅ Editar alumno existente
- ✅ Eliminar alumno

### Gestión de Materias
- ✅ Listar todas las materias
- ✅ Crear nueva materia
- ✅ Editar materia existente
- ✅ Eliminar materia

### Gestión de Notas
- ✅ Registrar nota para un alumno en una materia
- ✅ Listar notas por alumno

## Arquitectura y Diseño

### Screaming Architecture

La estructura del proyecto está organizada de manera que **grita su propósito**. Al observar las carpetas, es inmediatamente evidente qué hace la aplicación:
```
src/
├── pages/              # Páginas principales (Alumnos, Materias, Notas)
├── components/         # Componentes reutilizables
├── services/           # Capa de servicios (API calls)
├── hooks/              # Custom hooks (lógica reutilizable)
├── types/              # Definiciones de tipos TypeScript
└── utils/              # Utilidades y helpers
```

### Separación en Capas

- **Capa de Presentación**: Componentes React enfocados únicamente en UI
- **Capa de Lógica**: Custom hooks que encapsulan lógica de negocio
- **Capa de Servicios**: Funciones para peticiones HTTP (Axios)
- **Capa de Validación**: Esquemas Zod para validación de formularios

### Diseño

- **Minimalista**: Interfaz limpia sin elementos innecesarios
- **Responsive**: Adaptable a móviles, tablets y desktop
- **Consistente**: Componentes reutilizables con estilos unificados

## Estructura Final de Archivos
```
frontend/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .dockerignore
├── .env                    # ⚠️ Debes crearlo
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
├── index.html
└── src/
    ├── services/           # Servicios y peticiones HTTP
    │   └── customAxios.ts  # Instancia configurada de Axios
    ├── hooks/              # Custom hooks
    ├── components/         # Componentes reutilizables
    ├── pages/              # Páginas de la aplicación
    ├── types/              # Tipos TypeScript
    └── utils/              # Funciones auxiliares
```

## Notas Técnicas

- Puerto de la aplicación: **3000**
- Conexión con backend: **http://localhost:7399/api/v1**
- Validación de formularios con Zod y React Hook Form
- Notificaciones con SweetAlert2
- Desarrollado en TypeScript para mayor robustez y mantenibilidad
- Arquitectura escalable mediante separación de responsabilidades

## Solución de Problemas

**Error de conexión con el backend:**
- Verifica que el backend esté corriendo en `http://localhost:7399`
- Confirma que la variable `VITE_API_URL` en `.env` sea correcta
- Revisa la consola del navegador para errores de CORS

**La aplicación no carga:**
- Verifica que el contenedor esté corriendo: `docker ps`
- Revisa los logs: `docker logs -f <container_name>`
- Confirma que el puerto 3000 esté disponible

**Cambios en `.env` no se reflejan:**
- En Docker: reconstruye la imagen con `docker compose up --build`
- En desarrollo local: reinicia el servidor de desarrollo