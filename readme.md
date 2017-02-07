# Analyst

## Introduction

Analyst is a small helper library to make it easier to start using tracking with google analytics and more specifically for event tracking.

Analyst is based on Scientist by Jason Rhodes.

## Usage

Analyst is designed to be easy to use, so here's how to do it.
There's also an example partial in the examples folder.

### Initialize analyst and start the basic page tracking

```javascript
var analyst = new Analyst();
analyst.initialize('{{env('GOOGLE_ANALYTICS')}}').trackPageview();
analyst.trackEvents();
analyst.requireAutotrackAll();
```

We use an environment variable in Laravel to inject the analytics code, to make this snippet completely reusable.


### Track events

The main goal of Analyst is to make event tracking easy as pie. (or any other pastry you might prefer).
We have set up some predefined tracker so you can throw a class on an element an it will be tracked.

Current predefined trackers include: 
- .locale_track
- .reveal_track
- .button_track
- .track                              

If you use one of the first three you're ready to go as is, but it still allows you to specify data-analyst-label on the element to set your own label.
The .track class requires some data attributes: 
- data-analyst-label
- data-analyst-category
- data-analyst-action
