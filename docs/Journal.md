# My Learning Journal

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
