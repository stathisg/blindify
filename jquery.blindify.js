/*!
 * Blindify - jQuery Plugin - v0.2.0
 * https://github.com/stathisg/blindify
 *
 * Copyright 2014 Stathis Goudoulakis
 * Released under the MIT license
 */
 (function($){
    images = new Array();
    urls = new Array();
    activeImage = 0;
    blinds = null;
    el = null;

    defaultOptions = {
        numberOfBlinds: 20,
        slideVisibleTime: 2000,
        color: '#000000',
        margin: 2,
        width: 960,
        height: 600,
        gap: 100,
        animationSpeed: 800,
        delayBetweenSlides: 500,
        hasLinks: false,
        orientation: 'vertical',
        startClosed: false,
        firstOpenDelay: 500
    };

    options = {};

    $.blindify = function(element, userOptions) {
        el = element;
        var $el = $(el);

        options = $.extend({}, defaultOptions, userOptions);

        $('ul li', el).each(function() {
            var tempEl = $(this);
            if(options.hasLinks) {
                urls.push(tempEl.children('a')[0].href);
            }
            images.push(tempEl);
        });

        images[0].addClass('active');

        if(options.hasLinks) {
            var masterA = document.createElement('a');
            masterA.href = urls[0];
            $el.prepend(masterA);
            var movingElements = $('ul', el).detach();
            $(masterA).append(movingElements);
            el = masterA;
            $el = $(el);
        }

        $el.addClass('blindify')
           .width(options.width)
           .height(options.height);
        $('img', el).width(options.width)
                    .height(options.height);

        var spanWidth = 0;
        var spanHeight = 0;

        if(options.orientation === 'vertical') {
            spanWidth = options.width / options.numberOfBlinds;
        } else {
            spanHeight = options.height / options.numberOfBlinds;
        }

        for (var i = 0; i < options.numberOfBlinds; i++) {
            var tempEl = $(document.createElement('span'));
            var borders;
            if(options.startClosed) {
                if(options.orientation === 'vertical') {
                    borders = {borderWidthTop: options.height / 2, borderWidthBottom: options.height / 2};
                } else {
                    borders = {borderWidthTop: options.width / 2, borderWidthBottom: options.width / 2};
                }
            } else {
                borders = calculateBorders();
            }

            if(options.orientation === 'vertical') {
                tempEl.css({
                    'left': i * spanWidth,
                    border: options.margin + 'px solid ' + options.color,
                    borderTop: borders.borderWidthTop + 'px solid ' + options.color,
                    borderBottom: borders.borderWidthBottom + 'px solid ' + options.color,
                    'height': options.height,
                    'width': spanWidth
                });
            } else {
                tempEl.css({
                    'top': i * spanHeight,
                    border: options.margin + 'px solid ' + options.color,
                    borderRight: borders.borderWidthTop + 'px solid ' + options.color,
                    borderLeft: borders.borderWidthBottom + 'px solid ' + options.color,
                    'height': spanHeight,
                    'width': options.width
                });
            }

            $el.prepend(tempEl);
        };

        blinds = $('span', el);

        if(options.startClosed) {
            $el.delay(options.firstOpenDelay).queue(function(next) {
                $.each(blinds, function(index, value) {
                    var borders = calculateBorders();
                    var animationProperties = getAnimationProperties(borders);
                    $(value).animate(animationProperties, options.animationSpeed);
                });
                next();
            });
        }

        $el.delay(options.slideVisibleTime).queue(function(next) {
            animateBorders();
            next();
        });
    };

    function calculateBorders() {
        var random = Math.floor((Math.random()*9)+1);
        var borderWidthTop = (random / 10) * options.gap;
        var borderWidthBottom = options.gap - borderWidthTop;

        return {borderWidthTop: borderWidthTop, borderWidthBottom: borderWidthBottom};
    }

    function getAnimationProperties(borders)
    {
        var animationProperties;

        if(options.orientation === 'vertical') {
            if(borders === null) {
                animationProperties = {
                    borderTopWidth: options.height / 2,
                    borderBottomWidth: options.height / 2
                };
            } else {
                animationProperties = {
                    borderTopWidth: borders.borderWidthTop,
                    borderBottomWidth: borders.borderWidthBottom
                };
            }
        } else {
            if(borders === null) {
                animationProperties = {
                    borderRightWidth: options.width / 2,
                    borderLeftWidth: options.width / 2
                };
            } else {
                animationProperties = {
                    borderRightWidth: borders.borderWidthTop,
                    borderLeftWidth: borders.borderWidthBottom
                };
            }
        }

        return animationProperties;
    }

    function animateBorders() {
        var changeOccuredOnce = false;
        var animationProperties = getAnimationProperties(null);

        blinds.animate(animationProperties, options.animationSpeed, function() {
            if(!changeOccuredOnce) {
                images[activeImage].removeClass('active');
                activeImage = (activeImage + 1) % images.length;
                images[activeImage].addClass('active');
                if(options.hasLinks) {
                    el.href = urls[activeImage];
                }
                setTimeout(animateBorders, options.slideVisibleTime + options.animationSpeed);
                changeOccuredOnce = true;
            }

            var borders = calculateBorders();
            animationProperties = getAnimationProperties(borders);

            $(this).delay(options.delayBetweenSlides).animate(animationProperties, options.animationSpeed);
        });
    }

    $.fn.blindify = function(userOptions) {
        return this.each(function() {
            new $.blindify(this, userOptions);
        });
    };
})(jQuery);