 $('.navbar-toggler').on("click", function() {
      if (($('.navbar-body').hasClass('sidebar-toggle-display')) || ($('.navbar-body').hasClass('sidebar-absolute'))) {
        $('.navbar-body').toggleClass('sidebar-hidden');
      } else {
        $('.navbar-body').toggleClass('sidebar-icon-only');
      }
    });