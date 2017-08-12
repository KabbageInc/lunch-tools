# lunch-tools

MEAN stack application that stores lunch menus, performs translations, tracks ratings, and more. Born from the loving nicknames we give our daily catered lunches at [Kabbage](https://www.kabbage.com/) and a desire to learn a new application stack.

## Using It

### Web App
[AngularJS](https://angularjs.org/) app built using [Gulp](http://gulpjs.com/). Demonstrates API functionality using fun pages like "Show Me Lunch."

### API
Restful API is an [Express](http://expressjs.com/) application. Endpoints:
* `/api/v2/lunches`
  * `GET` - Array containing basics of all lunches
  ```
  [
      {
        date: "2015-07-21",
        menu: "Tacos; Rice; Churros"
      },
      ...
  ]
  ```
  * `POST` (date, menu) - Create a new lunch. Accepts single lunch in url encoded form data or JSON array of lunches.
* `/api/v2/lunches/YYYY-MM-DD`
  * `GET` - Full details about the specified lunch
  ```
  {
      date: "2015-07-21",
      menu: "Tacos; Rice; Churros",
      image: "https://imgur.com/gallery/6sTMEWA",
      ratings:
      [
        {
          date: "2015-07-21",
          name: "Andrew",
          message: "The churros were so good that I ate 12!",
          createDate: "2015-07-21T16:32:26+00:00"
        },
        ...
      ],
      comments:
      [
        {
          date: "2015-07-21",
          rating: 1,
          createDate: "2015-07-21T16:01:08+00:00"
        },
        ...
      ]
  }
  ```
  * `PUT` (menu field only) - update existing lunch
  * `DELETE`
* `/api/v2/lunches/YYYY-MM-DD/ratings`
  * `POST` (date, rating) - Add an Up Vote/Down Vote style rating (1 or -1).
* `/api/v2/lunches/YYYY-MM-DD/comments`
  * `POST` (name, message) - add a comment. name is optional

## Development

Pull requests for bug fixes or new functionality welcome! Follow these instructions to get up and running.

### Database Setup
__Coming Soon__


### Local development with browser-sync
The dev script will auto-reload the browser when client changes are made, and restart the API when server changes are made

```
npm i
npm run dev
```

## Deployment

The app is now intended to be deployed as a Docker container. The Node.js server is listening on port 3000 serving both API and client app. Supervisor is configured to monitor it.

Docker-Compose file also provided for local development with port 80 and environment variables mapped.
