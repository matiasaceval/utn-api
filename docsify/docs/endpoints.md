# ➕🧮**UTN-API**<small>1.0a</small>
> By students, for students.

---

# **What is an API Endpoint?**

Simply put, an endpoint is one end of a communication channel. When an API interacts with another system, the touchpoints of this communication are considered endpoints. For APIs, an endpoint can include a URL of a server or service. Each endpoint is the location from which APIs can access the resources they need to carry out their function.

<small>APIs work using ‘requests’ and ‘responses.’ When an API requests information from a web application or web server, it will receive a response. The place that APIs send requests and where the resource lives, is called an endpoint.</small>

## **/api/calendar**

### **/activity**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/calendar/activity</pre>

Calling _activity_ endpoint without passing a date query or next parameter, will return the next activities starting at current date.

```json
[
    {
        "activity": "Fin de cursado - 1º Cuatrimestre con presentacion de Actas",
        "start": "2022-07-02T03:00:00.000Z",
        "end": "2022-07-02T03:00:00.000Z"
    },
    {
        ...
    },
    ...
]
```

### **/activity/{next}**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/calendar/activity/next</pre>

Calling _activity/next_ endpoint without date query, will return the next activity starting at current date.

```json
{
    "activity": "Fin de cursado - 1º Cuatrimestre con presentacion de Actas",
    "start": "2022-07-02T03:00:00.000Z",
    "end": "2022-07-02T03:00:00.000Z"
}
```

### **/holiday**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/calendar/holiday</pre>

Calling _holiday_ endpoint without passing a date query or next parameter, will return the next holidays starting at current date.

```json
[
    {
        "activity": "Día del Trabajador (Ley 21329)",
        "category": "Feriado inamovible",
        "start": "2022-05-01T03:00:00.000Z",
        "end": "2022-05-01T03:00:00.000Z"
    },
    {
        ...
    },
    ...
]
```

### **/holiday/{next}**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/calendar/holiday/next</pre>

Calling _holiday/next_ endpoint without date query, will return the next holiday starting at current date.

```json
{
    "activity": "Día del Trabajador (Ley 21329)",
    "category": "Feriado inamovible",
    "start": "2022-05-01T03:00:00.000Z",
    "end": "2022-05-01T03:00:00.000Z"
}
```

?> Previous <small><kbd>GET</kbd></small> methods (both _activity_ and _holiday_) can receive _date_ as query, to return the next activities (or single activity, if _/next_ parameter is specified) from that specific date. Examples:<br>
_/api/activity?date=11/28/2022_ <br>
_/api/holiday/next?date=11/28/2022_ <br>

!> Note that _date_ is English formatted: _MM/DD/YYYY_</small>

<br>

## **/api/commission**

### **/{commission}/{year}**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/commission/{commission}/{year}</pre>

Will return array of subjects from the commission nº{commission}, belonging to the year {year}

```json
[
    {
        "teacher": { ... },
        "timetable": { ... },
        "exam": { ... },
        "recuperatory": { ... },
        "subject": "Programación",
        "zoom": null,
        "extra": [ ... ]
    },
    {
        ...
    },
    ...
]
```

### **/{commission}/{year}?subject={subject}**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/commission/{commission}/{year}?subject={subject}</pre>

```json
{
    "teacher": { ... },
    "timetable": { ... },
    "exam": { ... },
    "recuperatory": { ... },
    "subject": "{subject}",
    "zoom": null,
    "extra": [ ... ]
}
```

### **/{commission}/{year}?teacher={teacher}**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/commission/{commission}/{year}?teacher={teacher}</pre>

Will return array if the teacher is in multiple subjects, otherwise single object will be returned.

```json
[
    {
        "teacher": { "name": "{teacher}", ... },
        "timetable": { ... },
        "exam": { ... },
        "recuperatory": { ... },
        "subject": "Programación",
        "zoom": null,
        "extra": [ ... ]
    },
    {
        ...
    },
    ...
]
```

?> Previous <kdb>GET</kdb> methods that includes querys, can be applied at the same time. Example:<br>
_/api/commission/1/1?subject=Programación&teacher=Matias Aceval_

<br>

[Back to top](docs/endpoints?id=main)
