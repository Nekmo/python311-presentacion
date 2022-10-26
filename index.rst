

.. toctree::
   :glob:
   :hidden:

   *

.. _intro:

=====================================
¿Qué hay de nuevo en **Python 3.11**?
=====================================

.. image:: images/python-logo.*
  :width: 200

.. Hola a todos.


👋
==

.. Hacía mucho que no nos reuníamos para celebrar un meetup Python Málaga.


Marzo 2020
----------

.. La última vez fue el 4 de marzo de 2020. Mes que muchos recordaréis.


Estamos de vuelta
-----------------

.. code-block:: python

    >>> import datetime
    >>> import humanize
    >>> delta = datetime.datetime(2022, 10, 27) - datetime.datetime(2020, 3, 4)
    >>> humanize.i18n.activate("es_ES")
    >>> print(repr(humanize.precisedelta(delta)))
    "2 años, 7 meses y 23 días"


.. Pero ya estamos aquí. 2 años, 7 meses y 23 días después.


Python **Málaga**
-----------------

.. image:: images/python-malaga-logo.*


.. Y quiero agradecer tanto a Python Málaga como a Codespace por cedernos este espacio, por la oportunidad de estar
   aquí todos juntos de nuevo. Gracias.

.. _sobre-mi:


Sobre mí **Nekmo**
------------------

+------------------------------------+
|                                    |
| .. image:: images/cara.svg         |
|   :width: 200px                    |
|                                    |
| *Programando en Python desde 2006* |
|                                    |
+------------------------------------+

.. Pero bueno, dejad de que me presente. Soy Juan José, más conocido en redes como Nekmo, y llevo programando en
   Python más de media vida.


Python 2.5
----------

.. Mi primera versión de Python fue la 2.5. Han pasado ya muchos años, y con cada nueva versión no
   dejan de traer novedades.


¿Qué hay de nuevo en Python 3.11?
=================================

.. Ahora, ¿qué hay de nuevo en Python 3.11?


Listado cambios
---------------

* **PEP 654:** Exception Groups y except*.
* **PEP 678:** Enriquecer excepciones con notas.
* **PEP 680:** tomllib.
* **PEP 657:** Mejoras en las indicaciones de error en los tracebacks.
* Opción ``-P`` en la línea de comandos y variable de entorno ``PYTHONSAFEPATH``.
* **PEP 646:** Variadic Generics.
* **PEP 655:** TypedDict Required/NotRequired.
* **PEP 673:** Tipo Self.
* **PEP 675:** Tipo de cadena literal arbitraria
* **PEP 681:** Data Class Transforms
* Módulos obsoletos (PEP 594),  Py_UNICODE API eliminada (PEP 624) y macros convertidas a funciones estáticas en línea
  (PEP 670).


.. Pues este sería el listado de todos los cambios, los cuales se pueden consultar en la web oficial de Python.
   El más importante son los exception groups para agrupar excepciones, mejoras en los tracebacks, el nuevo módulo
   tomllib y novedades en el tipado.

Gracias
-------

.. Y hasta aquí la charla. Muchas gracias a todos por venir. (PAUSA) Ahora en serio, vamos a ir viendo cada uno de
   estos cambios, aunque me tendré que detener bastante en el primero de ellos porque es el más importante y más
   interesante.

PEP 654: Exception Groups y except*
===================================

.. La primera de estas novedades son los exception groups y el nuevo except* con asterisco, con PEP 654.


.. revealjs_break::
    :notitle:


.. code-block:: python

    class NameError(Exception):
        pass


    def validate_name(value: str) -> None:
        if not value.istitle():
            raise NameError("El nombre debe empezar por mayúscula.")


    form = {"name": "nekmo"}
    try:
        validate_name(form["name"])
    except NameError as err:
        print(err)  # Salta el error

.. Aquí tenemos una excepción tradicional de Python, a lo cual lo normal es lanzar una única excepción y capturarla.
   En la función validamos la entrada, y si no valida se lanza una excepción, la cual se captura en el except y
   se muestra por pantalla.

.. revealjs_break::
    :notitle:


.. image:: images/validacion-formulario.png

.. Pero en nuestro caso tenemos un formulario. Un formulario en el que nuestro usuario comete varios errores, y
   queremos mostrarle al usuario todos los errores de golpe, no excepción por excepción. Necesitamos agruparlos.

.. revealjs_break::
    :notitle:

.. code-block:: python

    from typing import Iterable, Tuple, Dict, Callable


    class NumberError(Exception):
        pass


    def validate_age(value: str) -> None:
        if not value.isdigit():
            raise NumberError("La edad debe ser un valor numérico.")


    form = {"name": "nekmo", "age": "diez"}
    form_validations = [("name", validate_name), ("age", validate_age)]
    exceptions = []

    for form_key, input_validation in input_validations:
        try:
            input_validation(form[form_key])
        except Exception as err:
            exceptions.append(value)
    if exceptions:
        raise ExceptionGroup("errors message", exceptions)


.. En este segundo ejemplo iteramos sobre todos los valores del formulario, aplicamos su validación y si hay un
   error lo añadimos al listado de excepciones. Si hay errores lanzamos el ExceptionGroup con sus exceptions.

.. revealjs_break::
    :notitle:

.. image:: images/json.png


.. Esto como os imaginaréis es muy útil en casos como un JSON, o cuando nos vienen varios datos de entrada a validar,
   como en el ejemplo del formulario. Pero claro, os estaréis preguntando. ¿Para qué esto si sólo es crear un listado
   de excepciones con un nuevo tipo de excepción?

except*
-------

.. La verdadera novedad  comienza usando el nuevo except con asterisco.

.. revealjs_break::
    :notitle:

.. code-block:: python

    try:
        read_inputs()
    except* NameError as eg:
        # Si hay errores NameError esto se llama
        print(f"Errores en el nombre: {eg.exceptions}")
    except* NumberError as eg:
        # Y si hay errores NumberError, esto también
        print(f"Errores numéricos: {eg.exceptions}")

.. Podemos utilizarlo para capturar múltiples exceptiones agrupadas diferenciadas por tipo. Y lo que es mejor, a
   diferencia de lo habital que es que el except no continúe ante la primera coincidencia, con el except con asterísco
   sí que sigue. (LEER EJEMPLO).

.. revealjs_break::
    :notitle:

.. code-block:: python

    raise ExceptionGroup("nested",
        [
             ValueError(654),
             ExceptionGroup("imports",
                 [
                     ImportError("no_such_module"),
                     ModuleNotFoundError("another_module"),
                 ]
             ),
             TypeError("int"),
         ]

.. Por si fuese poco, también podemos meter excepciones dentro de otras. Esto es especialmente útil en casos como un
   JSON, en que tenemos múltiples niveles. También es útil en ejecución asíncrona, en que varias funciones lanzan a
   su vez varias excepciones. Justamente algo similar al ExceptionGroup lo tenía Trio con el MultiError,
   aunque ahora lo tenemos de serie.


¡Continuamos!
=============

.. revealjs_section::
    :data-background-color: #000000
    :data-background-image: _static/applause.gif

.. No os preocupéis, esto era lo gordo. Lo que viene son cambios más pequeños, pero muchos muy interesantes.

PEP 678: Enriquecer excepciones con notas
=========================================

.. Y seguimos con excepciones. El nuevo método PEP 678 permite añadir notas, aclaraciones, a las excepciones que se
   lanzan.

.. revealjs_break::
    :notitle:

.. code-block:: python

    try:
         raise TypeError('bad type')
    except Exception as e:
         e.add_note('¡Ah, ah, ah! ¡No has dicho la palabra mágica!')
         raise

.. En este ejemplo se añade produce una excepción, se captura, se le añade una nota usando el nuevo método add_note,
   disponible en Exception, y se vuelve a lanzar ya con la nota.

.. revealjs_break::
    :notitle:

.. code-block:: python

    Traceback (most recent call last):
      File "<stdin>", line 2, in <module>
    TypeError: bad type
    Add some information

.. Y cuando se produce la excepción, la nota es mostrada en una segunda línea. Así se simple. Genial para aclaraciones y
   otras anotaciones.

.. revealjs_break::
    :notitle:

.. code-block:: python

    + Exception Group Traceback (most recent call last):
    |   File "test.py", line 4, in test
    |     def test(x):
    |
    |   File "hypothesis/core.py", line 1202, in wrapped_test
    |     raise the_error_hypothesis_found
    |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    | ExceptionGroup: Hypothesis found 2 distinct failures.
    +-+---------------- 1 ----------------
        | Traceback (most recent call last):
        |   File "test.py", line 6, in test
        |     assert x > 0
        |     ^^^^^^^^^^^^
        | AssertionError: assert -1 > 0
        |
        | Falsifying example: test(
        |     x=-1,
        | )
        +---------------- 2 ----------------
        | Traceback (most recent call last):
        |   File "test.py", line 5, in test
        |     assert x < 0
        |     ^^^^^^^^^^^^
        | AssertionError: assert 0 < 0
        |
        | Falsifying example: test(
        |     x=0,
        | )
        +------------------------------------


.. Y por supuesto, esto también puede utilizarse con los ExceptionGroup - Ya veis lo que me gustan - de forma que
   añadimos información adicional sobre la parte del exception group en que ha sucedido. Y de paso, ¡ahora podéis
   conseguir que vuestros tracebacks den miedo! Como este de aquí.


PEP 657: Mejoras en las indicaciones de error en los tracebacks
===============================================================

.. Y seguimos con tracebacks de error. Vamos a ver las mejoras que se han hecho en los mensaje de traceback.


.. revealjs_break::
    :notitle:


.. code-block:: python

    Traceback (most recent call last):
      File "distance.py", line 11, in <module>
        print(manhattan_distance(p1, p2))
      File "distance.py", line 6, in manhattan_distance
        return abs(point_1.x - point_2.x) + abs(point_1.y - point_2.y)
    AttributeError: 'NoneType' object has no attribute 'x'

.. Hasta ahora en Python, como recordaréis lo habitual cuando hay varias variables en una sola línea y una de ellas es
   None, la única forma de encontrar la que provocaba el error era ponerse a depurar, porque el error no da bastante
   información.

.. revealjs_break::
    :notitle:


.. code-block:: python

    Traceback (most recent call last):
      File "distance.py", line 11, in <module>
        print(manhattan_distance(p1, p2))
              ^^^^^^^^^^^^^^^^^^^^^^^^^^
      File "distance.py", line 6, in manhattan_distance
        return abs(point_1.x - point_2.x) + abs(point_1.y - point_2.y)
                               ^^^^^^^^^
    AttributeError: 'NoneType' object has no attribute 'x'

.. Pero ahora con Python 3.11, ¡ya no hace falta depurar! Porque ahora tienes flechitas que te indican lo que es un
   None. Y no hay nada más fácil que seguir flechitas que indican lo que tienes que arreglar, ¿no?

.. revealjs_break::
    :notitle:

.. code-block:: python

    Traceback (most recent call last):
      File "query.py", line 37, in <module>
        magic_arithmetic('foo')
      File "query.py", line 18, in magic_arithmetic
        return add_counts(x) / 25
               ^^^^^^^^^^^^^
      File "query.py", line 24, in add_counts
        return 25 + query_user(user1) + query_user(user2)
                    ^^^^^^^^^^^^^^^^^
      File "query.py", line 32, in query_user
        return 1 + query_count(db, response['a']['b']['c']['user'], retry=True)
                                   ~~~~~~~~~~~~~~~~~~^^^^^
    TypeError: 'NoneType' object is not subscriptable

.. Y el caso en que esto me ha parecido más útil es accediendo a diccionarios. Seguro que os ha pasado alguna vez
   acceder a un diccionario dentro de otro dentro de otro, y que a partir de cierto punto sea un None y no saber en
   qué nivel ocurre. Pues ahora se te indica. Con flechitas. ¿Qué más podemos pedir?

PEP 680: Tomllib
================

.. Y ahora, algo completamente diferente. Tenemos un nuevo módulo en la biblioteca estándar, Tomlib. ¿Pero qué significa
   TOML?

.. revealjs_break::
    :notitle:

Tom's Obvious, Minimal Language
-------------------------------

.. Pues obviamente, Tom's Obvious Minimal Language. ¿Y por qué Tom?

.. revealjs_break::
    :notitle:

.. image:: images/tom.png

.. Algunos ya os lo habréis imaginado, pero es como se llama el creador de este lenguaje. Un poco egocéntrico pensaréis.
   Pero si le veis tan feliz es por una buena razón: es el fundador de Github, ahora millonario.

.. revealjs_break::
    :notitle:

.. code-block:: toml

    # This is a TOML document

    title = "TOML Example"

    [owner]
    name = "Tom Preston-Werner"
    dob = 1979-05-27T07:32:00-08:00

    [database]
    enabled = true
    ports = [ 8000, 8001, 8002 ]
    data = [ ["delta", "phi"], [3.14] ]
    temp_targets = { cpu = 79.5, case = 72.0 }

    [servers]

    [servers.alpha]
    ip = "10.0.0.1"
    role = "frontend"

.. Pero vayamos a lo que nos importa. Toml es un formato de archivo de configuración sencillo de entender y de editar
   por un humano, a diferencia de JSON. Solventa algunos de los problemas de Yaml como su falta de consistencia y
   ofrece más características que los ficheros ini en los que se basa.

.. revealjs_break::
    :notitle:

.. code-block:: python

    import tomllib


    with open("fichero.toml") as f:
        tomllib.load(f)


.. Leer un fichero toml es muy sencillo, muy similar a como se hace con el módulo de json. No obstante, curiosamente
   no disponemos de un método de hacer un dump, por lo que no podemos escribir.


Novedades en el tipado
======================

.. Y ahora, llega la sección favorita para los **tipos** que les gustan los *tipos*.

.. revealjs_break::
    :notitle:

.. image:: images/badum.png

.. No me lo tengáis en cuenta, por favor.


PEP 646: Variadic Generics
==========================

.. Comenzamos con una novedad en el tipado de los generics, que nos permite tener tipados de salida en los métodos en
   función de cómo se defina para nuestra clase. Esta característica es interesante para módulos como TensorFlow, aunque
   para el público general tiene pocos usos.

.. revealjs_break::
    :notitle:

.. code-block:: python

    from typing import Tuple, Generic, TypeVarTuple, TypeVar


    T = TypeVar('T')
    Ts = TypeVarTuple('Ts')  # Esta es la novedad


    class Array(Generic[*Ts]):  # Aquí usamos el TypeVarTuple como definición para el tipo
        def multiply(self, x: int) -> Tuple[*Ts]:  # Y aquí como return
            ...

        def add_dimension(self, t: T) -> Tuple[T, *Ts]:
            ...


    my_array: Array[float, int, str] = Array()  # Ts en este caso será [float, int, str]
    my_array.multiply(2)  # El tipo devuelto será Tuple[float, int, str]
    my_array.add_dimension("spam")  # El tipo devuelto será Tuple[str, float, int, str]

.. Bien, aquí tenemos nuestra propia clase Array, la cual puede recibir una definición de tipos cualesquiera llamada Ts,
   la cual usa el nuevo TypeVarTuple. Como podemos ver, multiply devuelve estos mismos valores de entrada, y
   add_dimension permite añadir un parámetro adicional.


.. revealjs_break::
    :notitle:
    :data-background-color: #000000
    :data-background-image: _static/confused.gif


.. Esto puede parecer complicado, porque es complicado. Es un caso poco utilizado que es útil en ciertas bibliotecas de
   uso científico y que pueden requerir de vectores.


PEP 655: TypedDict Required/NotRequired
=======================================

.. Seguimos con una novedad muy importante TypedDict, de mis cosas favoritas en el tipado. La posibilidad de marcar
   claves como no requeridas de forma más fácil.

.. revealjs_break::
    :notitle:

.. code-block:: python

    from typing import TypedDict


    class Person(TypedDict, total=False):
        name: str  # Queremos que sea obligatorio pero no lo es
        surname: str  # Queremos que sea obligatorio pero no lo es
        age: int

    person: Person = {"name": "Juan", "surname": "Luna"}


.. Hasta ahora, la única forma de marcar claves como no requeridas era decir si la *totalidad* de las claves deben ser
   requeridas, o ninguna era requerida. Pero no se podían marcar una por una como requerida o no. Para ello teníamos el
   total.

.. revealjs_break::
    :notitle:


.. code-block:: python

    from typing import TypedDict


    class PersonRequired(TypedDict, total=True):
        name: str
        surname: str


    class Person(PersonRequired, total=False):
        age: int

    person: Person = {"name": "Juan", "surname": "Luna"}

.. Si queríamos que una clave sea requerida pero otras no, hasta ahora la única manera era hacer dos clases distintas,
   y definir en cada una de ellas si el total es True o False.

.. revealjs_break::
    :notitle:

.. code-block:: python

    from typing import NotRequired, Required, TypedDict


    class Person(TypedDict):  # total=True por defecto
        name: str
        surname: str
        age: NotRequired[int]  # age no será requerido por el NotRequired[]


    person: Person = {"name": "Juan", "surname": "Luna"}

.. Lo que trae nuevo este nuevo PEP con los nuevos Required y NotRequired, que permiten definir claves requeridas o
   no requeridas. En este caso todo el requerido salvo el age, que lo marcamos como no requerido.

.. revealjs_break::
    :notitle:

.. code-block:: python

    from typing import NotRequired, Required, TypedDict


    class Person(TypedDict, total=False):
        name: Required[str]
        surname: Required[str]
        age: int


    person: Person = {"name": "Juan", "surname": "Luna"}

.. También podemos hacerlo al revés, marcando todo como como no requerido con el total False, y marcar uno por uno como
   requerido.

.. revealjs_break::
    :notitle:
    :data-background-color: #000000
    :data-background-image: _static/thumb.gif


.. Como veis, ahora es mucho más fácil y requiere escribir menos código. Y tener que escribir menos código siempre es
   bien.


PEP 673: Tipo Self
==================

.. Self nos sirve para añadir de forma sencilla la forma de anotar que un método devuelve una instancia de la misma
   clase. Antes podíamos hacer un apaño con los generics, pero esta forma es más sencilla y encima evitamos problemas
   de dependencias circulares.

.. revealjs_break::
    :notitle:


.. code-block:: python

    from typing import Self


    class Customer:

        def __init__(self, name: str, age: int):
            self.name = name
            self.age = age

        def __copy__(self) -> Self:
            return self.__class__(self.name, self.age)

.. En este ejemplo tenemos un método copy que devuelve una nueva instancia de Customer. En vez de usar genéricos o
   decir que se devuelve la misma clase, podemos usar el nuevo Self. Mucho más sencillo.


PEP 675: LiteralString
======================

.. El nuevo tipo LiteralString está hecho pensando en la seguridad, para evitar fallos de seguridad como un SQL
   Injection.

.. revealjs_break::
    :notitle:


.. code-block:: python

    from typing import LiteralString, Iterable, Any


    def execute(sql: LiteralString, *params: Iterable[Any]):
        ...

   # Esta línea validará, porque pasamos los parámetros de forma segura
   execute("SELECT * FROM data WHERE user_id = ?", [123])

   # Esta línea dará error, porque se modifica el string de entrada previamente
   execute(f"SELECT * FROM data WHERE user_id = {user_id}")  # MEEH! Error.

.. Usando LiteralString, el string de entrada tendrá que venir tal cual sin manipular tal y como viene en el código
   fuente. En el primer ejemplo validará porque no se modifica, pero en el segundo al haber una manipulación, al no
   venir tal cual está en el código fuente, dará un error en el tipado. Como veis este último caso sería un SQL
   Injection de manual.


Más seguridad
-------------

.. revealjs_section::
    :data-background-color: #000000
    :data-background-image: _static/security.gif


.. Como veis, con los tipos no sólo podéis evitar problemas de programación típicos, sino también evitar fallos de
   seguridad en vuestras aplicaciones.


PEP 681: Data Class Transforms
==============================

.. Este PEP es interesante para los creadores de frameworks y bibliotecas, como pueden ser Django, Pydantic o
   SQLAlchemy.

.. revealjs_break::
    :notitle:

.. code-block:: python

    # La clase ``ModelBase`` está definida en la biblioteca.
    @typing.dataclass_transform()
    class ModelBase: ...


    # La clase ``ModelBase`` puede ser usado para crear nuevos modelos,
    # similar a como se hace en estos frameworks.
    class CustomerModel(ModelBase):
        id: int

.. Estas bibliotecas han creado sus propias clases para crear modelos, similares a los dataclass de Python. Ahora
   tienen una forma de definir un tipado para sus clases base, para indicar que éstas se comportarán como un dataclass
   de Python.

.. revealjs_break::
    :notitle:

.. code-block:: python

    def dataclass_transform(
        *,
        eq_default: bool = True,
        order_default: bool = False,
        kw_only_default: bool = False,
        field_specifiers: tuple[type | Callable[..., Any], ...] = (),
        **kwargs: Any,
    ) -> Callable[[_T], _T]: ...

.. Por defecto el nuevo tipo se comportará como un dataclass al ser identificado como tipo, aunque usando la función
   dataclass_transform pueden cambiarse las opciones por defecto hacer la transformación. En conclusión, este tipado es
   útil si se está creando un modelo de clases similares a los dataclass.

¿Qué otras novedades hay?
=========================

* Nuevo argumento ``-P`` en la línea de comandos y variable de entorno ``PYTHONSAFEPATH`` para
  **evitar ejecutar código inseguro**.
* **PEP 594**: Eliminar módulos muertos de la librería estándar (deprecated, a eliminar en 3.13).
* **PEP 624**: Eliminadas las APIs de codificación de Py_UNICODE.
* **PEP 670**: Convertir macros a funciones en la API en C de Python.
* **¡Y es más rápido!** (10-60% respecto Python 3.10).


.. ¿Y qué otras novedades hay? Tenemos... (leer puntos).

Más información
===============

https://docs.python.org/3.11/whatsnew/3.11.html

.. En la web oficial de Python podéis encontrar el detalle sobre todas estas novedades. Podéis o bien copiar esta URL,
   o buscarlo en Google y os saldrá de lo primero.

¿Cómo puedo conseguirlo?
========================
**¡¡Ya disponible!!**

.. ¿Y cómo puedes conseguirlo? Pues bien, ¡ya está disponible! Python 3.11 salió literalmente hace dos días. Podéis
   bajarlo desde la web de Python, desde vuestra distribución si ya lo tuviese o compilándolo desde los fuentes.

¿Desde los fuentes?
-------------------

https://www.build-python-from-source.com/

.. Si queréis compilarlo desde los fuentes en esta web disponéis de una ayuda sobre cómo hacerlo. No hace falta tener
   grandes conocimientos técnicos.

Python te necesita
------------------

.. revealjs_section::
    :data-background-color: #ffffff
    :data-background-size: contain
    :data-background-image: _static/sam.png

.. Y recordad, que podéis ir probando las nuevas versiones de Python antes de su fecha de lanzamiento oficial. Tras la
   primera beta no suele haber importantes cambios y probándolas y dándoles soporte permitís encontrar fallos en el
   intérprete antes de su día de salida. Os animo encarecidamente a hacerlo.

¡Muchas gracias!
================

**Referencias**

* `Qué hay de nuevo en Python 3.11 (doc oficial) <https://docs.python.org/3.11/whatsnew/3.11.html>`_.
* `Preview exception groups (Real Python) <https://realpython.com/python311-exception-groups/>`_.
* `Python variadic generics (Anthony Explains) <https://www.youtube.com/watch?v=hAj3nGzeSiQ>`_.

.. Y hasta aquí la presentación. Os agradezco a todos por venir, y aquí os dejo algunas referencias utilizadas en
   esta presentación.

¿Y la presentación?
-------------------

.. revealjs_section::
    :data-transition: zoom

`github:Nekmo/python311-presentacion <https://github.com/Nekmo/python311-presentacion>`_

.. Además de a la presentación, por si queréis volver a verla.

.. revealjs_break::
    :data-background-color: #ffffff
    :data-background-size: contain
    :data-background-image: _static/qr.png
    :notitle:


.. Además aquí la tenéis en forma de QR por si os es más cómodo, para no tener ni que escribir.

Contactar
---------

* **Sitio web:** `nekmo.com <https://nekmo.com>`_
* **Email:** `contacto@nekmo.com <mailto:contacto@nekmo.com>`_
* **Twitter:** `@nekmocom <https://twitter.com/nekmocom>`_
* **Telegram:** `@nekmo <https://t.me/nekmo>`_
* **Jabber:** `nekmo@nekmo.org <xmpp://nekmo@nekmo.org>`_


.. Finalmente, también tenéis mi sitio web (ejem ejem spam) en esta diapositiva. Además de mi email. Y Twitter.
   Aunque apenas escriba en Twitter. Y ante todo, ¡muchas gracias a todos! ¿Alguna pregunta?
