// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(function() {
  $('#show_show_date').datepicker({dateFormat: 'yy-mm-dd'});
});

$(document).ready(function(){
    $('#about_tabs').easytabs();
});

$(document).ready(function() {
    $('#slider').nivoSlider({
        effect:'random', // Specify sets like: 'fold,fade,sliceDown'
        slices:15, // For slice animations
        boxCols: 8, // For box animations
        boxRows: 4, // For box animations
        animSpeed:250, // Slide transition speed
        pauseTime:6000, // How long each slide will show
        startSlide:0, // Set starting Slide (0 index)
        directionNav:true, // Next & Prev navigation
        directionNavHide:true, // Only show on hover
        controlNav:false, // 1,2,3... navigation
        controlNavThumbs:false, // Use thumbnails for Control Nav
        controlNavThumbsFromRel:false, // Use image rel for thumbs
        controlNavThumbsSearch: '.jpg', // Replace this with...
        controlNavThumbsReplace: '_thumb.jpg', // ...this in thumb Image src
        keyboardNav:true, // Use left & right arrows
        pauseOnHover:true, // Stop animation while hovering
        manualAdvance:false, // Force manual transitions
        captionOpacity:0.8, // Universal caption opacity
        prevText: '<<', // Prev directionNav text
        nextText: '>>', // Next directionNav text
        beforeChange: function(){}, // Triggers before a slide transition
        afterChange: function(){}, // Triggers after a slide transition
        slideshowEnd: function(){}, // Triggers after all slides have been shown
        lastSlide: function(){}, // Triggers when last slide is shown
        afterLoad: function(){} // Triggers when slider has loaded
    });
});

$(document).ready(function(){
  $("#throbber").throbber("click", {image: "/images/ajax-loader.gif"});
});

$(function() {
    $(".show_carousel").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 4,
        circular: "true"
    });
}); 