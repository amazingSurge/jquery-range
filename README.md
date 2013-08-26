# jQuery range

The powerful jQuery plugin that creates a series of progress bar. <a href="http://amazingsurge.github.io/jquery-range/">Project page and demos</a><br />
Download: <a href="https://github.com/amazingSurge/jquery-range/archive/master.zip">jquery-range-master.zip</a>

***

## Features

* **Different styles support** — range provides a variety of progress bar for user
* **Lightweight size** — 1 kb gzipped

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.83+</a>

## Usage

Import this libraries:
* jQuery
* jquery-range.min.js

And CSS:
* range.css - desirable if you have not yet connected one


Create base html element:
```html
    <div class="example">
        <div class="range-single"></div>
    </div>
```

Initialize range:
```javascript
$(".range-single").range({skin: 'skin-1'});
```

Or you can also use <code>input</code>
```html
    <div class="example">
        <form method="post">
            <input class="range-input" type="range" min="0" max="10" name="points" step="0.01" />
            <button class="submit">submit</button>
        </form>
    </div>
```

Initialize range:
```javascript
$(".range-input").range({skin: 'skin-1'});
```

Or initialize tabs with custom settings:
```javascript

$(".range-single").range({
        namespace: 'range',
        skin: null,
        max: 100,
        min: 0,
        value: [0, 20],
        step: 10,
        pointer: 2,
        limit: true,
        orientation: 'v',
        tip: true,
        scale: false,
        format: function(value) {
            return value;
        },
        onChange: function(instance) {},
        callback: function() {}
});
```

the most important thing is you should set skin value to let plugin load specified skin file

## Settings

```javascript
{   

    // Optional property, Set a namespace for css class
    namespace: 'range',
    
    //Compulsory property, set transition effect, it works after you load specified skin file
    skin: null,

    //Optional property, set the maximum for range
    max: 100,

    //Optional property, set the minmum for range
    min: 0,

    //Optional property, set the initial position for the range pointer
    value: [0,20],

    //Optional property, set the moving step for pointer
    step: 10,

    //Optional property, set the number of pointer
    pointer: 2,

    //Optional property, if true restrictions on the movement of the pointer
    limit: true,

    //Optional property, set the direction for range ,'v' for vertical and 'h' for horizontal
    orientation: 'v',

    //Optional property, if true, the component of tip will display and follow the pointer
    tip: true,

    //Optional property, if false, the component of scale will be initialized
    scale: false,

    //Optional property, a function of formatting output
    format: function(value) {
        return value;
    },

    //Optional property, according to your need, it can be as a function of the extended interface
    onChange: function() {},

    //Optional property, if it's a funciton, will be called when mouseup
    callback: function() {}
}
```

## Public methods

jquery range has different methods , we can use it as below :
```javascript

// get the value of pointer
$(".range-single").range("getValue");

// set value
$(".range-single").range("setValue");

// set the range of the progree bar
$(".range-single").range("setInterval");

// add a enable class to range element
$(".range-single").range("enable");

// remove enable class
$(".range-single").range("disable");

// remove range Dom emement and unbound all events 
$(".range-single").range("destroy");

```

## Event / Callback

* <code>change</code>: trigger when the position of pointer is changed
* <code>end</code>: trigger when mouse up

how to use event:
```javascript
p.$element.on('change', function(e, pointer) {
    // pointer means current pointer 
    // some stuff
});
```

## Browser support
jquery-range is verified to work in Internet Explorer 7+, Firefox 2+, Opera 9+, Google Chrome and Safari browsers. Should also work in many others.

Mobile browsers (like Opera mini, Chrome mobile, Safari mobile, Android browser and others) is coming soon.

## Changes

| Version | Notes                                                            |
|---------|------------------------------------------------------------------|
|   0.3.x | ([compare][compare-1.3]) add scale function                    |
|   0.2.x | ([compare][compare-1.2]) add view function                    |
|   0.1.x | ([compare][compare-1.1]) add tip function                   |
|     ... | ...                                                              |

[compare-1.3]: https://github.com/amazingSurge/jquery-range/compare/v1.3.0...v1.4.0
[compare-1.2]: https://github.com/amazingSurge/jquery-range/compare/v1.2.0...v1.3.0
[compare-1.1]: https://github.com/amazingSurge/jquery-range/compare/v1.1.0...v1.2.0
## Author
[amazingSurge](http://amazingSurge.com)

## License
jQuery-range plugin is released under the <a href="https://github.com/amazingSurge/jquery-range/blob/master/LICENCE.GPL" target="_blank">GPL licence</a>.


