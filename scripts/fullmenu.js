(function () {
  let wrapper = $("maincontent");
  let fullscreenMenu = $(".fullscreen__menu");
  let openBtn = $(".fullscreen__btn");
  let closeBtn = $(".close__btn");

  openBtn.on("click", event => {
      event.preventDefault();

      wrapper.css("overflowY", "hidden");
      fullscreenMenu.fadeIn(300);
      fullscreenMenu.css("display", "flex");
  });

  fullscreenMenu.find("a").each((i, links) => {
      $(links).on("click", event => {
          wrapper.css("overflowY", "visible");
          fullscreenMenu.fadeOut(200);
      });
  });

  closeBtn.on("click", event => {
      event.preventDefault();

      wrapper.css("overflowY", "visible");
      fullscreenMenu.fadeOut(200);

  });

  $(window).resize(() => {
      wrapper.css("overflowY", "visible");
      fullscreenMenu.fadeOut(0);
  });
})();
