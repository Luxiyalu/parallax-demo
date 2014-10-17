// Generated by CoffeeScript 1.7.1
(function() {
  define(['jquery', 'parallax', 'TweenMax'], function($) {
    var Ani, h, i, keyframes, r, _i, _j, _ref, _ref1;
    Ani = {};
    Ani.stars = [];
    Ani.numberOfStars = 100;
    h = $('.stars').height();
    for (i = _i = 0, _ref = Ani.numberOfStars; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      keyframes = [];
      r = Math.random();
      keyframes.push({
        ratio: 0,
        frame: {
          y: 3 * h * Math.random() - 500,
          left: "" + (100 * Math.random()) + "%",
          scale: 0.5 + 0.5 * r,
          opacity: 0.2 + 0.8 * Math.random(),
          rotation: 360 * Math.random(),
          ease: Linear.ease
        }
      });
      keyframes.push({
        ratio: 1,
        frame: {
          x: 300 * (Math.random() - 0.5),
          y: 1 * h * (1 - r),
          scale: .6 + 0.5 * (Math.random() - .5),
          rotation: 2000 * (Math.random() - .5)
        }
      });
      Ani.stars.push(keyframes);
    }
    keyframes = [];
    keyframes.push({
      ratio: 0,
      frame: {
        y: 50,
        rotation: 20
      }
    });
    keyframes.push({
      ratio: 1,
      frame: {
        y: -50,
        rotation: -20
      }
    });
    Ani.moon = keyframes;
    Ani.clouds = [];
    Ani.numberOfClouds = 3;
    keyframes = [];
    keyframes.push({
      ratio: 0,
      frame: {
        x: 100,
        y: 100
      }
    });
    keyframes.push({
      ratio: 1,
      frame: {
        x: -200,
        y: -100
      }
    });
    Ani.clouds.push(keyframes);
    keyframes = [];
    keyframes.push({
      ratio: 0,
      frame: {
        x: -100
      }
    });
    keyframes.push({
      ratio: 1,
      frame: {
        x: 50
      }
    });
    Ani.clouds.push(keyframes);
    keyframes = [];
    keyframes.push({
      ratio: 0,
      frame: {
        x: 0,
        y: 50
      }
    });
    keyframes.push({
      ratio: 1,
      frame: {
        x: 50,
        y: -50
      }
    });
    Ani.clouds.push(keyframes);
    keyframes = [];
    keyframes.push({
      ratio: 0,
      frame: {
        y: -250,
        rotation: 200
      }
    });
    keyframes.push({
      ratio: 1,
      frame: {
        y: 100,
        rotation: -200
      }
    });
    Ani.sun = keyframes;
    Ani.waves = [];
    Ani.numberOfWaves = 5;
    for (i = _j = 0, _ref1 = Ani.numberOfWaves; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      keyframes = [];
      r = Math.random();
      keyframes.push({
        ratio: 0,
        frame: {
          y: i * 90
        }
      });
      keyframes.push({
        ratio: 1,
        frame: {
          x: (r - .5) * 2000,
          y: -i * 80
        }
      });
      Ani.waves.push(keyframes);
    }
    return Ani;
  });

}).call(this);

//# sourceMappingURL=ani.map
