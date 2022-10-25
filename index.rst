.. Construyendo APIs con Django Rest Framework documentation master file, created by
   sphinx-quickstart on Wed Feb 17 01:02:49 2021.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

.. This toctree is only to link examples.

.. toctree::
   :glob:
   :hidden:

   *

.. _intro:

===============================================
Construyendo APIs con **Django Rest Framework**
===============================================

.. image:: images/drf_logo.*

.. Buenas, en esta presentación os mostraré cómo construir vuestra propia API Rest con Django Rest Framework,
   aunque antes de eso me presento...

.. _sobre-mi:

Sobre mí **Nekmo**
==================

+-----------------------------------+
|                                   |
| .. image:: images/cara.svg        |
|   :width: 200px                   |
|                                   |
| *Django desde versión 1.1 (2009)* |
|                                   |
+-----------------------------------+

.. Soy Juan José Oyagüe, más conocido en las redes como Nekmo; y llevo media vida programando en Python,
   y usando Django ya desde su versión 1.1. Así que no os puedo engañar...


**Django** + *Django Rest Framework*
====================================

.. ... Me gusta Django, y Django Rest Framework. Y espero conseguir haceros llegar un poco de mi
   pasión por estos dos frameworks, y de los motivos por los que llevo usándolos tanto tiempo. Vale, pero
   antes de llegar a mí Django Rest Framework, llego a mí...

Django
======

.. image:: images/django-white-logo.svg
   :width: 100%

.. revealjs_section::
    :data-background-color: #0c4b33

.. Django. ¿Y qué es exactamente este framework?

Qué es
------

.. revealjs_fragments::

    * **Framework web**.
    * **Desarrollo rápido** en **Python**.
    * Miles de **módulos**.
    * Muy **escalable**.
    * Gran **soporte**.

.. revealjs_section::
    :data-background-color: #0c4b33

.. Aquí no me puedo parar mucho, pero en resumen, Django es un framework web para el rápido desarrollo en Python, con
   miles de módulos, muy estable y con gran soporte. Seguramente, el más conocido y usado en Python.


Baterías incluidas
------------------

.. revealjs_section::
    :data-background-color: #0c4b33

.. image:: images/batteries-included.*
   :width: 100%

.. Y al igual que Python, tiene baterías incluidas. Esto significa, que tiene cosas para todo.

Qué incluye
-----------

.. revealjs_section::
    :data-background-color: #0c4b33


.. revealjs_fragments::

    * **ORM** para base de datos.
    * Administración de **sesiones**.
    * Control de **permisos**
    * Gestión de **urls**.
    * **Middleware**.
    * **Caché**.
    * envío de **correos**...
    * Pero **no API Rest**.

.. ¿Y qué incluye de serie? Pues tendríamos... (leer listado).

Django Rest Framework
=====================

.. image:: images/drf_logo.*

.. ¿Recordáis que hemos dicho que tiene módulos para todo? Pues Django Rest Framework es uno de esos módulos.
   Se instala en prácticamente en 3 o 4 pasos, y listo para funcionar.

Framework para desarrollar **APIs REST***
-----------------------------------------

``*`` **API REST:** Arquitectura de software que trabaja con los recursos mediante los operadores HTTP *(POST, GET,
PUT, DELETE...)*.

.. ¿Y cómo podríamos definir Django Rest Framework? Se trata de un framework para desarrollar APIs REST, una
   arquitectura de software en que se trabaja con *recursos* usando los operadores HTTP, tales como POST, GET, PUT
   o DELETE.

Operadores HTTP
---------------

Respectivamente: **Crear, obtener, actualizar y eliminar**.

.. image:: images/http_operators.png

.. Por ejemplo, aquí aquí el operador HTTP POST crea, GET obtiene por el id, PATCH actualiza y DELETE elimina. Django
   Rest Framework facilitar crear APIs REST como esta. Pero espera... Hemos dicho que Django Rest Framework es un
   framework... ¿Y Django también es un framework?

Meta framework
--------------

.. image:: images/meta.*

.. revealjs_section::
    :data-background-color: #000000

.. Sí, Django Rest Framework es un framework dentro de otro framework web. Pero aún no saquéis las antorchas.


Antorchas
---------

.. image:: images/mob-torch.gif
   :width: 150%

.. revealjs_section::
    :data-background-color: #000000
    :data-transition: convex-in slide-out


**Django Rest Framework** *complementa*
---------------------------------------

.. Django Rest Framework aprovecha todo lo bueno de Django, y lo complementa. Si Django es un pastel

Pastel 1
--------

.. image:: images/guinda-sin.jpg

.. revealjs_section::
    :data-background-color: #badeba
    :data-transition: slide-in fade-out

.. Django Rest Framework es su guinda

Pastel 2
--------

.. image:: images/guinda.jpg

.. revealjs_section::
    :data-background-color: #badeba
    :data-transition: fade

.. ¿Y nadie quiere una guinda sin pastel, verdad?

Ejemplo web
===========

.. revealjs_section::
   :data-transition: concave


.. image:: images/api-web-list.png

.. Además, nos construye una API REST navegable muy vistosa que nos mostrará el JSON resaltado e indentado de
   nuestros objetos.

Formulario
----------

.. revealjs_section::
   :data-transition: concave-in slide-out


.. image:: images/api-web-form.png


.. No sólo eso, sino que nos construye formularios para crear nuevos objetos. Pero estas no son sus únicas
   características.

Características
===============

.. revealjs_fragments::

    * **Interpretar** y **renderizar** a múltiples formatos.
    * **Clases genéricas** para facilitar operaciones **CRUD**.
    * Potentes **serializers** para trabajar **con o sin** el **ORM**.
    * **Paginación**, **filtrado**, **búsqueda** y **ordenación** en listados.
    * Compatible con los **validadores** y **sistema de permisos** de Django.
    * ... entre otras opciones.

.. (leer puntos). Pero esto no es lo único bueno de Django Rest Framework.

Estructura
==========

.. image:: images/esquema-drf.png

.. Si Django Rest Framework me gusta, no es sólo por sus opciones o su modo web, sino porque a diferencia
   de otros módulos que hacen lo mismo, entiende perfectamente la filosofía de Django, y ello se ve en su estructura.

Serializers
===========

**¿Qué son?**

.. Vale, empecemos por los serializers. ¿Y qué hacen los serializers?

Los serializers, serializan
---------------------------

*Nekmo, 2021.*

.. Los serializers, serializan. Nekmo, 2021. Vale, ahora en serio.

Interpretar la entrada
----------------------

.. revealjs_section::
   :data-transition: fade-in zoom-out

.. code-block:: json

    {
        "identifier": "bulbasaur",
        "color": 5,
        "gender_rate": 1,
        "has_gender_differences": false
    }

.. Los serializers, son los responsables de convertir y validar la entrada de datos, vamos, lo que mete el usuario a
   través de la API, en un objeto en Python, que normalmente servirá para crear o actualizar un objeto en la base de
   datos. Para ello usaríamos el siguiente serializer.


.. revealjs_break::
    :data-transition: convex

.. code-block:: python

    # serializers.py
    # --------------
    class SpecieSerializer(serializers.HyperlinkedModelSerializer):

        class Meta:
            model = Specie
            exclude = ()

.. Al provenir de un modelo, Django Rest Framework es capaz de obtener los campos y sus tipos.

.. revealjs_break::
    :data-transition: convex

.. code-block:: python

    # models.py
    # ---------
    class Specie(models.Model):
        identifier = models.CharField(_('Specie identifier'), max_length=50)
        color = models.CharField(max_length=8, choices=COLORS)
        gender_rate = models.SmallIntegerField()
        has_gender_differences = models.BooleanField()

.. Este sería el modelo usado y del que se obtienen los campos, aunque también es posible definirlos manualmente
   en el serializer.

.. revealjs_break::
    :data-transition: convex

.. code-block:: python

    # serializers.py
    # --------------
    class SpecieSerializer(serializers.HyperlinkedModelSerializer):

        identifier = serializers.CharField()
        color = serializers.ChoiceField(choices=COLORS)
        gender_rate = serializers.IntegerField()
        has_gender_differences = serializers.BooleanField(default=False)

        class Meta:
            model = Specie
            exclude = ()

.. Aunque no es necesario definir los campos de esta forma, puede ser útil para cambiar algún tipo, sus
   opciones, etc. También es necesario hacerlo de esta forma si el serializer no proviene de un modelo, y creamos
   nuestro propio serializer.

Devuelve la salida
------------------

.. revealjs_section::
   :data-transition: zoom-in fade-out

.. image:: images/api-web-detail.png

.. También hacen lo mismo pero a la inversa: convierten el objeto a una salida compatible, un data, el cual
   normalmente será un diccionario el cual el renderer (del que hablaremos luego) transformará en json, xml, o
   lo que proceda.

Viewsets
========
Lógica encargada de procesar las peticiones de la API para **trabajar con los objetos** para:

.. revealjs_fragments::

    * **Crearlos**
    * **Listarlos**
    * **Actualizarlos**
    * **Obtenerlos**
    * **Eliminarlos**...

.. Los viewsets en cambio, son la lógica encargada de devolver tus objetos, a través de la API, (leer puntos):
   crearlos, listarlos, etc.

Ejemplo viewset
---------------

.. code-block:: python

    class SpecieViewSet(viewsets.ViewSet):
        """A simple ViewSet for listing or retrieving species."""

        def list(self, request):
            queryset = Specie.objects.all()
            serializer = SpecieSerializer(queryset, many=True)
            return Response(serializer.data)

        def retrieve(self, request, pk=None):
            queryset = Specie.objects.all()
            user = get_object_or_404(queryset, pk=pk)
            serializer = SpecieSerializer(user)
            return Response(serializer.data)


.. Por ejemplo, este viewset ``SpecieViewSet`` tiene las acciones listar y obtener un objeto.

.. revealjs_break::
    :data-transition: convex-in slide-out

.. code-block:: python

    class SpecieViewSet(viewsets.ModelViewSet):
        """
        This viewset automatically provides `list`, `create`, `retrieve`,
        `update` and `destroy` actions.

        Additionally we also provide an extra `photo` action.
        """
        queryset = Specie.objects.select_related('growth_rate', 'shape', 'habitat')
        serializer_class = SimpleSpecieSerializer
        filter_class = SpecieFilter
        ordering_fields = ('identifier', 'generation', 'evolves_from_specie', 'color')
        search_fields = ('identifier', 'generation__identifier', 'shape__identifier')

        @action(detail=True)
        def photo(self, *args, **kwargs):
            obj = self.get_object()
            photo_url = PHOTO_FORMAT_URL.format(**vars(obj))
            return Response(headers={'Location': photo_url},
                            status=status.HTTP_302_FOUND)

.. Y como esto es algo muy habitual y repetitivo, heredando de ModelViewSet automáticamente tendrá estas acciones y
   además las de crear, actualizar y borrar sin necesidad de definirlas. En este ejemplo además ponemos una acción
   adicional. Pero vamos a ver más en detalle algunas de las opciones de este viewset...


Filtrado y paginación
---------------------

.. code-block:: python

    filter_class = SpecieFilter
    ordering_fields = ('identifier', 'generation', 'evolves_from_specie', 'color')
    search_fields = ('identifier', 'generation__identifier', 'shape__identifier')


.. image:: images/filters_example.png
    :width: 60%

.. Estas opciones permiten respectivamente, definir los filtros, la ordenación y la búsqueda, las cuales se mostrarán
   después en el modo web a modo de ayuda. En estos, es posible usar doble barra baja para acceder a modelos
   relacionados. Pero veamos qué hay en la clase SpecieFilter...

.. revealjs_break::
    :data-transition: convex-in slide-out

.. code-block:: python

    from django_filters.rest_framework import FilterSet

    class SpecieFilter(FilterSet):

        class Meta:
            model = Specie
            fields = {
                'identifier': ['exact', 'icontains'],
                'generation': ['exact', 'in'],
            }

.. Esta clase en realidad, utiliza una biblioteca externa llamada django-filter. En este ejemplo hay 2 campos por los
   que se filtra, identifier y generation, y ambos tienen lookups. Los lookups son opciones que se pueden usar en la
   query SQL. Por ejempo icontains permite filtrar por un texto que es contenido por el campo ignorando las mayúsculas.

Parsers y renderers
-------------------

También se encarga de definir:

* Los **parsers** *(leen e convierten la petición)* para luego interpretarse y validarse con los **serializers**.
* Los **renderers** *(devuelven al usuario la respuesta)* a partir del data del **serializer**.

Algunos **formatos**: *json* (por defecto), *xml*, *yaml*, *csv*...

.. Además, el viewset es el encargado de definir los llamados *parsers* que son las formas de leer la
   información del usuario para aceptar json, xml, entre otros, y los *renders*, para devolver los datos según el que
   desee el usuario.

.. revealjs_break::
    :data-transition: convex-in slide-out

.. image:: images/xml_example.png

.. Por ejemplo, en vez de tener como salida del renderer JSON como vimos antes, podemos solicitar que se nos devuelva
   XML.

Opciones por defecto
--------------------

.. code-block:: python

    # settings.py
    # -----------
    REST_FRAMEWORK = {
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 20,
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework.authentication.TokenAuthentication',
            'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        ]
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
        ]
        'DEFAULT_RENDERER_CLASSES': (
            'rest_framework_xml.renderers.XMLRenderer',
        ),
        'DEFAULT_FILTER_BACKENDS': (
            'django_filters.rest_framework.DjangoFilterBackend',
        ),
    }

.. Algunas de las opciones de los viewsets pueden definirse de forma global por defecto para todo el proyecto, como el
   caso de los parsers y renderers, que no se definían en el viewset. Las opciones por defecto se definen en el
   settings de Django. En este ejemplo, definimos la paginación y su tamaño, las clases para la autenticación, entre
   las que se encuentra el de token, los permisos necesarios, los renderers como decíamos, o las clases de filtrado.


Otras opciones viewsets
-----------------------

.. revealjs_fragments::

    * **Caché respuesta**.
    * **Documentación**.
    * **Limitar las peticiones** (Throttling).
    * ... y más.

.. Pero los viewsets nos permiten más cosas, caché, documentación, limitar las peticiones y más. Vale, y hasta
   aquí la mitad de la presentación.

Vamos terminando
================

.. revealjs_section::
    :data-background-color: #000000
    :data-background-image: _static/applause.gif


.. Lo que queda por suerte ya es más fácil. Pasemos a los routers.

Routers
=======

.. code-block:: python

    # routers.py
    # ----------

    router = DefaultRouter()
    router.register(r'pokemon', viewsets.PokemonViewSet)
    router.register(r'species', viewsets.SpecieViewSet)
    router.register(r'growth_rates', viewsets.GrowthRateViewSet)
    router.register(r'shapes', viewsets.ShapeViewSet)
    router.register(r'habitats', viewsets.HabitatViewSet)
    router.register(r'generations', viewsets.GenerationViewSet)
    router.register(r'regions', viewsets.RegionViewSet)


.. Los *routers* son la parte más sencilla de explicar: se encargan de registrar los viewsets y ponerles un nombre,
   para que sea posible acceder a ellos por una url. ¿No es genial acabar con la parte más fácil?

Urls
----

.. revealjs_section::
    :data-transition: convex-in slide-out

.. code-block:: python

    # urls.py
    # -------

    urlpatterns = [
        url(r'^', include(router.urls)),
        path('docs/', include_docs_urls(title='Pokédex'))
    ]


.. Después sólo queda registrarlos en el ``urls.py`` de Django, igual que con cualquier otra app. Así de fácil.

En resumen
==========

.. revealjs_fragments::

    * **Serializers**: representan e interpretan los datos.
    * **Viewsets**: gestionan las peticiones y devuelven la respuesta.
    * **Routers**: corresponde a las urls que se utilizarán.

.. Así pues, en resumen tenemos: serializers que representan e interpretan los datos, viewsets que gestionan las
   peticiones, y routers que corresponde a las urls que se utilizarán.

¿Y no podríamos reducirlo?
==========================

.. image:: images/esquema-drf.png
    :width: 100%

.. Pero claro, alguno pensará... ¡Esas son muchas clases y muchas cosas! ¿No podría estar todo junto? A mí también me
   lo pareció al principio. Por ejemplo, ¿por qué no juntar los serializers y los viewsets?

Heredar serializers
===================

.. code-block:: python

    class SimpleSpecieSerializer(serializers.HyperlinkedModelSerializer):

        class Meta:
            model = Specie
            exclude = ('growth_rate', 'shape', 'habitat', 'generation')


    class SpecieSerializer(SimpleSpecieSerializer):

        class Meta(SimpleSpecieSerializer.Meta):
            exclude = ()


.. El motivo por el que no se puede , es que puedes heredar de tu serializer para crear uno en mas detalle.

Condicionar serializer
----------------------

.. revealjs_section::
    :data-transition: convex

.. code-block:: python

    class SpecieViewSet(viewsets.ModelViewSet):
        """
        This viewset automatically provides `list`, `create`, `retrieve`,
        `update` and `destroy` actions.
        """
        queryset = Specie.objects.select_related('growth_rate', 'shape')
        serializer_class = SpecieSerializer

        def get_serializer_class(self):
            if self.action == 'retrieve':
                return DetailPokemonSerializer
            return super().get_serializer_class()


.. Y devolver un serializer u otro dependiendo de si lo pones en un listado o pides sólo uno, por ejemplo. Así
   ahorras datos. ¿No es genial?

Anidar serializers
------------------

.. revealjs_section::
    :data-transition: convex-in slide-out

.. code-block:: python

    class GrowthRateSerializer(serializers.HyperlinkedModelSerializer):
        class Meta:
            model = GrowthRate
            exclude = ()


    class SpecieSerializer(SimpleSpecieSerializer):
        growth_rate = GrowthRateSerializer()  # nested serializer

        class Meta(SimpleSpecieSerializer.Meta):
            exclude = ()


.. Y por si fuera poco, puedes reutilizar tus serializers para usarlos en otros serializers, anidados. Esto es
   lo que se llama *nested serializers*

Otros módulos
=============

* `djoser <https://github.com/sunscrapers/djoser>`_ (Registro y autenticación usuarios).
* `django-oauth-toolkit <https://github.com/jazzband/django-oauth-toolkit>`_ (OAuth2).
* `drf-yasg <https://github.com/axnsan12/drf-yasg/>`_ (Swagger).
* `drf-nested-routers <https://github.com/alanjds/drf-nested-routers>`_ (Routers anidados)
* `rest-pandas <https://github.com/wq/django-rest-pandas>`_ (Excel, CSV y SVG renderers).
* `drf-extensions <https://github.com/chibisov/drf-extensions>`_ (extensiones varias).

.. La gente de Django Rest Framework ha pensado en muchas de estas cosas, pero por si fuera poco, cuentas con cientos
   de módulos de terceros, como por ejemplo (listar ejemplos).

Demo
====

.. revealjs_section::
    :data-background-color: #000000
    :data-background-image: _static/demo.gif


.. Y ya pasaríamos a verlo en acción. Y vamos a ver un ejemplo con, por ejemplo, ...

Pikachu
-------

.. revealjs_section::
    :data-background-color: #000000
    :data-background-image: _static/pikachu.jpg


.. Pokémons. Porque, ¿por qué no?

¡Muchas gracias!
================

**Referencias**

* `Django Tutorial <https://docs.djangoproject.com/en/3.1/intro/tutorial01/>`_.
* `Django Rest Framework Tutorial <https://www.django-rest-framework.org/tutorial/quickstart/>`_.
* `Awesome Django Rest Framework <https://github.com/nioperas06/awesome-django-rest-framework>`_.

.. Y hasta aquí la presentación. Espero que no se haya alargado de más. Tenéis enlaces a Django, Django Rest
   Framework y un listado de módulos geniales para este último.

¿Y la presentación?
-------------------

.. revealjs_section::
    :data-transition: zoom

Vuelve a verla, prueba la demo y mira el código fuente en:

`github:Nekmo/django-rest-framework-presentacion <https://github.com/Nekmo/django-rest-framework-presentacion>`_

.. Además de a la presentación, por si queréis volver a verla.

Contactar
---------

* **Sitio web:** `nekmo.com <https://nekmo.com>`_
* **Email:** `contacto@nekmo.com <mailto:contacto@nekmo.com>`_
* **Twitter:** `@nekmocom <https://twitter.com/nekmocom>`_
* **Telegram:** `@nekmo <https://t.me/nekmo>`_
* **Jabber:** `nekmo@nekmo.org <xmpp://nekmo@nekmo.org>`_

|
|

.. image:: images/hispasec-logo.png
    :width: 40%

.. Finalmente, también tenéis mi sitio web (ejem ejem spam) en esta diapositiva. Y también mi email. Y Twitter.
   Aunque apenas escriba en Twitter. Y ante todo, ¡muchas gracias a todos!
