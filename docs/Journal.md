# My Learning Journal

## 7-8 Feb 20: Entry 0x12

Final days. Mostly documentation work as I don't have enough time to implement
and debug anything major.

## 5-6 Feb 20: Entry 0x11

[link](#5-6-feb-20-entry-0x11)

Attempted to deploy to Heroku, but encountered problems with to-do creation.
After combing through the logs, discovered that session cookies were not being 
saved in the production environment (i.e. on Heroku too). 

* Solution: Disabled domain name for session cookies in production environment, 
because I couldn't figure out what the correct domain name should be. 
    * Drawback: Session cookies [will not work](https://sam-low.com/ruby/rails/cookie/changing-rails-session-cookie-domain.html) 
    with subdomains of the original site.
    * Mitigating factor: It is virtually impossible that this (Heroku-hosted) 
    web app will end up with a subdomain anyway.

Silver lining:
* Learnt how to test the app locally in the production environment: Run the 
necessary updates with `RAILS_ENV=production <command>`, followed by 
`rails s -e production`
* Revised the different types of session stores: cookies vs cache vs database. 
Opted for cookie store here since not much information needs to be stored (and 
security is somewhat protected by Rails).

Side note: CSRF token verification is still disabled on the back-end in order 
for sessions to work. Not ideal.


## 27 Jan 20: Entry 0x10

Trying to implement access control. Settled for a (rather hacky) method of 
only allowing access to to-dos if requested todo(s) belong(s) to the user that 
is logged in. Process documented below.

---
* Attempt #1: Select to-dos using `Todo#find_by`, apply the relevant filters, 
then serialize it to JSON API format.
    * Issue: JSONAPI::ResourceSerializer's #serialize_to_hash seems to have been 
[removed](https://github.com/cerebris/jsonapi-resources/issues/1149).

* Attempt #2: Filter resources using `session[:user_id]`
    * Issue: Sessions are not accessible from within JSONAPI resources
* Attempt #2b: Pass `user_id` from controller to resource through `context`
    * Issue: Not all resource methods receive context from controller. In 
    particular, can't set a default value using `context[:current_user_id]`.

* Attempt #3: Don't show any to-dos unless the ID of the logged in user is 
specified as a filter.
    * Drawback: Client must specify `/api/todos?filter[user_id]=id` when 
    requesting to-dos.
    * Mitigating factor: It's still technically secure, since to-dos cannot be 
    accessed without logging in first.

---

Prettifying UI. Almost there!

## 25 Jan 20: Entry 0xF

Fixed any to-do functionality that was broken by the addition of users.
Figuring out how to add a default parameter when creating to-dos was tricky, 
partially due to the appearance of unrelated errors and difficulties in 
debugging vague errors (e.g. 422 Unprocessable Entity). A lot of time spent 
on trial-and-error, waiting for the app to reload, or restarting the Rails 
server.

* Discovered the existence of ActiveRecord::Parameters (as it turns out, 
didn't need to use them anyway) (saving [this link](http://vaidehijoshi.github.io/blog/2015/11/24/peeking-under-the-hood-of-actioncontroller-parameters-part-2/) 
for future reference)
* Learnt to use Rails logger for debugging

## 24 Jan 20: Entry 0xE

Adding user authentication pages to the main application UI - the usual 
UI-designing-and-tweaking process.

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
