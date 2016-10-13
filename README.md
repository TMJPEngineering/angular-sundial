# Angular Sundial
A simple angular service that enhances the date object functionality of javascript to provide a more easy and robust api for getting the date and time

## Installation
1. Download this and extract it to your project folder
2. Make sure to include angular.js and angular-sundial.js to your index page

  ```html
  <script src="angular.js"></script>
  <script src="angular-sundial.js"></script>
  ```

3. Add the ngDraggable module to your main angular module

  ```javascript
  angular.module('myApp', ['ngSundial']);
  ```

## Demo
After installation, just open the index.html to view the demo page

## Usage
Just inject the sundial service in your controller and call the available apis

```javascript
app.controller('MainController', function (sundial) {
  var date = "Oct 30, 2016 11:15 PM";
  console.log('Date:', sundial.getDate(date));
});
```

## TODO
- API Documentation
- Unit test

