(function () {
  const closeEveryItemInContainer = (container) => {
    const items = container.find(".accordion__item");
    const content = container.find(".accordion__content");

    items.removeClass("active");
    content.width(0);
  };

  const measureWidth = (block) => {
    let itemWidth = 0;

    const screenWidth = $(window).width();
    const titlesWidth = block.find(".accordion-item__title").width() * 3;
    const textContainer = block.find(".accordion__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)");

    if (isMobile.matches) {
      itemWidth = screenWidth - titlesWidth
    } else {
      itemWidth = 500
    }

    return {
      container: itemWidth,
      textContainer: itemWidth - paddingLeft - paddingRight
    }
  };

  const openItem = (item) => {
    const hiddenBlock = item.find(".accordion__content");
    const reqWidth = measureWidth(item).container;
    const textBlock = item.find(".accordion__container");
    const textBlockWidth = measureWidth(item).textContainer;

    item.addClass("active");
    hiddenBlock.width(reqWidth);
    textBlock.width(textBlockWidth)
  };

  $(".accordion-item__title").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".accordion__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".accordion__list");

    if (itemOpened) {
      closeEveryItemInContainer(container);
    } else {
      closeEveryItemInContainer(container);
      openItem(item);
    }
  });
}());