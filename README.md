## Data Representation and Querying Project 2016

This repository contains code and information for a third-year undergraduate project for the module **Data Representation and Querying**.
The module is taught to undergraduate students at [GMIT](http://www.gmit.ie) in the Department of Computer Science and Applied Physics.
The lecturer is [Ian McLoughlin](https://ianmcloughlin.github.io).

### Project Overview
I have created a Single-Page Web Application (SPA) that lets users create character sheet for Dungeons and Dragons (the pen and paper game).Initially, I intended to create a full-blown game, but the scope of the project proved to be way to ambitious so I decided to do something more achievable and that I can use.

The project was guided by the following excerpt from the project instructions:
>You are required to develop a single-page web application(SPA) written in the programming language Python using the Flask framework. You must devise an idea for a web application, write the software, write documentation explaining how the application works, and write a short user guide for it.

### How to run the application
The application is written using the [Flask](http://flask.pocoo.org/) library in [Python 3](https://www.python.org).
Both must be installed to run the project.

I use the [mongodb](https://www.mongodb.com/) package for persistence in the application.
This must also be installed. In order to use mongo in conjunction with flask it is necessary to install flask-pymongo. It can be installed using pip.

```bash
$ pip install flask_pymongo
```

Also the database is required. By default the database in this app is hosted on the cloud at [mLab](https://mlab.com/).
A script has been added to generate the database locally if required. To change where the application looks for the database you only have to change it in the python file (It is explained in the comments). To run the scrip simply type:

```bash
$ mongo setup_db.js
```
Once these prerequisites are installed, the application can be run locally:
```bash
$ python dndCC.py
```
Once the application is running, it can be accessed by pointing your browser at http://127.0.0.1:5000/ .

### How to use the application

Once the application is running, it will, by default, load the home page explaining what the application is for and how to use it. On top of the page, under the DnD Image there is a navigation bar with three different options:
- Home: Will return you to the home page.
- Character Creation will bring you to the editor itself.
- About: Small legal text regarding the ownership of dungeons and dragons and its assets and a small explication about the project and who developed it.

### Character Creation.

#### Details

The first page to load will be details. In details you can do the following:
- Name your character.
- Choose an alignment from the dropdown.
- Set the player's name.
- A one or two-words background definition.
- Roll the dice and set the values for each attributes from the results. Once a value is assigned there is no way to change it. Each value can be assigned only once. Unlike the previous data this will be save on set.

#### Race/Class      

Clicking in any race or class will show the description and traits for that specific race/class.
Only one race and one class may be selected at one time. They can be changed as many times as you like.

#### Character Sheet

Clicking on Character Sheet will display the character sheet with the selections made. Every time a change is made you can lick on Character Sheet to redo it. You can right-click on the image to save it to your device and print it later.
    
### Known Bugs
  
  - Sometimes Character Sheet doesn't load the image the first time. Clicking a second times loads the image.
  
### Architecture
This web application runs in [Python 3](https://www.python.org) using the [Flask](http://flask.pocoo.org/) web micro-framework, javascript using JQuery and uses mongoDB as a database.
Python 3 and Flask were requirements for the project, but mongoDB was selected by its ease of use.

This web application follows the MVC principles:
- The view sends the controller the orded.
- The controller manages the logic of the application, requesting data from the model when needed.
- The model stores the data and requests it from the database when needed.


### Final Thoughts & General Info

  - I wrote the code trying to implement the different functionalities, without any regard for the structure. It took me a while to restructure all the code to fit MVC. A bit more of design upfront in that aspect would have been better.
  - ClassesDB and RacesDB contain single elements of each class for templating purposes. Files not required for application running.


