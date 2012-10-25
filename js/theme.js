cur = $('#p1 .slide').first();
curP = $('#p1');
w = $(document).width();
h = $(document).height();
resizeBoxes(w, h);

$(document).ready(function() {
    createChoco();
    $('.choco-link').first().addClass('active');
    $('#next').click(function(e) {
        e.preventDefault();

        if (cur.next().length == 0) {
            curP = cur.parent().next()
            if (curP.length == 0) {
                curP = $('#p1');
                cur = $('#p1 .slide').first();
            }
            cur = curP.find('.slide').first();

            slTop = cur.position().top;
            slLeft = cur.position().left;

        } else {
            cur = cur.next();
            slTop = cur.position().top;
            slLeft = cur.position().left;
        }
        moveBox(slTop, slLeft);
        setActiveBox(cur);

    });

    $('#prev').click(function(e) {
        e.preventDefault();

        if (cur.prev().length == 0) {
            curP = cur.parent().prev()
            if (curP.length == 0) {
                curP = $('#p2');
                cur = $('#p2 .slide').last();
            }
            cur = curP.find('.slide').last();

            slTop = cur.position().top;
            slLeft = cur.position().left;

        } else {
            cur = cur.prev();
            slTop = cur.position().top;
            slLeft = cur.position().left;
        }
        moveBox(slTop, slLeft);
        setActiveBox(cur);

    });
    $('#nextproj').click(function(e) {
        e.preventDefault();
        curP = curP.next();
        if (curP.length == 0) {
            curP = $('.project').first();
        }
        cur = curP.find('.slide').first();
        slTop = cur.position().top;
        slLeft = cur.position().left;
        moveBox(slTop, slLeft);
        setActiveBox(cur);
    });

    $('#prevproj').click(function(e) {
        e.preventDefault();
        curP = curP.prev();
        if (curP.length == 0) {
            curP = $('.project').last();
        }
        cur = curP.find('.slide').first();
        slTop = cur.position().top;
        slLeft = cur.position().left;
        moveBox(slTop, slLeft);
        setActiveBox(cur);
    });

    $('.proj-jump').click(function(e) {
        e.preventDefault();
        proj = $(this).attr('href');
        curP = $('#' + proj)
        cur = curP.find('.slide').first();
        slTop = cur.position().top;
        slLeft = cur.position().left;
        moveBox(slTop, slLeft);
        setActiveBox(cur);
    })

    $('.choco-link').click(function(e) {
        e.preventDefault();
        var slideN = $(this).get(0).href.split('/');
        slideN = slideN[slideN.length - 1];
        var projN = $(this).parent().attr('id').substr(5, 6);
        curP = $('#p' + projN);
        var allCur = curP.find(('.slide'));
        cur = $(allCur[parseInt(slideN) - 1]);
        slTop = cur.position().top;
        slLeft = cur.position().left;
        moveBox(slTop, slLeft);
        setActiveBox(cur);
    })
})
//KEY NAV
/////////////////////////////////////////////////////////////
$(document).keydown(function(e) {
    switch(e.keyCode) {
        case 37:
            //leftkey
            $("#prev").trigger("click");
            break;
        case 39:
            //rightkey
            $("#next").trigger("click");
            break;
        case 38:
            //up
            $("#prevproj").trigger("click");
            break;
        case 40:
            //down
            $("#nextproj").trigger("click");
            break;
    }

});//End doc ready

function moveBox(toT, toL) {
    $('#container').animate({
        'top' : -1 * toT,
        'left' : -1 * toL
    }, 1000);
}

//RESIZE
/////////////////////////////////////////////////////////////
$(window).resize(function() {
    w = $(window).width();
    h = $(document).height();
    resizeBoxes(w, h);
    $('#container').css('left', -1 * cur.position().left)
    resizeBoxes(w, h);
    $('#container').css('top', -1 * cur.position().top)
});
function resizeBoxes(w, h) {
    $('.slide').css({
        'width' : w,
        'height' : h
    });
    $('#window').css({
        'width' : w,
        'height' : h
    });
}

//CHOCO-NAV
/////////////////////////////////////////////////////////////
function setActiveBox(elem) {
    var id = elem.attr('id');
    var tProj = id.substr(1, 1);
    var tSlide = id.substr(3, 1);
    $('.choco-link').removeClass('active');
    $($('#choco'+tProj).find('.choco-link')[tSlide - 1]).addClass('active');
}
function createChoco() {
    var i = 0;
    var choco = $('#choco-menu');
    $('.project').each(function() {
        var q = 0;
        i++;
        provP = $(this);
        choco.append('<div class="choco-row" id="choco' + i + '"></div>');
        provP.find('.slide').each(function() {
            q++;
            $('#choco' + i).append('<a class="choco-link" href="' + q + '"id="s' + q + '">' + '</a>');
        })
    })
}

