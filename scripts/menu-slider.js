const mesureWidth = item =>{
    const screenWidth = $(window).width();
    const container = item.closest(".slider__list");
    const titleBlock = container.find(".slider__item");
    const titleWidth = titleBlock.width() * titleBlock.length;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if(isMobile){

        return screenWidth - titleWidth - 40;
    } else{
        return 500;
    };

}
const closeEveryItemInContainer = container =>{
    const items = container.find(".slider__item");
    const content = container.find(".slider__item-content");

    items.removeClass("slider__item-active");
    content.width(0);
}
const openItem = (item) =>{
    const hiddenContent = item.find(".slider__item-content");
    const reqWidth = mesureWidth(item);
    item.addClass("slider__item-active");
    
    hiddenContent.width(reqWidth);
}

$(".slider__item-title").on('click', e =>{
 const $this = $(e.currentTarget);
 const item =$this.closest(".slider__item");
 const itemOpened = item.hasClass("slider__item-active");
 const container = $this.closest(".slider__list");

 if (itemOpened){
     closeEveryItemInContainer(container);

 } else {
    closeEveryItemInContainer(container);
     openItem(item);
 };

});
