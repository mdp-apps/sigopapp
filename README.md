# Sigop App
Aplicación móvil para gestionar movimientos de zona portuaria Muelles de Penco, principalmente
gestiones de productos como fertilizantes y mezclas de estos según la necesidad del cliente.
Ya sean requerimientos como despachos y recepciones de productos, movimientos internos
entre bodegas, etc.

---

## Funcionalidades por perfil

<details>
  <summary><strong>👷 Usuario Conductor</strong></summary>

Este perfil reemplaza el antiguo sistema de tótem físico de autoatención, permitiendo a los conductores gestionar sus movimientos portuarios desde la app móvil.

**Funciones disponibles:**

- 🔐 Inicio de sesión con RUT del conductor.
- 📋 Visualización de los requerimientos asignados para el turno actual (despachos o recepciones).
- 🧾 Visualización de los productos o mezclas asociadas a cada requerimiento activo.
- 📱 Generación de código QR dinámico con la patente y código del requerimiento actual, para levantar barrera de ingreso al puerto.
  - ✅ Esta función está habilitada solo si el conductor se encuentra dentro del radio geográfico permitido.

</details>

<details>
  <summary><strong>🏗️ Supervisor, Capataz y Planificador</strong></summary>

Estos perfiles reemplazan el sistema de tótems de autoatención en las bodegas, permitiendo gestionar los requerimientos asociados a las operaciones de despacho o recepción de productos fertilizantes.

**Funciones disponibles:**

- 🔐 Inicio de sesión con correo electrónico y contraseña.
- 🔎 Búsqueda de requerimientos mediante código o patente del camión.
- 📄 Visualización del detalle del requerimiento:
  - Tipo de requerimiento (despacho/recepción).
  - Cliente, transportista, y conductor asignado.
  - Si el requerimiento es una mezcla, muestra el desglose por producto con nombre y cantidad en kilogramos.
- 🔁 Visualización de la trazabilidad del requerimiento:
  - Historial de cambios de estado (pendiente, en curso, cerrado, etc.).
  - Información de quién realizó el cambio y descripción del mismo.
- 📦 Gestión de producción de paletizado:
  - Visualización de lotes de mezcla por requerimiento.
  - Identificación si el requerimiento lleva pallets.
  - Registro de cantidad total de pallets y su peso.
- 🧮 Modificación de sacos:
  - Visualización y edición de la cantidad de sacos para mezclas en requerimientos de despacho envasado.
  - Registro automático de los cambios realizados.
- 🗒️ Ingreso de observaciones sobre requerimientos:
  - Permite registrar problemas detectados durante la operación.
  - Descripción del problema, con fecha y usuario que la registró.
  - Posibilidad de tomar una fotografía desde la cámara o subirla desde la galería del dispositivo.
- 🚚 Visualización de movimientos internos:
  - Muestra los traslados de productos entre bodegas del puerto, correspondientes al turno y fecha actuales.
  - Información general de traslados:
    - Total planificado, trasladado y pendiente (por producto y por cliente).
  - Información detallada de cada movimiento interno:
    - Bodega de origen y destino.
    - Cliente solicitante.
    - Códigos internos de operación de origen y destino.
    - Totales en KG planificados, trasladados y pendientes.

</details>

---

## Tecnologías y Bibliotecas:
Para el desarrollo UI de esta aplicación móvil se usaron las siguientes tecnologías 
y bibliotecas:

- **_[React Native](https://reactnative.dev/)_**
- **_[React Native Paper](https://reactnativepaper.com/)_**
- **_[Expo](https://docs.expo.dev/)_**
- **_[React](https://es.react.dev/)_**
- **_[TypeScript](https://www.typescriptlang.org/)_**
- **_[React Hook Form](https://react-hook-form.com/)_**
- **_[Zod](https://zod.dev/)_**
- **_[React Query](https://tanstack.com/query/v4/docs/framework/react/overview)_**
- **_[Zustand](https://www.npmjs.com/package/zustand)_**
- **_[Axios](https://axios-http.com/docs/intro)_**
- **_[NativeWind](https://www.nativewind.dev/)_**

---

## ¿Que enfoque usa esta _App Móvil_?
Esta _App Móvil_  usa una estructura de carpetas basada en arquitectura limpia y modularización.

## Estructura de carpetas y archivos:

| Carpeta                          | Descripción | Formato para nombrar archivo | 
| -------------------------------- | ----------- | ------------------- |
| `/app`                           | Contiene todas las páginas y layouts anidados de la app móvil, basado en el _App Directory_ de Expo que crea el enrutamiento automáticamente |  N/A |
| `/assets`                        | Contiene todos los recusos estáticos como las imágenes y fuentes que están en la carpeta /fonts |  N/A |
| `/config`                        | Contiene archivos de configuración global para nuestra app(configuraciones de __APIs__, adaptadores, helpers, constantes, etc)  | N/A  |
| `/config/adapters`               | Contiene adaptadores que son piezas de código (métodos) de librerías externas que adapta funcionalidades para que sean flexibles al cambio (uso de patrón adaptador) | `/nombre-modulo/nombre-modulo.adapter.ts` o `nombre-modulo.adapter.ts` |
| `/config/api`                    | Contiene los fetcher de nuestra app que serían nuestros endpoints base de las APIs para usarlas en los casos de uso | `nombreDescriptivoApi.ts` |
| `/config/constants`              | Contiene las constantes de la app móvil que guardar datos estáticos para usarlos en la lógica de negocio de los módulos | `NombreDescriptivo.ts` |
| `/config/helpers`                | Contiene funciones que realizan tareas comunes y que pueden ser reutilizadas(por ejemplo, formatear fechas, montos, calculos, etc)  | `NombreDescriptivo.ts` |
| `/core/modulo`                   | Contiene la lógica de negocio de nuestra app, como las interfaces y casos de uso separados por módulos (esta lógica es independiente a cualquier framework frontend o de desarrollo móvil) | N/A |
| `/core/modulo/use-cases`         | Contiene los _"casos de uso"_ de nuestra app(un caso de uso es una operación específica que un usuario puede realizar por módulo. Ejemplo: El módulo de auth puede  _"Iniciar sesión", "Registrarse", "Cambiar contraseña", etc_) | `nombre-caso-uso.use-case.ts` |
| `/core/modulo/interfaces`        | Contiene las interfaces por módulo que definen cómo nuestra app interactúa con los sistemas externos, en este caso las APIs | `nombre-descriptivo.response.ts`  |
| `/infrastructure`                | Es responsable de implementar los detalles de cómo nuestra app interactúa con las __APIs__ como crear las entidades, mostrar mappers, etc. | N/A |
| `/infrastructure/entities`       | Contiene las _"entidades"_ de nuestra app (objeto que contiene la lógica de negocio o datos que únicamente usaremos en la UI respectiva) | `nombreentidad.entity.ts` |
| `/infrastructure/interfaces`     | Contiene las interfaces más globales que se pueden usar en cualquier parte de la app | `nombre-descriptivo.response.ts`  |
| `/infrastructure/mappers`        | Son piezas de código que convierten datos de un formato a otro. Se encarga de que se cumpla el retorno de datos con la entidad respectiva | `nombreentidad.mapper.ts` |
| `/presentation/modulo`           | Contiene código relacionado con la interfaz de usuario de nuestra aplicación. Esto realizado por módulos independientes | N/A |
| `/presentation/modulo/components`| Contiene  los componentes de React que se utilizan en nuestra aplicación, pero de su determinado módulo. | `NombreComponente.tsx` |
| `/presentation/modulo/hooks`     | Contiene los hooks personalizados de React que se utilizan en nuestra aplicación, pero de su determinado módulo. | `useNombrehook.ts` |
| `/presentation/modulo/layouts`   | Contiene todos los layouts que son bases de diseño para las pantallas en la que lo usemos | `NombreLayout.tsx` |
| `/presentation/modulo/providers` | Contiene todos los wrappers o envoltorios que ejecutan lógica al inicia la app| `NombreProvider.tsx` |
| `/presentation/modulo/store`     | Contiene el código relacionado con la gestión del estado global de nuestra app (usando la biblioteca Zustand). | `useNombreStore.ts` |
---

## Nomenclatura de funcionalidades de archivos de la Arquitectura de App Móvil.

### Adaptadores - **`/adapters`**
Se usa el patrón adaptador con una clase que contiene métodos comunes o estáticos
dependiendo de nuestros requerimientos.

#### Ejemplo sintaxis de patrón adaptador:
```ts
export class NombreAdapter {
  // Metodos estaticos o comunes...

  public static metodo{
    // Logica de paquete o libreria externa 

    return valor;
  }
}
```

#### Ejemplo real de patrón adaptador:
```ts
// storage.adapter.ts

import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

  static async getItem(key: string): Promise<string | null> {
    try {
      const result = await AsyncStorage.getItem(key);

      return result;
    } catch (error) {
      Alert.alert("Error", "Failed to get data");
      return null;
    }
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      Alert.alert("Error", "Failed to save data");
    }
  }
}
```

---

### Constantes - **`/constants`**
Son constantes que se guardan en un objeto con un nombre descritivo para identificar
el contexto de las constante.

#### Ejemplo de constante: `Regex.ts`:
```ts

// Como se observa las constantes se recomiendan definir en mayusculas.

// Aquí usamos un objeto que guarda constantes de Expresiones regulares que se pueden usar en toda la app.
export const REGEX = {
  rut: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
  cleanRut: /[^\dkK]/g,
  dotsInRut: /\B(?=(\d{3})+(?!\d))/g,
};

```

---

### Helpers - **`/helpers`**
Son clases con métodos estáticos que permiten adaptar tareas repetitivas.
La diferencia con un adaptador de /adapters es que aquí no ocupas código de
bibliotecas externas, solo lógica nativa del lenguaje.

#### Ejemplo de helper `Formatter.ts`:
```ts
export class Formatter {
  static capitalize(text: string): string {
    if (!text) return text;

    return text.charAt(0).toLocaleUpperCase() + text.slice(1);
  }

  static currency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
}
```

---

### Entidades - **`/entities`**
Son interfaces que tienen en común un contexto(o pertenecen a un módulo). Es la que 
permite definir como van a lucir los datos que se renderizarán en la UI, se utilizan para
definir solo los datos que vamos a utilizar (las interfaces traen todos los datos de las
APIs viniendo algunos que quizás ni utilicemos).

#### Ejemplo de entidad usando info de una película: `movie.entity.ts`:
```ts

// Quizas en un módulo solo necesitemos mostrar solo esta info.
export interface Movie {

  id: number;
  title: string;
  description: string;
  releaseDate: Date;
  rating: number;
  poster: string;
  backdrop: string;

}

// Y quizas en otro módulo queramos mostrar mucha más información de la película aún.
export interface FullMovie extends Movie {
  genres: string[];
  duration: number;
  budget: number;
  originalTitle: string;
  productionCompanies: string[];
}
```

---

### Interfaces - **`/interfaces`**
Son interfaces que hacen un contrato con las respuestas de endpoints de __APIs__.

#### Ejemplo de interfaz `movie-db.response.ts`:
```ts

// Como se puede observar son todos los datos que trae la API, pero no necesariamente
// ocuparemos todos estos datos en un solo módulo, quizas solo algunos
export interface MovieDBMovie {
  adult:                 boolean;
  backdrop_path:         string;
  belongs_to_collection: BelongsToCollection;
  budget:                number;
  genres:                Genre[];
  homepage:              string;
  id:                    number;
  imdb_id:               string;
  original_language:     string;
  original_title:        string;
  overview:              string;
  popularity:            number;
  poster_path:           string;
  production_companies:  ProductionCompany[];
  production_countries:  ProductionCountry[];
  release_date:          string;
  revenue:               number;
  runtime:               number;
  spoken_languages:      SpokenLanguage[];
  status:                string;
  tagline:               string;
  title:                 string;
  video:                 boolean;
  vote_average:          number;
  vote_count:            number;
}
```

---

### Mappers - **`/mappers`**
En este caso el patrón mapper usa clases con métodos estáticos para transformar
la estructura de los datos y solo tener los datos que utilizaremos en la UI
siguiendo la entidad especificada como retorno.

#### Ejemplo de mapper `movie.mapper.ts`:
```ts
import { FullMovie, Movie } from '../../core/entities/movie.entity';
import type { MovieDBMovie, Result } from '../interfaces/movie-db.responses';


// Recomendable que los nombres de los métodos empiecen por "from" y terminen en
// "ToEntity" para seguir buena práctica de nombres descriptivos de Clean Code.
export class MovieMapper {
  // Como se observar solo retorna alguna info de la pelicula
  static fromMovieDBResultToEntity( result: Result  ): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      releaseDate: new Date( result.release_date ),
      rating: result.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${ result.poster_path }`,
      backdrop: `https://image.tmdb.org/t/p/w500${ result.backdrop_path }`,
    } 
  }

  //Y este otro retorna mucho más info de una película, ya que quizás un módulo
  // necesite más información.
  static fromMovieDBToEntity( movie: MovieDBMovie ): FullMovie {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      releaseDate: new Date( movie.release_date ),
      rating: movie.vote_average,
      poster: `https://image.tmdb.org/t/p/w500${ movie.poster_path }`,
      backdrop: `https://image.tmdb.org/t/p/w500${ movie.backdrop_path }`,
      genres: movie.genres.map( genre => genre.name ),
      duration: movie.runtime,
      budget: movie.budget,
      originalTitle: movie.original_title,
      productionCompanies: movie.production_companies.map( company => company.name ),
    }
  }
}
```
---

### Casos de usos - **`/use-cases`**
Son funciones que se encargan de consumir un endpoint de una API que
obligatoriamente reciben un fetcher para peticiones http y si requerimos 
un parámetro extra tambien podemos agregarlos.

#### Ejemplo de caso de uso para mostrar película por id `movie/get-by-id.use-case.ts`:
```ts
import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieDBMovie} from '../../../infrastructure/interfaces/movie-db.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

/* 
- Como se puede observar hay muchas cosas que componen un caso de uso, como lo es
  el fetcher que recibe que es un adaptador para peticiones http (HttpAdapter).

- Y lo más importante es que se usa su determinada entidad para retornar los datos
  necesarios con la ayuda del determinado mapper para transformar los datos de la intefaz
  a entidad.
*/
export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovie>(`/${movieId}`);
    const fullMovie = MovieMapper.fromMovieDBToEntity(movie);
    return fullMovie;
    
  } catch (error) {
    throw new Error(`Cannot get movie by id: ${movieId}`);
  }
}
```

---

## Deuda técnica y buenas prácticas y recomendaciones de código limpio:
A continuación una explicación de que es la deuda técnica y buenas prácticas
de código limpio.

## ¿Que es la deuda técnica?
Es la **falta de calidad en el código**, que genera una deuda que repercutirá en costos futuros, que usualmente son:

**Costos económicos:**
- Tiempo en realizar mantenimientos.
- Tiempo en refactorizar código.
- Tiempo en comprender el código.
- Tiempo adicional en la transferencia del conocimiento de nuestro código hacia otros desarrolladores.

### Caer en la **deuda técnica** es normal y a menudo es inevitable:
![Demostración de deuda técnica](https://proyectosbeta.net/wp-content/uploads/2015/05/La-vida-de-un-ingeniero-de-software.jpg)

### ¿Cómo se paga la deuda técnica?
La deuda técnica se paga con la **refactorización**:

#### ¿Que es la Refactorización?
- Es simplemente un proceso que tiene como objetivo **mejorar el código** sin alterar su comportamiento para que sea más entendible y tolerante a cambios.

- Usualmente para que una **refactorización** fuerte tenga el objetivo esperado, es imprescisdible contar con **pruebas automáticas**. 

- Si no tenemos **pruebas automáticas** no tenemos manera de saber que la **refactorización** funcionó de la manera esperada.

- Debido a lo anterior, esto produce el famoso: **__"Si funciona, no lo toques"__**.

#### Consecuencias de mala calidad de código:
- La mala calidad del software siempre  la acaba pagando o asumiendo alguien.

- Ya sea el cliente, el proveedor con recursos o el propio desarrollador dedicando tiempo a refactorizar o malgastando tiempo programando sobre un sistema frágil.


## ¿Que el Clean Code (Código Limpio)?
- __"Código Limpio es aquel que se ha escrito con la intención de que otra persona (o tú mismo en el futuro) lo entienda". - **Carlos Blé**__

- __"Nuestro código tiene que ser simple y directo, debería leerse con la misma facilidad que un texto bien escrito". - **Grady Booch**__

- __"Programar es el arte de dedicarle a otro humano lo que quieres que la computadora haga". - **Donald Knuth**__

### Nombres pronunciables y expresivos:
- Los nombres de las **variables o constantes** deben ser específicos y no genéricos, para que al leer el código se entienda lo que guardan estas.

- En el código limpio es recomendable escribir los nombres de variables en inglés, para estar en armonía con el lenguaje, pero esto igual depende del proyecto por lo que si un proyecto ya está escrito en español, es mejor seguir ese idioma.

### Ausencia de información técnica en nombres:
- Si bien los nombres deben ser expresivos, estos no tiene que que tener información técnica ya que las palabras reservadas ya cubren esto.

- A continuación se presentará la forma incorrecta y correcta de hacerlo:

#### Forma incorrecta:
• Este es un ejemplo de definir __clases, clases abstractas, interfaces, etc__, debido a los nombres técnicos:
```ts
class AbstractUser { };
class UserMixin { };
class UserImplementation { };
interface UserInterface { };
```

#### Forma correcta:
• Mejor forma para definir nombres de __clases, clases abstractas, interfaces, etc__, sin información técnica:
```ts
class User { };
interface User { };
```

### Nombres expresivos según el tipo de dato:

#### Arreglos - Arrays:
- Para los __arreglos__ es una muy buena práctica que **los nombres esten en plural**. 

- A  continuación la forma correcta e incorrecta de definir un nombre expresivo en un __arreglo__.

##### Forma incorrecta:
```ts
const fruit = ['manzana','platano','fresa'];
```
• Escribir el nombre en singular para un __arreglo__ no sería muy buena práctica ya que no describe bien que sea una lista de algo, como en el ejemplo anterior **que pareciera que en el arreglo hubiera solo una fruta, ya que se definió `fruit`**.

##### Forma regular:
```ts
const fruitList = ['manzana','platano','fresa'];
```
• De esta forma no es que esté mal definirlo de esta manera, pero es recomedable que no haya mucha info técnica y que sea plural. 

• En el ejemplo anterior **se da a entender que hay una lista de frutas usando `fruitList`pero aún así no es muy descriptivo al 100%**

##### Forma correcta:
```ts
const fruits = ['manzana','platano','fresa'];
```

• Escribir el nombre en plural es muy buena práctica. 

• En el ejemplo anterior, **definiendo `fruits` se comprender mejor que hay más de una fruta y que representa el __arreglo__**.

##### Forma mucho mejor:
```ts
const fruitNames = ['manzana','platano','fresa'];
```

• Esta forma es mejor aún que la forma anterior, ya que aparte de escribirse el nombre en plural es más detallado, por esto el ejemplo anterior **describe mejor que al usar`fruitNames` se detalla que hay nombres de frutas.**

---

#### Booleanos - Booleans:
- La mejor práctica para escribir nombres en __booleanos__ es haciendo como una pregunta que puede ser `true` o `false`. 

- Mencionado lo anterior, por es bueno usar prefijos en ingles en una __variable__ como lo es **is, can, has, etc**.

##### Forma incorrecta:
```ts
const open = true;
const write = true;
const fruit = true;
const active = false;
const noValues = true;
const notEmpty = true;
```
• El ejemplo anterior no es buena práctica, debido a que no entienden los nombres y no describen a un boolean.

• Por ejemplo **en el caso de `noValues` o `notEmpty` se da a entender que esas variables serán `false` ya que el mismo nombre lo describe así, y esto no es muy bueno ya que debe describirse para que sea `true` o  `false` no solo una opción**.

##### Forma correcta:
```ts
const isOpen = true;
const canWrite = true;
const hasFruit = true;
const isActive = false;
const hasValues = true;
const isEmpty = true;
```
• El ejemplo anterior es la mejor práctica, ya que usa prefijos de preguntas como **is,can o has**, por ejemplo **usando isOpen, isActive, canWrite o hasValues se entiende perfectamente que preguntan: ¿Está abierto?, ¿Está activo?, ¿Puede escribir? o ¿Tiene valores?**, así estableciendo interrogantes y no afirmaciones.

---

#### Números - Numbers:
- La mejor práctica es definir los nombres para __números__ usando prefijos como **max, min, total, etc**, ya que los nombres quedan más detallados y describen bien que significa su valor numérico.

##### Forma incorrecta:
```ts
const fruits = 3;
const cars = 10;
```
• Esta forma es mala práctica ya que no se describen los nombres para números. 

• En el ejemplo anterior, **al definir `fruits` o `cars` no se entiende bien que describe al instante, habría que lee el contexto del código para recien entender que hacen.** 

##### Forma correcta:
```ts
const maxFruits = 5;
const minFruits = 1;
const totalFruits = 3;

const totalOfCars = 5;
```
• Esta es la buena práctica ya que usando prefijos como ==max, min, total, etc== se decribe perfectamente.

• En el ejemplo anterior **al usar `maxFruits`, `minFruits` y `totalFruits` se entiende que se refieren a el máximo de frutas, el mínimo de frutas y el total de frutas**.

---

#### Funciones - Functions:
- La buena práctica de código limpio nos dice que es bueno definir los nombres de __funciones__ de una manera precisa y que describa una acción que se sabe que en la lógica de esta __función__ se va a definir. 

- No es necesario escribir nombres tan explícitos de __funciones__.

##### Forma incorrecta:
```ts
createUserIfNotExist();
updateUserIfNotEmpty();
sendEmailIfFieldsValid();
```
• En el ejemplo anterior es mala práctica usar nombres de __funciones__ tan detallados, ya que se da por hecho que ese detalle se definirá en la lógica de la __función__. 

• Por ejemplo **si la __función__ se declara como `createUserIfNotExist();` habría una mala práctica, ya que aunque la función nos dice explícitamente que crea un usuario si este no existe se debería dar por hecho que en la lógica de esta se hará**.

• Esta forma de escribir igual es subjetiva ya que hay desarrolladores que la utilizan de todos modos.

##### Forma correcta:
```ts
createUser();
updateUser();
sendEmail();
```
• El ejemplo anterior es la mejor práctica para escribir el nombre de una __función__ ya que **son nombres precisos y describe una acción que hará la __función__.**