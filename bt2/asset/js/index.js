window.addEventListener('load', function() {
  function hideTawktoPopup() {
    $(".mbwph-contact-container").removeClass("isButtonShow");
    $(".mbwph-main-contact").addClass("isHideMWPContact");
    $(".mbwph-contact-greeting").addClass("isHideGreeting");
  }
  function showTawktoPopup() {
    $(".mbwph-contact-container").removeClass("isButtonShow");
    $(".mbwph-main-contact").removeClass("isHideMWPContact");
    $(".mbwph-contact-greeting").removeClass("isHideGreeting");
    $(".mbwph-close-button-icon").removeClass("isShowCloseButton");
    $(".mbwph-button-group-icon").removeClass("isHideGroupIcon");
  }
  function onChatTawkto() {
    $(".mbwph-contact-container").removeClass("isButtonShow");
    $(".mbwph-main-contact").removeClass("isHideMWPContact");
    $(".mbwph-contact-greeting").removeClass("isHideGreeting");
    $(".mbwph-close-button-icon").removeClass("isShowCloseButton");
    $(".mbwph-button-group-icon").removeClass("isHideGroupIcon");
  }
  function onChatTawktoStarted() {
    $(".mbwph-contact-container").addClass("isButtonShow");
    $(".mbwph-main-contact").removeClass("isHideMWPContact");
    $(".mbwph-contact-greeting").removeClass("isHideGreeting");
  }
  function hideFbcPopup() {
    $(".mbwph-contact-button").addClass("isHideElement");
    $(".mbwph-call-main").addClass("isHideElement");
    $(".mbwph-contact-container").removeClass("isButtonShow");
    $(".mbwph-call-container").removeClass("isShowCallList");
    $(".mbwph-btt").removeClass("show");
  }
  function showFbcPopup() {
    $(".mbwph-contact-button").removeClass("isHideElement");
    $(".mbwph-call-main").removeClass("isHideElement");
    $(".mbwph-fbc").removeClass('isFbcShow');
    $(".mbwph-button-group-icon").removeClass("isHideGroupIcon");
    $(".mbwph-close-button-icon").removeClass("isShowCloseButton");
  }
  // Hàm xử lý Tawkto
  $(".mbwph-contact-tawkto").click(function(e) {
    e.preventDefault();
    var tawkToInterval;
    var tawkToHideInterval;
    if (typeof Tawk_API == 'undefined') {
      console.error('Tawk.to has been disable');
      return false;
    }
    hideTawktoPopup();
    Tawk_API.showWidget();
    Tawk_API.maximize();
    tawkToInterval = setInterval(function() {
        checkTawkIsOpened();
    }, 100);
    Tawk_API.onLoad = function() {
      if (!Tawk_API.isChatOngoing()) {
          Tawk_API.hideWidget();
      } else {
        hideTawktoPopup();
        clearInterval(tawkToHideInterval);
        tawkToInterval = setInterval(function() {
            checkTawkIsOpened();
        }, 100);
      }
    };
    Tawk_API.onChatMinimized = function() {
        Tawk_API.hideWidget();
        setTimeout(function() {
            Tawk_API.hideWidget();
        }, 100);
        onChatTawkto();
    };
    Tawk_API.onChatEnded = function() {
        Tawk_API.hideWidget();
        setTimeout(function() {
            Tawk_API.hideWidget();
        }, 100);
        onChatTawkto();
    };
    Tawk_API.onChatStarted = function() {
      onChatTawktoStarted();
      clearInterval(tawkToHideInterval);
      Tawk_API.showWidget();
      Tawk_API.maximize();
      tawkToInterval = setInterval(function() {
          checkTawkIsOpened();
      }, 100);
    };
    function checkTawkIsOpened() {
      if (Tawk_API.isChatMinimized()) {
        Tawk_API.hideWidget();
        showTawktoPopup();
        clearInterval(tawkToInterval);
      }
    }
    function tawkToHide() {
        tawkToHideInterval = setInterval(function() {
            if (typeof Tawk_API.hideWidget != 'undefined') {
                Tawk_API.hideWidget();
            }
        }, 100);
    }
    // tawkToHide();
    });
  // Hàm xử lý messenger
  $('.mbwph-contact-messenger').click(function(event) {
    event.preventDefault();
    if (typeof FB == 'undefined' || typeof FB.CustomerChat == 'undefined'){
      console.error('Facebook customer chat has been disable');
      return false;
    }
    $(".mbwph-fbc").addClass("isFbcShow");
    // FB.CustomerChat.show(true);
    FB.CustomerChat.show();
    FB.CustomerChat.showDialog();
    hideFbcPopup();
  });
  var hideFBCInterval;
  FB.Event.subscribe('customerchat.dialogHide', function() {
    showFbcPopup();
    FB.CustomerChat.hide();
  });
  FB.Event.subscribe('customerchat.dialogShow', function() {
    hideFbcPopup();
  });
  // FB.Event.subscribe('customerchat.load', function() {
  //   hideFBCInterval = setInterval(function() {
  //         if (jQuery('.fb_dialog').is(':visible')) {
  //             FB.CustomerChat.hide();
  //             console.log('an roi ne');
  //             clearInterval(hideFBCInterval);
  //         }
  //     }, 100);
  // });
});

jQuery(document).ready(function($){
  function hideGreeting() {
    $(".mbwph-contact-greeting").addClass("isHideGreeting");
  }
  function showGreeting() {
    $(".mbwph-contact-greeting").removeClass("isHideGreeting");
  }
  function hideCallPopup() {
    $(".mbwph-call-container").removeClass("isShowCallList");
    $(".mbwph-call-button-icon-child").removeClass("isHideElement");
    $(".mbwph-call-button-close-icon").removeClass("isShowCloseButton");
  }
  function hideChatPopup() {
    $(".mbwph-contact-container").removeClass("isButtonShow");
    $(".mbwph-close-button-icon").removeClass("isShowCloseButton");
    $(".mbwph-button-group-icon").removeClass("isHideGroupIcon");
  }
  function hideChatClassButon() {
    $("#mbwph-contact").addClass("isHideElement");
  }
  function showChatPopup() {
    $(".mbwph-contact-container").toggleClass("isButtonShow");
    $(".mbwph-close-button-icon").toggleClass("isShowCloseButton");
    $(".mbwph-button-group-icon").toggleClass("isHideGroupIcon");
    $(".mbwph-contact-greeting").addClass("isHideGreeting");
  }
  function showCallPopup() {
    $(".mbwph-call-container").toggleClass("isShowCallList");
    $(".mbwph-call-button-icon-child").toggleClass("isHideElement");
    $(".mbwph-call-button-close-icon").toggleClass("isShowCloseButton");
  }
  //Ẩn lời chào của nút chat
  $(".mbwph-contact-close-greeting").click(function() {
    hideGreeting();
  });
  //Ẩn nút gọi khi click vào nút đóng mbwph-header-close
  $('.mbwph-header-close').on('click touch', function(){
    hideCallPopup();
    if(window.matchMedia("(max-width: 550px)").matches){
      $("#mbwph-contact").removeClass("isHideElement");
    }
  });
  //Ẩn nút chat khi click vào nút đóng mbwph-header-close
  $('.mbwph-contact-header-close').on('click touch', function(){
    hideChatPopup();
  });
  //Hiển thị popup chat khi click vào mbwph-contact-button
  $(".mbwph-contact-button").on('click touch', function(){
    hideGreeting();
    showChatPopup();
  });
  // Hiển thị popup gọi khi click vào mbwph-call-main
  $('.mbwph-call-main').on('click touch', function(){
    hideGreeting();
    showCallPopup()
  }); 
  // Ẩn popup gọi khi click ra ngoài
  $(document).on('click touch', function(event) {
    if (!$(event.target).parents().addBack().is('.mbwph-call-main')) {
      hideCallPopup();
      if(window.matchMedia("(max-width: 550px)").matches){
        $("#mbwph-contact").removeClass("isHideElement");
      }
    }
    if (!$(event.target).parents().addBack().is('.mbwph-contact-button')) {
      hideChatPopup();
    }
  });
  // Stop propagation to prevent hiding "#tooltip" when clicking on it
  $('.mbwph-call-container').on('click touch', function(event) {
    event.stopPropagation();
  });
  $('.mbwph-contact-container').on('click touch', function(event) {
    event.stopPropagation();
  });
  if(window.matchMedia("(max-width: 550px)").matches){
    // The viewport is less than 550px pixels wide
    console.log('mobilemobile');
    $('.mbwph-call-main').on('click touch', function(event) {
      hideChatClassButon();
    });
  }
  // Hiệu ứng trái/phải
  var chatButton = $("#mbwph-contact")
  if (chatButton.hasClass("mbwph-left")) {
    $(".mbwph-main-contact, .mbwph-contact-container, .mbwph-contact-button").addClass('onLeft');
    // $(".mbwph-contact-container").addClass('onLeft');
    // $(".mbwph-main-contact").addClass('onLeft');
    // $(".mbwph-main-contact").addClass('onLeft');
    // $(".mbwph-main-contact").addClass('onLeft');
    // $(".mbwph-main-contact").addClass('onLeft');
    // $(".mbwph-contact-toggle").on("click", alreadyExistClass);
  }
  //Backtotop
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) $('.mbwph-btt').addClass('show');
    else $('.mbwph-btt').removeClass('show');
  });
    $(".mbwph-btt").click(function () {
    $("html, body").animate({scrollTop: 0, behavior:'smooth'}, 800);
      event.preventDefault();
  });
  //Backtotop
  });