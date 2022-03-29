# ➕🧮**UTN-API**<small>1.0a</small>

> By students, for students.

---

# **What is an API Endpoint?**

Simply put, an endpoint is one end of a communication channel. When an API interacts with another system, the touchpoints of this communication are considered endpoints. For APIs, an endpoint can include a URL of a server or service. Each endpoint is the location from which APIs can access the resources they need to carry out their function.

<small>APIs work using ‘requests’ and ‘responses.’ When an API requests information from a web application or web server, it will receive a response. The place that APIs send requests and where the resource lives, is called an endpoint.</small>

## **Activity**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/activity?date=11/28/2022</pre>

<small>Calling _activity_ endpoint without passing a date query will return the nearest activity in calendar.</small>

```json
{
    "activity": "Apertura Inscripción a Finales Diciembre",
    "start": "2022-11-28T03:00:00.000Z",
    "end": "2022-11-28T03:00:00.000Z"
}
```

## **Holiday**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/holiday?date=08/19/2022</pre>

<small>Calling _holiday_ endpoint without passing a date query will return the nearest holiday in calendar.</small>

```json
{
    "activity": "73º Aniversario de la creación de la UTN (Ley 13229)",
    "category": "Aniversario UTN",
    "start": "2022-08-19T03:00:00.000Z",
    "end": "2022-08-19T03:00:00.000Z"
}
```

## **Current**

<pre><kbd>GET</kbd> https://utn-api.herokuapp.com/api/current?date=03/24/2022</pre>

<small>Calling _current_ endpoint without passing a date query will return the activity/holiday of that date, if there is none will give back error 404.</small>

```json
{
    "activity": "Día Nacional de la Memoria por la Verdad y la Justicia (Ley 25633)",
    "category": "Feriado inamovible",
    "start": "2022-03-24T03:00:00.000Z",
    "end": "2022-03-24T03:00:00.000Z"
}
```

<br>

[Back to top](docs/endpoints?id=main)
