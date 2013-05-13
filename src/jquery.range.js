/*
 * range
 * https://github.com/amazingSurge/jquery-range
 *
 * Copyright (c) 2013 joeylin
 * Licensed under the MIT license.
 */

(function($) {

    // Pointer constuctor
    function Pointer($element, id, parent) {
        this.$element = $element;
        this.uid = id;
        this.parent = parent;
        this.options = this.parent.options;
        this.value = null;
        this.direction = '';

        this.init();
    }
    Pointer.prototype = {
        constructor: Pointer,
        init: function() {

            if (this.options.vertical === 'v') {
                this.direction = 'top';
                this.mouse = 'pageY';
                this.max = this.parent.height;
            } else {
                this.direction = 'left';
                this.mouse = 'pageX';
                this.max = this.parent.width;
            }

            this.$element.on('mousedown', $.proxy(this.mousedown, this));
        },

        mousedown: function(event) {
            var limit = {},
                offset = this.parent.$element.offset();    

            this.data = {};
            this.data.start = event[this.mouse];
            this.data[this.direction] = event[this.mouse] - offset[this.direction];

            this.mousemove = function(event) {
                var value = this.data[this.direction] + ( event[this.mouse] || this.data.start ) - this.data.start;

                if (this.parent.options.limit === true) {

                    limit = this.limit();

                    if (value < limit.left) {
                        value = limit.left;
                    }
                    if (value > limit.right) {
                        value = limit.right;
                    }

                } 

                this._set(value);
                return false;
            };

            this.mouseup = function(event) {

                $(document).off({
                    mousemove: this.mousemove,
                    mouseup: this.mouseup
                });

                if (typeof this.parent.options.callback === 'function') {
                    this.parent.options.callback(this);
                }

                this.$element.trigger('end', this);

                return false;
            };

            $(document).on({
                mousemove: $.proxy(this.mousemove, this),
                mouseup: $.proxy(this.mouseup, this)
            });

            return false;
        },

        // @value number the position value
        _set: function(value) {

            var actualValue,
                posValue,
                position = {};

            if (value < 0 ) {
                value = 0;
            }

            if (value > this.max) {
                value = this.max;
            }

            if (this.parent.options.step > 0) {
                actualValue = this.getActualValue(value);
                posValue = this.step(actualValue);
            } else {
                console.log(value)
                posValue = value;
            }

            

            // make sure to redraw only when value changed 
            if (posValue !== this.value) {

                position[this.direction] = posValue;
                this.$element.css(position);
                this.value = posValue;

                if (typeof this.parent.options.onChange === 'function') {
                    this.parent.options.onChange(this);
                }

                this.$element.trigger('change', this);
            }
        },

        // get postion value
        // @param {value} number the actual value
        getPosValue: function(value) {

            // here value = 0  change to false
            if (value !== undefined) {
                return value / this.parent.interval * this.max;
            } else {
                return this.value;
            }
            
        },

        // get actual value
        // @value number the position value
        getActualValue: function(value) {
            return value / this.max * this.parent.interval + this.parent.start;
        },

        // step control
        // @value number the position value
        // return position value
        step: function(value) {
            var value,
                step = parseInt(this.options.step);

            if (step > 0) { 
                value =  Math.round( value / step ) * step;
            } 

            return this.getPosValue(value);
        }, 

        // limit pointer move range
        limit: function() {
            var left,right;

            if (this.uid === 1) {
                lfet = 0;
            } else {
                left = this.parent.pointer[this.uid - 2].getPosValue();
            }

            if (this.parent.pointer[this.uid]) {
                right = this.parent.pointer[this.uid].getPosValue();
            } else {
                right = this.max;
            }

            return {
                left: left,
                right: right
            }
        },

        // public method     
        
        // @value number the actual value
        set: function(value) {
            value = this.getPosValue(value);
            this._set(value);
        },

        // reutrn actual value
        get: function() {
            var value = this.getActualValue(this.value);
            return this.options.format(value);
        }
    }; 

    // main constructor
    var Range = $.range = function(element, options) {

        this.element = element;
        this.$element = $(element).css({postion: 'relative'});

        this.options = $.extend({}, Range.defaults, options);
        this.namespace = this.options.namespace;
        this.components = $.extend(true, {}, this.components);

        // public properties
        this.value = this.options.value;
        this.start = this.options.range[0];
        this.end = this.options.range[1];
        this.interval = this.end - this.start;

        // flag
        this.initial = false;

        this.$element.addClass(this.namespace).addClass(this.namespace + '-' + this.options.skin);

        this.init();
    };

    Range.prototype = {
        constructor: Range,
        components: {},

        init: function() {
            var self = this;

            this.pointer = [];
            this.width = this.$element.width();
            this.height = this.$element.height();

            this.$bar = $('<span class="range-bar"></span>').appendTo(this.$element);

            for (var i = 1; i <= this.options.pointer; i++) {
                var $pointer = $('<span class="' + this.namespace +'-pointer"></span>').appendTo(this.$element);
                var p = new Pointer($pointer, i, this);

                this.pointer.push(p);
            }

            this.$bar.css({
                postion: 'absolute'
            });

            // alias of every pointer
            this.p1 = this.pointer[0];
            this.p2 = this.pointer[1];

            // initial components

            this.components.view.init(this);

            if (this.options.tip !== false) {
                this.components.tip.init(this);
            }
            if (this.options.scale === false) {
                this.components.scale.init(this);
            }

            // initial pointer value
            this.setValue(this.value);
            this.$element.on('click', function(event) {
                // todo
            }); 

            this.initial = true;
        },

        getValue: function() {
            var value;

            // 

            return value;  
        },

        // @value Aarry  the actual value
        setValue: function(value) {
            $.each(this.pointer, function(i, p) {
                p.set(value[i]);
            });

            this.value = value;
        },

        setInterval: function(start, end) {
            this.start = start;
            this.end = end;
            this.interval = end - start;
        },

        enable: function() {},
        disable: function() {}
    };

    Range.defaults = {
        namespace: 'range',
        skin: 'simple',

        range: [0,100],
        value: [0,20],
        step: 10,

        pointer: 2,
        limit: true,
        orientation: 'v', // 'v' or 'h'

        // components
        tip: true,
        scale: false,

        // custom value format
        // @value number  origin value
        // return a formatted value
        format: function(value) {

            // to do

            return value;
        },

        // on state change
        onChange: function() {},

        // on mouse up 
        callback: function() {}
    };

    Range.registerComponent = function (component, methods) {
        Range.prototype.components[component] = methods;
    };

    $.fn.range = function(options) {
        if (typeof options === 'string') {
            var method = options;
            var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

            return this.each(function() {
                var api = $.data(this, 'range');
                if (typeof api[method] === 'function') {
                    api[method].apply(api, method_arguments);
                }
            });
        } else {

            return this.each(function() {
                if (!$.data(this, 'range')) {
                    $.data(this, 'range', new Range(this, options));
                }
            });
        }
    };

     

    Range.registerComponent('tip', {
        defaults: {
            active: 'always', // 'always' 'onmove'
        },
        init: function(instance) {
            var self = this,
                opts = $.extend({},this.defaults,instance.options.tip);

            this.opts = opts;

            this.tip = [];
            $.each(instance.pointer, function(i,p) {
                var $tip = $('<span class="range-tip"></span>').appendTo(instance.pointer[i].$element);
                
                if (self.opts.active === 'onmove') {
                    $tip.css({display: 'none'});
                    p.$element.on('change', function(e, pointer) {
                        $tip.text(pointer.get());

                        if (instance.initial === true) {
                            self.show();
                        }                       
                    });

                    p.$element.on('end', function(e, pointer) {
                        self.hide();
                    });

                } else {
                    p.$element.on('change', function(e, pointer) {
                        $tip.text(pointer.get());
                    });
                }

                // p.$element.on('change', function(e, pointer) {
                //     $tip.text(pointer.get());
                // });


                self.tip.push($tip);
            });
        },
        show: function() {
            $.each(this.tip, function(i,$tip) {
                $tip.show('slow');
            });
        },
        hide: function() {
            $.each(this.tip, function(i,$tip) {
                $tip.hide('slow');
            });
        }
    });
    Range.registerComponent('view', {
        defaults: {},
        init: function(instance) {
            var self = this;
            this.$arrow = $('<span class="range-view"></span>').appendTo(instance.$element);

            if (instance.pointer.length === 1) {
                instance.pointer[0].$element.on('change', function(e, pointer) {
                    var left = 0,
                        right = pointer.getPosValue();

                    self.$arrow.css({
                        left: 0,
                        width: right -left
                    })    
                });
            }

            if (instance.pointer.length === 2) {

                instance.pointer[0].$element.on('change', function(e, pointer) {
                    var left = pointer.getPosValue(),
                        right = instance.pointer[1].getPosValue();

                    self.$arrow.css({
                        left: Math.min(left, right),
                        width: Math.abs(right - left)
                    })
                });
                instance.pointer[1].$element.on('change', function(e, pointer) {
                    var right = pointer.getPosValue(),
                        left = instance.pointer[0].getPosValue();

                    self.$arrow.css({
                        left: Math.min(left, right),
                        width: Math.abs(right - left)
                    });    
                });
            }
        },
    });
    Range.registerComponent('scale', {
        defaults: {
            scale: [0, 50, 100]
        },
        init: function(instance) {
            var self = this,
                opts = $.extend({},this.defaults,instance.options.tip),
                len = opts.scale.length;
                

            this.$scale = $('<ul class="range-scale"></ul>');

            $.each(opts.scale, function(i,v) {
                var left,
                    $li = $('<li>' + v +'</li>');

                $li.css({
                    left: i / (len - 1) * 100 + '%'
                });

                $li.appendTo(self.$scale);

            });

            this.$scale.appendTo(instance.$element);


        },
    });

}(jQuery));
