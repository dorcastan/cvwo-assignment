# My Learning Journal

## 24 Jan 20: Entry 0xE

Adding user authentication pages to the main application UI - standard work.

## 20 Jan 20: Entry 0xD

Completed basic user authentication! Mostly following a tutorial, but with 
some UI customisations along the way.

## 18 Jan 20: Entry 0xC

Part 2 of Saturday's work. Made error messages show up properly for forms. 
Successfully hosted on Heroku. Working on user authentication.

* Found out how to access attributes from the Formik object
* Got some idea of the difference between sessions & tokens (JWT)
* Why uniqueness needs to be handled at the database level as well

## 17-18 Jan 20: Entry 0xB

Designed user interface using Material UI. Dealing with Formik fields took 
a while, as many online solutions required custom components to be created - 
not ideal for me given the number of (non-reused) components needed. 
Also spent some time experimenting with different layouts and spacing.

Separately, found a bug in my search-by-tag: searching for special characters 
messed up the regex, resulting in an error. Not too difficult to resolve.

Resources:
* [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 13 Jan 20: Entry 0xA

Successfully enhanced search functionality!

* It's possible to construct SQL queries through Rails from JSONAPI::Resources.

## 09 Jan 20: Entry 1001

Managed a basic search, and tried to do a (very small) bit of optimisation.
Still trying to figure out a way to do partial search.

Learning points:
1. Monitor SQL queries through the console to see database queries and figure 
out how the application is working

## 08 Jan 20: Entry 1000

Experimented with different combinations of resource and route configurations. 
Considered custom controller actions too, but concluded that they're not the 
preferred course of action (for RESTful interfaces).

Eventually decided to just try working through the existing (basic) API for 
to-dos and tags, although it will be highly inefficient. Finally got tagging 
up and running!

Learning points (besides the above):
1. How to make data from different tables accessible through the API 
(`JSONAPI::Resources` *is* the server API layer)

Question:
1. So much data validation that seems to do the same thing – where should it be?

## 07 Jan 20: Entry 111

* Chapters 7 and 11 (Query Interface, Routing)

## 06 Jan 20: Entry 110

* Layers: Database --> Model --> Controller --> API (Routes)
* Database migrations
* Read through Chapters 2 - 6 (Basics, Migrations, Validations, Callbacks, Associations)

## 04 Jan 20: Entry 101

Attempted to edit to-dos on separate pages, but gave up because I couldn't 
find an elegant way to pass existing values into the input fields. Might try 
again some other time. Learning point:
1. It's possible to use URLs to pass information to a React component (through 
routing)

Also, spent lots of time debugging 400 (Bad Request) errors for my `PUT` 
request. While figuring out what *wasn't* buggy, I learnt:

2. How Rails maps HTTP requests to controller actions (i.e. one reason why 
`rails routes` is useful)
3. The default actions provided for a Rails resource (i.e. why I don't need 
to write my own create/update actions)
4. What an X-CSRF-Token is and why it's used

## 30 Dec 19: Entry 4

Tidying up mid-assignment submission. Realised I didn't properly design the 
database schema before starting, but also realised that the structure I need 
should (hopefully) be achievable using a simple database migration. Just need 
to add a column to store the tag.

What I learnt:
1. What relational databases are (databases and models are not the same!)
2. How database migrations work in Rails (up/down/change)

## 28 Dec 19: Entry 3

After much trial and error, managed to implement data item deletion. Still not 
sure whether this should be done using HTTP `DELETE` or by configuring 
(need to research more).

What I learnt:
1. The different types of HTTP requests and possible response codes
2. What JavaScript's `async` and `await` are (reference
[link](https://javascript.info/async-await))

Miscellaneous items: 
1. Added extensions (ESLint and Prettier Now) to automatically check/ format 
JavaScript code 

## 25 Dec 19: Entry 2

Spent the afternoon trying to figure out how to edit and/or delete data items. 
Looking at the code for *Add To-Do* (and what I know of React), I figured it 
had something to do with HTTP requests and linking front- and back-end.
Alternatively, I might need to configure my API.

What I learnt:
1. How to use Reach Router to control navigation on the front-end (found its 
website and helpful [tutorial page](https://reach.tech/router/tutorial/03-link))

## 24 Dec 19: Entry 1

My first day starting on this project properly. Spent most of the afternoon 
trying to set things up, but managed to get something working by the end of 
the day, thankfully.

Today I learned:
1. How to use Visual Studio (how it works + some keyboard shortcuts)
2. How to debug dependency/version problems e.g. with `bundler` or `yarn` 
(basically: uninstall and install again)
3. What the different packages/dependencies are for (or got a better 
understanding of them, at least)
4. What a full back-to-front-end web app implementation looks like (following 
a tutorial, but still)

Other random stuff that got done along the way:
1. Changed from `rvm` to `rbenv` cleanly
2. Saw a bit of SQL using `postgres`
