const sections = $("section");
const display = $(".maincontent");
let inScroll = false;

const countSectionPosition = sectionEq =>{
    return sectionEq *-100;
}

sections.first().addClass("active");

const performTransition = sectionEq =>{
    if (inScroll === false){
        inScroll = true;
        const position = countSectionPosition(sectionEq);
        const sideMenu = $(".page");

    display.css({
        transform: `translateY(${position}%)`

    });

    sideMenu.find(".fixed__item").eq(sectionEq).addClass("fixed__item--active").siblings().removeClass("fixed__item--active");

    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");

        setTimeout(() =>{
            inScroll = false;
        }, 1010);
        };
    };
    

const scrollViewport = direction =>{
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length){
        performTransition(nextSection.index())
    }
    if (direction === "prev" && prevSection.length){
        performTransition(prevSection.index())
    }
}

$(window).on("wheel", e=>{
    const deltaY = e.originalEvent.deltaY;
    
    if(deltaY >0){
        scrollViewport("next");
    }

    if(deltaY <0){
        scrollViewport("prev");
    }
    console.log(deltaY);
});

$(window).on("keydown", e=>{

switch (e.keyCode) {
    case 38:
        scrollViewport("prev");
    break;
    case 40:
        scrollViewport("next");
        break;
}

})
$(".wrapper").on("touchmove", e=> e.preventDefault());

$("[data-scroll-to]").click(e=>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSeqtion = $(`[data-section-id=${target}]`);

   performTransition(reqSeqtion.index());

});

$("body").swipe( {
      swipe:function(event, direction) {
        const scroller = scrollViewport();
        let scrollDirection ="";
        
        if(direction ==="up") scrollDirection= "next";
        if(direction ==="down") scrollDirection= "prev";

        scrollViewport(scrollDirection);

      },
    });