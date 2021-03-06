// Generated by CoffeeScript 1.7.1
(function() {
  define(['jquery', 'ani', 'parallax', 'TweenMax'], function($, Ani) {
    var Page, cloud, i, page, parallaxCollection, star, wave, _i, _j, _k, _ref, _ref1, _ref2;
    Page = (function() {
      function Page(listofDiv) {
        this.listofDiv = listofDiv != null ? listofDiv : [];
        this.data = {};
        this.ratio = {};
        this.bindEvents();
      }

      return Page;

    })();
    Page.prototype.getDivData = function(className) {
      var $dom, _ref;
      $dom = $("." + className);
      if ($dom.length === 0) {
        console.log("Div with class " + className + " doesn't exist.");
      }
      return this.data[className] = {
        height: $dom.height(),
        offsetTop: (_ref = $dom.offset()) != null ? _ref.top : void 0
      };
    };
    Page.prototype.getDivRatio = function(className) {
      return this.ratio[className] = this.calRatio(className);
    };
    Page.prototype.calRatio = function(className) {
      var a, b, c, ratio;
      a = this.data[className].offsetTop;
      c = this.data[className].height;
      b = window.height;
      return ratio = scrollY / (b + c) + (b - a) / (b + c);
    };
    Page.prototype.bindEvents = function() {
      var keys, scroll;
      $(document).on('resize', (function(_this) {
        return function() {
          var className, _i, _len, _ref, _results;
          window.height = $(window).height();
          _ref = _this.listofDiv;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            className = _ref[_i];
            _results.push(_this.getDivData(className));
          }
          return _results;
        };
      })(this));
      keys = [37, 38, 39, 40, 32, 33, 34, 35, 36];
      $(document).on('keydown', (function(_this) {
        return function(e) {
          var key, _i, _len, _results;
          _results = [];
          for (_i = 0, _len = keys.length; _i < _len; _i++) {
            key = keys[_i];
            if (e.keyCode === key) {
              _results.push(e.preventDefault());
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this));
      scroll = {
        y: 0
      };
      $(document).on('mousewheel', (function(_this) {
        return function(e) {
          if (_this.firstScrollDone === void 0) {
            TweenMax.to($('.scroll-down'), 0.8, {
              autoAlpha: 0,
              onComplete: function() {
                return _this.firstScrollDone = true;
              }
            });
          }
          e.preventDefault();
          return TweenMax.to(scroll, 0.7, {
            y: window.scrollY - e.originalEvent.wheelDelta,
            ease: Power3.easeOut,
            onUpdate: function() {
              return window.scroll(0, scroll.y);
            }
          });
        };
      })(this));
      return $(document).on('scroll', (function(_this) {
        return function(e) {
          var className, i, _i, _j, _k, _l, _len, _ref, _ref1, _ref2, _ref3, _results;
          _ref = _this.listofDiv;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            className = _ref[_i];
            _this.getDivRatio(className);
          }
          for (i = _j = 0, _ref1 = Ani.numberOfStars; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            parallaxCollection.stars[i].seek(_this.ratio['stars']);
          }
          parallaxCollection.moon.seek(_this.ratio['moon']);
          for (i = _k = 0, _ref2 = Ani.numberOfClouds; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            parallaxCollection.clouds[i].seek(_this.ratio['moon']);
          }
          parallaxCollection.sun.seek(_this.ratio['ocean']);
          _results = [];
          for (i = _l = 0, _ref3 = Ani.numberOfWaves; 0 <= _ref3 ? _l < _ref3 : _l > _ref3; i = 0 <= _ref3 ? ++_l : --_l) {
            _results.push(parallaxCollection.waves[i].seek(_this.ratio['ocean']));
          }
          return _results;
        };
      })(this));
    };
    page = new Page(['stars', 'moon', 'ocean']);
    parallaxCollection = {};
    parallaxCollection.stars = [];
    for (i = _i = 0, _ref = Ani.numberOfStars; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      $('.stars').append("<div class='star'></div>");
      star = new Parallax($('.star').eq(i), Ani.stars[i]);
      parallaxCollection.stars.push(star);
    }
    parallaxCollection.moon = new Parallax($('.moon .orb'), Ani.moon);
    parallaxCollection.clouds = [];
    for (i = _j = 0, _ref1 = Ani.numberOfClouds; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      cloud = new Parallax($('.moon .cloud').eq(i), Ani.clouds[i]);
      parallaxCollection.clouds.push(cloud);
    }
    parallaxCollection.sun = new Parallax($('.ocean .sun'), Ani.sun);
    parallaxCollection.waves = [];
    for (i = _k = 0, _ref2 = Ani.numberOfWaves; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
      wave = new Parallax($('.ocean .wave').eq(i), Ani.waves[i]);
      parallaxCollection.waves.push(wave);
    }
    scroll(0, 0);
    $(document).trigger('resize');
    return $(document).trigger('scroll');
  });

}).call(this);

//# sourceMappingURL=main.map
