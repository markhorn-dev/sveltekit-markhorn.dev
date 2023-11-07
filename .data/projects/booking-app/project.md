---
title: Booking App
description: A full stack desktop booking app in Java and JavaFX, complete with authentication, database and back-end.
datePublished: 06/12/2020
tags: [Java, SQL]
---

## Stack

### Back-end
* Java Api
* Postgres SQL database

### Front-end
* JavaFX (for desktop)

### Software Used
* NetBeans
* Figma

### Overview
Contracted to develop a scheduling desktop user interface application. The contract is with a global consulting organization that conducts business in multiple languages and has main offices in Phoenix, New York and London. The consulting organization needs Postgres database to pull data from.

### Requirements

* A. Create a log-in form that can determine the user’s location and translate log-in and error control messages into multiple languages.
* B. Provide the ability to add, update, and delete customer records in the database, including name, address, and phone number.
* C. Provide the ability to add, update, and delete appointments, capturing the type of appointment and a link to the specific customer record in the database.
* D. Provide the ability to view the calendar by month and by week.
* E. Provide the ability to automatically adjust appointment times based on user time zones and daylight saving time.
* F. Write exception controls to prevent each of the following. You may use the same mechanism of exception control more than once, but you must incorporate at least two different mechanisms of exception control.
    - scheduling an appointment outside business hours
    - scheduling overlapping appointments
    - entering nonexistent or invalid customer data
    - entering an incorrect username and password
* G. Write lambda expressions to make your program more efficient
* H. Write code to provide an alert if there is an appointment within 15 minutes of the user’s log-in.
* I. Provide the ability to generate each of the following reports:
    - number of appointment types by month
    - the schedule for each consultant
    - one additional report
* J. Provide the ability to track user activity by recording timestamps for user log-ins.
* K. Not allowed to use frameworks or external libraries.