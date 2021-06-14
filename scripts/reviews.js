const findBlockByAlias = (alias) =>{
    return $(".reviews__display-item").filter((ndx,  item)=>{
        return $(item).attr('data-linked-with') === alias;
    });
};

$(".reviews__switch-link").click(e =>{
    e.preventDefault()

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockByAlias(target);
    const curItem = $this.closest(".reviews__switch-item");

    itemToShow.addClass("reviews--active").siblings().removeClass("reviews--active");

    curItem.addClass("interactive__avatar--active").siblings().removeClass("interactive__avatar--active")
})
