# Blindify

Blindify is a **jQuery plugin** which creates a **slideshow** featuring a blinds effect transitioning (either vertical or horizontal) between a list of images. Have a look at the [demo](http://burnmind.com/demos/blindify).

![blindify demo](https://raw.github.com/stathisg/blindify/master/demos/blindify-demo.gif)

## Requirements

jQuery 1.4+

## Browser support

*Tested* in the following browsers:

* Google Chrome 29+
* Mozilla Firefox 21+
* Opera 12+
* Microsoft Internet Explorer 9+
* Safari 5+

## Usage

First of all, you have to include Blindify's CSS file (or just copy and paste the code to one of your own), include a version of the jQuery library, and anywhere after jQuery, either the full or the minified version of Blindify. For example:

```html
<link rel="stylesheet" href="blindify.css" media="all" />
<script type="text/javascript" src="jquery-1.10.2.min.js"></script>
<script type="text/javascript" src="jquery.blindify.js"></script>
```

Afterwards, you'll need a list of images, wrapped in a container element with a unique id. For example:

```html
<div id="blindify">
    <ul>
        <li><img src="photo_1.jpg" alt="" /></li>
        <li><img src="photo_2.jpg" alt="" /></li>
        <li><img src="photo_3.jpg" alt="" /></li>
        <li><img src="photo_4.jpg" alt="" /></li>
    </ul>
</div>
```

You can make the whole slideshow be a link to a specific page, by using an anchor element as the container, e.g.:

```html
<a href="#" id="blindify">
    <ul>
        <li><img src="photo_1.jpg" alt="" /></li>
        <li><img src="photo_2.jpg" alt="" /></li>
        <li><img src="photo_3.jpg" alt="" /></li>
        <li><img src="photo_4.jpg" alt="" /></li>
    </ul>
</a>
```

If you wish every image to point to a unique URL, you just have to specify an option while initialising the plugin, and format your code as follows:

```html
<div id="blindify">
    <ul>
        <li><a href="#"><img src="photo_1.jpg" alt="" /></a></li>
        <li><a href="#"><img src="photo_2.jpg" alt="" /></a></li>
        <li><a href="#"><img src="photo_3.jpg" alt="" /></a></li>
        <li><a href="#"><img src="photo_4.jpg" alt="" /></a></li>
    </ul>
</div>
```

Finally, to apply Blindify to your HTML code, you'll just need to initialise it and attach it to the element acting as the container, e.g.:

```html
<script type="text/javascript">
    $(document).ready(function(){
        $('#blindify').blindify();
    });
</script>
```

You can override the default options of the plugin, like that:

```html
<script type="text/javascript">
    $(document).ready(function(){
        $('#blindify').blindify({
            numberOfBlinds: 10,
            animationSpeed: 600,
            delayBetweenSlides: 200
        });
    });
</script>
```

You can find a list of the available options in the next section.

# Configuration Options

`numberOfBlinds` (integer) — *default: 20*  
The total number of blinds.

`slideVisibleTime` (integer) — *default: 2000*  
Controls the time that a slide will be visible (excluding the animation time), in milliseconds (ms).

`color` (string) — *default: '#000000'*  
The HEX code of the colour of the blinds.

`margin` (integer) — *default: 2*  
Controls the distance between the blinds, in pixels. Note that it's the border size of each individual blind, therefore if you choose 1, the total distance is going to be 2 (one for each blind), etc.

`width` (integer) — *default: 960*  
The width of the container (should be the same as the images), in pixels.

`height` (integer) — *default: 600*  
The height of the container (should be the same as the images), in pixels.

`gap` (integer) — *default: 100*  
The total gap of the slides from the edges of the container, in pixels. The individual gaps are calculated randomly.

`animationSpeed` (integer) — *default: 100*  
Controls the speed of the animation that opens/closes the blinds, in milliseconds (ms).

`delayBetweenSlides` (integer) — *default: 500*  
Controls a small delay between animating the blinds to their open state, in milliseconds (ms).

`hasLinks` (boolean) — *default: false*  
Set to `true`, when there are individual links for every image.

`orientation` (string) — *default: 'vertical'*  
The orientation of the blinds; it can be either `vertical` or `horizontal`.

`startClosed` (boolean) — *default: false*  
Set to `true` to start with the blinds closed.

`firstOpenDelay` (integer) — *default: 500*  
Controls the delay before the blinds are opened for the first time, when `startClosed` is set to `true`; in milliseconds (ms).