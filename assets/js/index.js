$(document).ready(function () {
    // Collecting the sections and their relative offset
    var sections = [];
    $('.section').each(function () {
        sections.push({
            name: $(this).attr('name'),
            offset: $(this).offset().top
        });
    });
    sections.push({
        name: '',
        offset: $('#footer').offset().top
    });

    $(document).scroll(function(){
        var position = $(this).scrollTop();

        // Figuring out the active section
        var i = 0;
        var section = {};
        while (i < sections.length - 1) {
            if ((position > sections[i].offset) && (position < sections[i+1].offset)) break;
            i++;
        }
        $('#header a').removeClass('active');
        $('#header a[href="/#'+ sections[i].name +'"]').addClass('active');

        // Sticky header
        var offset = 360;
        if (position > offset) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }
    });

    // Syntax highlighter
    hljs.initHighlightingOnLoad();

    // Initializing the slideshow
    window.mySwipe = new Swipe(document.getElementById('swipe'), {
        speed: 350,
        auto: 6000,
        continuous: true,
        callback: function(index, elem) {
            var slide = $('#hero .teaser article:first');
            var nextSlide = slide.next();
            slide.fadeOut(350, function () {
                $('#hero .teaser').append(slide);
                nextSlide.show();
            });
        }
    });

    // var next = $('<span class="control next">Next</span>');
    // var previous = $('<span class="control previous">Previous</span>');
    // next.click(function () { mySwipe.next(); });
    // previous.click(function () { mySwipe.prev(); });
    // $('#hero').prepend(next).prepend(previous);

    // Toggle feature on offers
    $('body.careers .offer').addClass('collapsed');
    $('body.careers .offer h2').click(function () {
        var container = $(this).parent();
        if (container.hasClass('collapsed')) {
            container.removeClass('collapsed');
        }
        else {
            container.addClass('collapsed');
        }
    });
});