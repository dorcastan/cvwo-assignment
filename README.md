# To-Do List

## About *To-Do List*

*To Do List* provides a convenient online service to keep track of tasks to 
be done.

With a simple sign-up process and access to tasks from different devices, 
it is easy to jot down notes or tasks to be done later. 

[Try out the live app here!](http://todolist-9920.herokuapp.com/)

> Note: *To-Do List* is intended for desktop use. While it still works on 
mobile devices, the layout and display size may not be optimal.

> CVWO assignment final submission [here](#other-information)

---

## User Guide

### Navigating the app

#### Navigation bar

The navigation bar is located at the top of the app. It contains links that 
you might use, based on whether you are logged in or not.

* New users (not logged in): 
![Navigation bar if user is not logged in](/docs/ui/nav-bar-not-logged-in.png)
* Logged-in users: 
![Navigation bar if user is logged in](/docs/ui/nav-bar-logged-in.png)

#### Home page
* When you first view the *To-Do List* [**Home**](http://todolist-9920.herokuapp.com/)
page, you should see a welcome message with links to directing you to log in 
or sign up.
* The home page will show your list of to-dos after you log in.


### Getting started

New Users:
* [**Sign Up**](http://todolist-9920.herokuapp.com/signup) for a new account to 
access the functionality of *To-Do List*.
* All you have to provide is a **username** and **password**. Try not to use 
the same password that you use for other accounts – this application is not 
entirely secure.
    * Do choose a unique username. It must not be the same as anyone else's.
    * **IMPORTANT**: Please remember your password. There's no way to recover it.

Existing Users:
* Head over to the [**Log In**](http://todolist-9920.herokuapp.com/login) page 
to access your account.
* Again, if you forget your password, sorry. You'll have to create a new 
account. There is no way to access the lost to-dos. (Alternatively, try 
sending an email to the system administrator to transfer your to-dos to a 
new account. Admin response is not guaranteed.)

> Note: You *can* access the log in and sign up pages if you are already 
logged in. A "Log Out" button is provided in the top right corner for your 
convenience, although you are not required to log out before switching 
accounts.


### Managing tasks

Viewing To-Dos:
* Your list of tasks is available on the [**Home**](http://todolist-9920.herokuapp.com/) 
page after log in.
* Alternatively, you may choose to view them from the **Search** page by 
selecting "Show All".

Adding a To-Do:
* Navigate to the [**Add**](http://todolist-9920.herokuapp.com/add) page.
* You will see a form where you can specify a title, details, and tag for your 
task. You must specify a title and tag for your to-do.
    * By default, the tag field will be set to 'General'. You can change it to 
any value according to your needs, but the tag must be alphanumeric.
    * You can also use the details field if 
    you need to remember other details about your task. This is optional.
* Click the "Add" button to create the to-do. The button will only be 
available after the required conditions are met.

Searching for To-Dos:
* Navigate to the [**Search**](http://todolist-9920.herokuapp.com/search) page.
* Type in a keyword or word fragment and specify whether you want to search 
to-dos by title, details, or tag. You can type part of a word (partial matches 
work). Also, searches are case-insensitive so you don't have to worry about 
capitalization.
* Click "Show All" to view all of your to-dos in a single glance.

Modifying To-Dos:
* You can modify a to-do by selecting the relevant button(s) in the to-do list. 
To-dos are modified directly from the page that you are on (**Home** or 
**Search**), so you can edit more than one to-do at the same time.
* To *edit* a to-do, select the "Edit" button. 
    * You will see a form where you can modify the title, details and/or tag 
    of the to-do. 
    * The same restrictions on titles and tags apply. Both title and tag must be 
    present, and tags should only contain alphanumeric characters.
* To *delete* a to-do, select the "Delete" button.
    * **IMPORTANT**: Be careful when doing this. Deleted to-dos cannot be retrieved.

---

## Implementation Notes

### Database 

Three tables are used to manage data: `todos`, `tags`, and `users`. The 
database schema is as follows:

    TODO: upload diagram

Notes and possible improvements:

1. As user accounts were a rather last-minute addition, the current database 
structure is not 
ideal. For instance, it is nearly impossible (or highly inefficient) to prevent 
users from viewing only tags that they are using. As such, there is some 
information leakage about other users' data (e.g. from 
[{app-URL}/api/tags](http://todolist-9920.herokuapp.com/api/tags)).
A better design would be to create a separate set of tags for each user. 

2. Although the client currently uses tags in a similar way as other to-do 
information, the database and API could allow for more efficient management 
of to-dos (e.g. retrieve from the `tags` table instead of filtering from 
`todos`).

### API

The API controller does not delete tags when an old tag is replaced by a new 
tag. As such, prolonged usage of the app without maintenance may result in the 
database being filled up with unused tags and users. A Rake task is provided 
to provide automatic clean-up of tags (can be set-up using Cron: `whenever 
--update-crontab`), however it is not being run on Heroku as using the Heroku 
scheduler requires a verified Heroku account (with credit card information).

### Front-End

The front end is built using React components, with Reach Router for routing 
and Material UI for styling.

These are the major components used and their corresponding routes, where relevant:

```
App 
|-- TodoListHome ----- /
|   |-- AppHeader
|   |-- TodosTable
|   •-- Welcome
|-- AddTodo ---------- /add
|   |-- AppHeader
|   •-- NotLoggedIn
|-- SearchTodos ------ /search
|   |-- AppHeader
|   |-- TodosTable
|   •-- NotLoggedIn
|-- Login ------------ /login
|-- Signup ----------- /signup
•-- NotFound --------- all other routes
    •-- AppHeader
```

In addition, some smaller components are used to simplify larger ones 
or reduce code duplication:

```
TodosTable
•-- EditTodoRow

AppHeader, Login, Signup
|-- HomeButton
•-- UserAvatar
```

Areas for improvement:

1. Currently, the app pulls data from the API whenever the page is refreshed, 
even when navigating between the `Home` and `Search` pages. Ideally, to-dos 
would be obtained in the main component `App`, transferred to other 
components using props and updated only when necessary (i.e. when the user 
makes changes). 

2. There is much code duplication, which could be reduced by creating abstract 
higher-level components for common functionality. For example, the `Login` and 
`Signup` have many similar elements that could be abstracted into a `UserForm`.

3. All components rely on `Box`es and `Grid`s (from Material UI) to tweak 
their layout, which makes the code hard to read and maintain.
`useStyles` and `makeStyles` (Material UI) could be used instead.

---

## Other Information

### Final Submission

Name | Matriculation number
---- | ----
Dorcas Tabitha Tan | A0190356A

Documents:
* [Write-up](/docs/final-write-up.pdf)
* [Learning journal](/docs/Journal.md)

### Using the application

To test the web application without creating a new account, you may use 
the following log in credentials:

    Username: janedoe
    Password: 9920heroku

How to test *To Do List* locally:

1. In development mode: run `foreman start -f Procfile.dev`
<!-- 2. In production mode: run `rails s -e production` (doesn't seem to work now) -->
<!-- 3. In test mode: -->

Software-related information:

* Ruby version
    * Ruby 2.6.5
* System dependencies
    * Rails 6.0.0
    * React 16.12.0
    * [JSONAPI::Resources](https://github.com/cerebris/jsonapi-resources) 
    0.10.2 – for creating the Rails server API
    * [Reach Router](https://github.com/reach/router) – to handle routing on 
    the React front-end
    * [Formik](https://github.com/jaredpalmer/formik) – for formatting (React)
    form data according to JSON API specifications
    * [Material UI](https://github.com/mui-org/material-ui) (core, icons) 
    – for easy styling
    * [bcrypt-ruby](https://github.com/codahale/bcrypt-ruby) – for securing 
    user passwords in Rails
    * [whenever](https://github.com/javan/whenever) – for scheduling Cron jobs
    with a clear syntax (not used in Heroku deployment)
<!-- * Configuration
* Database creation
* Database initialization
* How to run the test suite
    * Run `rails test`
* Services (job queues, cache servers, search engines, etc.)
* Deployment instructions
* ... -->
