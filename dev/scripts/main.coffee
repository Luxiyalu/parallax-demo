define ['jquery', 'ani', 'parallax', 'TweenMax'], ($, Ani) ->
  class Page
    constructor: (@listofDiv = []) ->
      @data = {}
      @ratio = {}
      do @bindEvents
      
  Page::getDivData = (className) ->
    $dom = $(".#{className}")
    if $dom.length == 0
      console.log "Div with class #{className} doesn't exist."
    @data[className] =
      height: $dom.height()
      offsetTop: $dom.offset()?.top
      
  Page::getDivRatio = (className) ->
    @ratio[className] = @calRatio className
    
  Page::calRatio = (className) ->
    a = @data[className].offsetTop
    c = @data[className].height
    b = window.height
    ratio = scrollY / (b + c) + (b - a) / (b + c)
    
  Page::bindEvents = ->
    # resize
    $(document).on 'resize', =>
      # recal window height
      window.height = $(window).height()
      # recal div height, offsetTop
      for className in @listofDiv
        @getDivData className
        
    # prevent keyboard triggered scrolling
    keys = [37, 38, 39, 40, 32, 33, 34, 35, 36]
    $(document).on 'keydown', (e) =>
      for key in keys
        do e.preventDefault if e.keyCode == key
        
    # take control of mousewheel scrolling
    scroll = y: 0
    $(document).on 'mousewheel', (e) =>
      if @firstScrollDone is undefined
        TweenMax.to $('.scroll-down'), 0.8,
          autoAlpha: 0
          onComplete: => @firstScrollDone = true
          
      e.preventDefault()
      TweenMax.to scroll, 0.7,
        y: window.scrollY - e.originalEvent.wheelDelta
        ease: Power3.easeOut
        onUpdate: => window.scroll 0, scroll.y
          
    # actual scroll binding
    $(document).on 'scroll', (e) =>
      # recal container div ratio
      for className in @listofDiv
        @getDivRatio className
        
      # seek to ratio
      # stars
      for i in [0...Ani.numberOfStars]
        parallaxCollection.stars[i].seek @ratio['stars']
      # moon
      parallaxCollection.moon.seek @ratio['moon']
      # clouds
      for i in [0...Ani.numberOfClouds]
        parallaxCollection.clouds[i].seek @ratio['moon']
      # sun
      parallaxCollection.sun.seek @ratio['ocean']
      # waves
      for i in [0...Ani.numberOfWaves]
        parallaxCollection.waves[i].seek @ratio['ocean']
        
  # create new page
  page = new Page ['stars', 'moon', 'ocean']
  
  # create the tweens according to ratio
  parallaxCollection = {}
  # stars
  parallaxCollection.stars = []
  for i in [0...Ani.numberOfStars]
    $('.stars').append "<div class='star'></div>"
    star = new Parallax($('.star').eq(i), Ani.stars[i])
    parallaxCollection.stars.push star
  # moon
  parallaxCollection.moon = new Parallax $('.moon .orb'), Ani.moon
  # clouds
  parallaxCollection.clouds = []
  for i in [0...Ani.numberOfClouds]
    cloud = new Parallax $('.moon .cloud').eq(i), Ani.clouds[i]
    parallaxCollection.clouds.push cloud
  # sun
  parallaxCollection.sun = new Parallax $('.ocean .sun'), Ani.sun
  # waves
  parallaxCollection.waves = []
  for i in [0...Ani.numberOfWaves]
    wave = new Parallax $('.ocean .wave').eq(i), Ani.waves[i]
    parallaxCollection.waves.push wave
    
  scroll 0, 0
  $(document).trigger 'resize'
  $(document).trigger 'scroll'
