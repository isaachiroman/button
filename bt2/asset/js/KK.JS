var zaloWidgetInterval;
var tawkToInterval;
var tawkToHideInterval;
var skypeWidgetInterval;
var lcpWidgetInterval;
var closePopupTimeout;
var lzWidgetInterval;
var paldeskInterval;
var arcuOptions;
var arCuMessages = ["Hello!", "Have a questions?", "Please use this button<br \/>\r\nto contact us!"];
var arCuLoop = false;;
var arCuCloseLastMessage = false;
var arCuPromptClosed = false;
var _arCuTimeOut = null;
var arCuDelayFirst = 2000;
var arCuTypingTime = 2000;
var arCuMessageTime = 4000;
var arCuClosedCookie = 0;
var arcItems = [];
var Tawk_API = Tawk_API || {},
    Tawk_LoadStart = new Date();
window.addEventListener('load', function() {
    jQuery('#arcontactus').remove();
    var $arcuWidget = jQuery('<div>', {
        id: 'arcontactus'
    });
    jQuery('body').append($arcuWidget);
    jQuery('#arcontactus').on('arcontactus.init', function() {
        jQuery('#arcontactus').addClass('arcuAnimated').addClass('flipInY');
        jQuery('#arcu-callback-form').append('<input type="hidden" id="_wpnonce" name="_wpnonce" value="fd08b18be2" /><input type="hidden" name="_wp_http_referer" value="/" />');
        setTimeout(function() {
            jQuery('#arcontactus').removeClass('flipInY');
        }, 1000);
        jQuery.mask.definitions['#'] = "[0-9]";
        jQuery('#arcontactus .arcu-field-phone').arCuMask('+XXX-XX-XXX-XX-XX');
        if (arCuClosedCookie) {
            return false;
        }
        arCuShowMessages();
    });
    jQuery('#arcontactus').on('arcontactus.closeMenu', function() {
        arCuCreateCookie('arcumenu-closed', 1, 1);
    });
    jQuery('#arcontactus').on('arcontactus.openMenu', function() {
        clearTimeout(_arCuTimeOut);
        if (!arCuPromptClosed) {
            arCuPromptClosed = true;
            jQuery('#arcontactus').contactUs('hidePrompt');
        }
    });
    jQuery('#arcontactus').on('arcontactus.openCallbackPopup', function() {
        clearTimeout(_arCuTimeOut);
        if (!arCuPromptClosed) {
            arCuPromptClosed = true;
            jQuery('#arcontactus').contactUs('hidePrompt');
        }
    });

    jQuery('#arcontactus').on('arcontactus.hidePrompt', function() {
        clearTimeout(_arCuTimeOut);
        if (arCuClosedCookie != "1") {
            arCuClosedCookie = "1";
        }
    });
    jQuery('#arcontactus').on('arcontactus.successCallbackRequest', function() {
        closePopupTimeout = setTimeout(function() {
            jQuery('#arcontactus').contactUs('closeCallbackPopup');
        }, 10000);
    });
    jQuery('#arcontactus').on('arcontactus.closeCallbackPopup', function() {
        clearTimeout(closePopupTimeout);
    })
    var arcItem = {};
    arcItem.id = 'msg-item-1';
    arcItem.class = 'msg-item-facebook-messenger';
    arcItem.title = "Messenger (link)";
    arcItem.subTitle = "Reply within 2 hours";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>';
    arcItem.href = 'https://m.me/areamaDevelopment';
    arcItem.color = '#0084FF';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-10';
    arcItem.onClick = function(e) {
        e.preventDefault();
        jQuery('#arcontactus').contactUs('closeMenu');
        if (typeof FB == 'undefined' || typeof FB.CustomerChat == 'undefined') {
            console.error('Facebook customer chat integration is disabled in module configuration');
            return false;
        }
        jQuery('#arcontactus').contactUs('hide');
        jQuery('#ar-fb-chat').addClass('active');
        FB.CustomerChat.show();
        FB.CustomerChat.showDialog();
    }
    arcItem.class = 'msg-item-facebook-messenger';
    arcItem.title = "Messenger";
    arcItem.subTitle = "Integration";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 32C15.9 32-77.5 278 84.6 400.6V480l75.7-42c142.2 39.8 285.4-59.9 285.4-198.7C445.8 124.8 346.5 32 224 32zm23.4 278.1L190 250.5 79.6 311.6l121.1-128.5 57.4 59.6 110.4-61.1-121.1 128.5z"></path></svg>';
    arcItem.color = '#0084FF';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-2';
    arcItem.onClick = function(e) {
        ga("send", "event", "contact", "click", "whatsapp");
    }
    arcItem.class = 'msg-item-whatsapp';
    arcItem.title = "Whatsapp";
    arcItem.subTitle = "Link";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>';
    arcItem.href = 'https://web.whatsapp.com/send?l=en&amp;phone=+380505109376';
    arcItem.color = '#25D366';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-3';
    arcItem.class = 'msg-item-viber';
    arcItem.title = "Viber";
    arcItem.subTitle = "Link";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M444 49.9C431.3 38.2 379.9.9 265.3.4c0 0-135.1-8.1-200.9 52.3C27.8 89.3 14.9 143 13.5 209.5c-1.4 66.5-3.1 191.1 117 224.9h.1l-.1 51.6s-.8 20.9 13 25.1c16.6 5.2 26.4-10.7 42.3-27.8 8.7-9.4 20.7-23.2 29.8-33.7 82.2 6.9 145.3-8.9 152.5-11.2 16.6-5.4 110.5-17.4 125.7-142 15.8-128.6-7.6-209.8-49.8-246.5zM457.9 287c-12.9 104-89 110.6-103 115.1-6 1.9-61.5 15.7-131.2 11.2 0 0-52 62.7-68.2 79-5.3 5.3-11.1 4.8-11-5.7 0-6.9.4-85.7.4-85.7-.1 0-.1 0 0 0-101.8-28.2-95.8-134.3-94.7-189.8 1.1-55.5 11.6-101 42.6-131.6 55.7-50.5 170.4-43 170.4-43 96.9.4 143.3 29.6 154.1 39.4 35.7 30.6 53.9 103.8 40.6 211.1zm-139-80.8c.4 8.6-12.5 9.2-12.9.6-1.1-22-11.4-32.7-32.6-33.9-8.6-.5-7.8-13.4.7-12.9 27.9 1.5 43.4 17.5 44.8 46.2zm20.3 11.3c1-42.4-25.5-75.6-75.8-79.3-8.5-.6-7.6-13.5.9-12.9 58 4.2 88.9 44.1 87.8 92.5-.1 8.6-13.1 8.2-12.9-.3zm47 13.4c.1 8.6-12.9 8.7-12.9.1-.6-81.5-54.9-125.9-120.8-126.4-8.5-.1-8.5-12.9 0-12.9 73.7.5 133 51.4 133.7 139.2zM374.9 329v.2c-10.8 19-31 40-51.8 33.3l-.2-.3c-21.1-5.9-70.8-31.5-102.2-56.5-16.2-12.8-31-27.9-42.4-42.4-10.3-12.9-20.7-28.2-30.8-46.6-21.3-38.5-26-55.7-26-55.7-6.7-20.8 14.2-41 33.3-51.8h.2c9.2-4.8 18-3.2 23.9 3.9 0 0 12.4 14.8 17.7 22.1 5 6.8 11.7 17.7 15.2 23.8 6.1 10.9 2.3 22-3.7 26.6l-12 9.6c-6.1 4.9-5.3 14-5.3 14s17.8 67.3 84.3 84.3c0 0 9.1.8 14-5.3l9.6-12c4.6-6 15.7-9.8 26.6-3.7 14.7 8.3 33.4 21.2 45.8 32.9 7 5.7 8.6 14.4 3.8 23.6z"></path></svg>';
    arcItem.href = 'viber://chat?number=%2B3080513858';
    arcItem.target = '_self';
    arcItem.color = '#8F5DB7';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-5';
    arcItem.class = 'msg-item-skype';
    arcItem.title = "Skype";
    arcItem.subTitle = "Link";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M424.7 299.8c2.9-14 4.7-28.9 4.7-43.8 0-113.5-91.9-205.3-205.3-205.3-14.9 0-29.7 1.7-43.8 4.7C161.3 40.7 137.7 32 112 32 50.2 32 0 82.2 0 144c0 25.7 8.7 49.3 23.3 68.2-2.9 14-4.7 28.9-4.7 43.8 0 113.5 91.9 205.3 205.3 205.3 14.9 0 29.7-1.7 43.8-4.7 19 14.6 42.6 23.3 68.2 23.3 61.8 0 112-50.2 112-112 .1-25.6-8.6-49.2-23.2-68.1zm-194.6 91.5c-65.6 0-120.5-29.2-120.5-65 0-16 9-30.6 29.5-30.6 31.2 0 34.1 44.9 88.1 44.9 25.7 0 42.3-11.4 42.3-26.3 0-18.7-16-21.6-42-28-62.5-15.4-117.8-22-117.8-87.2 0-59.2 58.6-81.1 109.1-81.1 55.1 0 110.8 21.9 110.8 55.4 0 16.9-11.4 31.8-30.3 31.8-28.3 0-29.2-33.5-75-33.5-25.7 0-42 7-42 22.5 0 19.8 20.8 21.8 69.1 33 41.4 9.3 90.7 26.8 90.7 77.6 0 59.1-57.1 86.5-112 86.5z"></path></svg>';
    arcItem.href = 'skype:bad_omen84?chat';
    arcItem.target = '_self';
    arcItem.color = '#00AFF0';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-6';
    arcItem.class = 'msg-item-envelope';
    arcItem.title = "Email us";
    arcItem.subTitle = "Send us email message directly";
    arcItem.icon = '<svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M464 64H48C21.5 64 0 85.5 0 112v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM48 96h416c8.8 0 16 7.2 16 16v41.4c-21.9 18.5-53.2 44-150.6 121.3-16.9 13.4-50.2 45.7-73.4 45.3-23.2.4-56.6-31.9-73.4-45.3C85.2 197.4 53.9 171.9 32 153.4V112c0-8.8 7.2-16 16-16zm416 320H48c-8.8 0-16-7.2-16-16V195c22.8 18.7 58.8 47.6 130.7 104.7 20.5 16.4 56.7 52.5 93.3 52.3 36.4.3 72.3-35.5 93.3-52.3 71.9-57.1 107.9-86 130.7-104.7v205c0 8.8-7.2 16-16 16z"></path></svg>';
    arcItem.href = 'mailto:and.maruschenko@gmail.com';
    arcItem.color = '#FF643A';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-12';
    arcItem.onClick = function(e) {
        e.preventDefault();
        jQuery('#arcontactus').contactUs('closeMenu');
        if (typeof lh_inst == 'undefined') {
            console.error('Live Helper Chat integration is disabled in module configuration');
            return false;
        }
        jQuery('#arcontactus').contactUs('hide');
        lh_inst.lh_openchatWindow();


    }
    arcItem.class = 'msg-item-comments-light';
    arcItem.title = "Live Helper Chat";
    arcItem.subTitle = "Integration";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.4 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.1 2.1 18.4 3.7 28 4.8 31.5 57.5 105.5 98 191.8 98 20.8 0 40.8-2.4 59.8-6.8 28.5 18.5 71.6 38.8 125.2 38.8 9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.5-.4-22.6-24.2-37.9-54.9zM142.2 311l-11.4 7.4c-20.1 13.1-50.5 28.2-87.7 32.5 8.8-11.3 20.2-27.6 29.5-46.4L83 283.7l-16.5-16.3C50.7 251.9 32 226.2 32 192c0-70.6 79-128 176-128s176 57.4 176 128-79 128-176 128c-17.7 0-35.4-2-52.6-6l-13.2-3zm303 103.4l-11.4-7.4-13.2 3.1c-17.2 4-34.9 6-52.6 6-65.1 0-122-25.9-152.4-64.3C326.9 348.6 416 278.4 416 192c0-9.5-1.3-18.7-3.3-27.7C488.1 178.8 544 228.7 544 288c0 34.2-18.7 59.9-34.5 75.4L493 379.7l10.3 20.7c9.4 18.9 20.8 35.2 29.5 46.4-37.1-4.2-67.5-19.4-87.6-32.4zm-37.8-267.7c.1.2.1.4.2.6-.1-.2-.1-.4-.2-.6z"></path></svg>';
    arcItem.color = '#A14F62';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-13';
    arcItem.onClick = function(e) {
        e.preventDefault();
        jQuery('#arcontactus').contactUs('closeMenu');
        if (typeof smartsupp == 'undefined') {
            console.error('Smartsupp chat integration is disabled in module configuration');
            return false;
        }
        jQuery('#arcontactus').contactUs('hide');
        jQuery('#chat-application').addClass('active');
        smartsupp('chat:open');
        ssInterval = setInterval(function() {
            checkSSIsOpened();
        }, 100);


    }
    arcItem.class = 'msg-item-comments-alt-light';
    arcItem.title = "Smartsupp";
    arcItem.subTitle = "Integration";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M512 160h-96V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64v160c0 35.3 28.7 64 64 64h32v52c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L224 288h128c35.3 0 64-28.7 64-64v-32h96c17.6 0 32 14.4 32 32v160c0 17.6-14.4 32-32 32h-64v49.6l-80.2-45.4-7.3-4.2H256c-17.6 0-32-14.4-32-32v-96l-32 18.1V384c0 35.3 28.7 64 64 64h96l108.9 61.6c2.2 1.6 4.7 2.4 7.1 2.4 6.2 0 12-4.9 12-12v-52h32c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64zm-128 64c0 17.6-14.4 32-32 32H215.6l-7.3 4.2-80.3 45.4V256H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h288c17.6 0 32 14.4 32 32v160z"></path></svg>';
    arcItem.color = '#497D8A';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-26';
    arcItem.onClick = function(e) {
        e.preventDefault();
        jQuery('#arcontactus').contactUs('closeMenu');
        if (typeof Tawk_API == 'undefined') {
            console.error('Tawk.to integration is disabled in module configuration');
            return false;
        }
        jQuery('#arcontactus').contactUs('hide');
        clearInterval(tawkToHideInterval);
        Tawk_API.showWidget();
        Tawk_API.maximize();
        tawkToInterval = setInterval(function() {
            checkTawkIsOpened();
        }, 100);


    }
    arcItem.class = 'msg-item-comments-alt-light';
    arcItem.title = "Tawk.to";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M512 160h-96V64c0-35.3-28.7-64-64-64H64C28.7 0 0 28.7 0 64v160c0 35.3 28.7 64 64 64h32v52c0 7.1 5.8 12 12 12 2.4 0 4.9-.7 7.1-2.4L224 288h128c35.3 0 64-28.7 64-64v-32h96c17.6 0 32 14.4 32 32v160c0 17.6-14.4 32-32 32h-64v49.6l-80.2-45.4-7.3-4.2H256c-17.6 0-32-14.4-32-32v-96l-32 18.1V384c0 35.3 28.7 64 64 64h96l108.9 61.6c2.2 1.6 4.7 2.4 7.1 2.4 6.2 0 12-4.9 12-12v-52h32c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64zm-128 64c0 17.6-14.4 32-32 32H215.6l-7.3 4.2-80.3 45.4V256H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h288c17.6 0 32 14.4 32 32v160z"></path></svg>';
    arcItem.color = '#CA2CAF';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-20';
    arcItem.href = '_popup';
    arcItem.popupContent = jQuery('#arcu-popup-content-0').html();
    jQuery('#arcu-popup-content-0').remove();
    arcItem.class = 'msg-item-fa';
    arcItem.title = "Popup example";
    arcItem.subTitle = "Simple popup with shortcode";
    arcItem.icon = '<i class="fas fa-info"></i>';
    arcItem.color = '#A73C21';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-9';
    arcItem.class = 'msg-item-phone';
    arcItem.title = "Callback request";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path></svg>';
    arcItem.href = 'callback';
    arcItem.color = '#4EB625';
    arcItems.push(arcItem);
    var arcItem = {};
    arcItem.id = 'msg-item-27';
    arcItem.onClick = function(e) {
        e.preventDefault();
        jQuery('#arcontactus').contactUs('closeMenu');
        if (typeof $zoho == 'undefined') {
            console.error('Zoho SalesIQ integration is disabled in module configuration');
            return false;
        }
        jQuery('#arcontactus').contactUs('hide');
        $zoho.salesiq.floatwindow.visible('show');


    }
    arcItem.class = 'msg-item-comment-alt-smile-solid';
    arcItem.title = "Zoho SalesIQ";
    arcItem.subTitle = "Integration";
    arcItem.icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64zM320 133.2c14.8 0 26.8 12 26.8 26.8s-12 26.8-26.8 26.8-26.8-12-26.8-26.8 12-26.8 26.8-26.8zm-128 0c14.8 0 26.8 12 26.8 26.8s-12 26.8-26.8 26.8-26.8-12-26.8-26.8 12-26.8 26.8-26.8zm164.2 140.9C331.3 303.3 294.8 320 256 320c-38.8 0-75.3-16.7-100.2-45.9-5.8-6.7-5-16.8 1.8-22.5 6.7-5.7 16.8-5 22.5 1.8 18.8 22 46.5 34.6 75.8 34.6 29.4 0 57-12.6 75.8-34.7 5.8-6.7 15.9-7.5 22.6-1.8 6.8 5.8 7.6 15.9 1.9 22.6z"></path></svg>';
    arcItem.color = '#A4C639';
    arcItems.push(arcItem);
    arcuOptions = {
        wordpressPluginVersion: '1.9.2',
        buttonIcon: '<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Canvas" transform="translate(-825 -308)"><g id="Vector"><use xlink:href="#path0_fill0123" transform="translate(825 308)" fill="currentColor"></use></g></g><defs><path id="path0_fill0123" d="M 19 4L 17 4L 17 13L 4 13L 4 15C 4 15.55 4.45 16 5 16L 16 16L 20 20L 20 5C 20 4.45 19.55 4 19 4ZM 15 10L 15 1C 15 0.45 14.55 0 14 0L 1 0C 0.45 0 0 0.45 0 1L 0 15L 4 11L 14 11C 14.55 11 15 10.55 15 10Z"></path></defs></svg>',
        drag: false,
        mode: 'regular',
        buttonIconUrl: 'https://wp496.areama.net/wp-content/plugins/ar-contactus/res/img/msg.svg',
        showMenuHeader: true,
        menuHeaderText: "Need help? Contact us!",
        showHeaderCloseBtn: true,
        headerCloseBtnBgColor: '#008749',
        headerCloseBtnColor: '#FFFFFF',
        itemsIconType: 'rounded',
        align: 'right',
        reCaptcha: false,
        reCaptchaKey: '',
        countdown: 0,
        theme: '#008749',
        buttonText: false,
        buttonSize: 'medium',
        buttonIconSize: 28,
        menuSize: 'large',
        phonePlaceholder: '+XXX-XX-XXX-XX-XX',
        callbackSubmitText: 'Waiting for call',
        errorMessage: 'Connection error. Please refresh the page and try again.',
        callProcessText: 'We are calling you to phone',
        callSuccessText: 'Thank you.<br/>We are call you back soon.',
        iconsAnimationSpeed: 600,
        iconsAnimationPause: 0,
        callbackFormText: 'Please enter your phone number<br/>and we call you back soon',
        items: arcItems,
        ajaxUrl: 'https://wp496.areama.net/wp-admin/admin-ajax.php',
        promptPosition: 'top',
        popupAnimation: 'scaleout',
        style: '',
        callbackFormFields: {
            name: {
                name: 'name',
                enabled: true,
                required: false,
                type: 'text',
                label: "",
                placeholder: "Enter your name (optional)",
                maxlength: 20,
            },
            email: {
                name: 'email',
                enabled: true,
                required: false,
                type: 'email',
                label: "",
                placeholder: "Enter your email (optional)",
            },
            phone: {
                name: 'phone',
                enabled: true,
                required: true,
                type: 'tel',
                label: '',
                placeholder: "+XXX-XX-XXX-XX-XX"
            },
            gdpr: {
                name: 'gdpr',
                enabled: true,
                required: true,
                type: 'checkbox',
                label: "I accept <a href=\"https://wp496.areama.net/?p=1\" target=\"_blank\">GDPR rules</a>",
            }
        },
        action: 'arcontactus_request_callback'
    };
    jQuery('#arcontactus').contactUs(arcuOptions);
    Tawk_API.onLoad = function() {
        if (!Tawk_API.isChatOngoing()) {
            Tawk_API.hideWidget();
        } else {
            jQuery('#arcontactus').contactUs('hide');
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
        jQuery('#arcontactus').contactUs('show');
    };
    Tawk_API.onChatEnded = function() {
        Tawk_API.hideWidget();
        setTimeout(function() {
            Tawk_API.hideWidget();
        }, 100);
        jQuery('#arcontactus').contactUs('show');
    };
    Tawk_API.onChatStarted = function() {
        jQuery('#arcontactus').contactUs('hide');
        clearInterval(tawkToHideInterval);
        Tawk_API.showWidget();
        Tawk_API.maximize();
        tawkToInterval = setInterval(function() {
            checkTawkIsOpened();
        }, 100);
    };
    (function() {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/5c583e196cb1ff3c14cb0b4f/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
    var hideCustomerChatInterval;
    FB.Event.subscribe('customerchat.dialogHide', function() {
        jQuery('#ar-fb-chat').removeClass('active');
        jQuery('#arcontactus').contactUs('show');
        FB.CustomerChat.hide();
    });
    FB.Event.subscribe('customerchat.dialogShow', function() {
        jQuery('#ar-fb-chat').addClass('active');
        jQuery('#arcontactus').contactUs('hide');
    });
    FB.Event.subscribe('customerchat.load', function() {
        hideCustomerChatInterval = setInterval(function() {
            if (jQuery('.fb_dialog').is(':visible')) {
                FB.CustomerChat.hide();
                clearInterval(hideCustomerChatInterval);
            }
        }, 100);
    });
    lh_inst.chatClosedCallback = function() {
        jQuery('#arcontactus').contactUs('show');
        clearInterval(LHCInterval);
    };
    lh_inst.chatOpenedCallback = function() {
        jQuery('#arcontactus').contactUs('hide');
        LHCInterval = setInterval(function() {
            checkLHCisOpened();
        }, 100);
    };
    ga('create', 'UA-28021323-7', 'auto');
});

function checkTawkIsOpened() {
    if (Tawk_API.isChatMinimized()) {
        Tawk_API.hideWidget();
        jQuery('#arcontactus').contactUs('show');
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
tawkToHide();
var LHCChatOptions = {};
var LHCInterval = null;

LHCChatOptions.opt = {
    widget_height: 190,
    widget_width: 300,
    popup_height: 500,
    popup_width: 500
};
(function() {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    var refferer = (document.referrer) ? encodeURIComponent(document.referrer.substr(document.referrer.indexOf('://') + 1)) : '';
    var location = (document.location) ? encodeURIComponent(window.location.href.substring(window.location.protocol.length)) : '';
    po.src = '//clients.livehelperchat.com//chat/getstatus/(click)/internal/(ma)/br/(position)/bottom_right/(check_operator_messages)/true/(top)/350/(units)/pixels?r=' + refferer + '&l=' + location;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

function checkLHCisOpened() {
    if (lh_inst.isMinimized) {
        jQuery('#arcontactus').contactUs('show');
        lh_inst.isMinimized = false;
        clearInterval(LHCInterval);
    }
}
var _smartsupp = _smartsupp || {};
_smartsupp.key = '8134707515575554c8fac1bad290d3855d374aad';
window.smartsupp || (function(d) {
    var s, c, o = smartsupp = function() {
        o._.push(arguments)
    };
    o._ = [];
    s = d.getElementsByTagName('script')[0];
    c = d.createElement('script');
    c.type = 'text/javascript';
    c.charset = 'utf-8';
    c.async = true;
    c.src = 'https://www.smartsuppchat.com/loader.js?';
    s.parentNode.insertBefore(c, s);
})(document);
var ssInterval;

function checkSSIsOpened() {
    if (jQuery('#chat-application').height() < 300) {
        smartsupp('chat:close');
        jQuery('#arcontactus').contactUs('show');
        clearInterval(ssInterval);
        jQuery('#chat-application').removeClass('active');
    }
}
smartsupp('on', 'message', function(model, message) {
    if (message.type == 'agent') {
        jQuery('#chat-application').addClass('active');
        smartsupp('chat:open');
        jQuery('#arcontactus').contactUs('hide');
        setTimeout(function() {
            ssInterval = setInterval(function() {
                checkSSIsOpened();
            }, 100);
        }, 500);

    }
});
var $zoho = $zoho || {};
$zoho.salesiq = $zoho.salesiq || {
    widgetcode: "b2a99ecc2a580a9bd1c14a4ed7f228133025108d46c98f17e984e170ee763119",
    values: {},
    ready: function() {}
};
var d = document;
s = d.createElement("script");
s.type = "text/javascript";
s.id = "zsiqscript";
s.defer = true;
s.src = "https://salesiq.zoho.eu/widget";
t = d.getElementsByTagName("script")[0];
t.parentNode.insertBefore(s, t);
d.write("<div id='zsiqwidget'></div>");
$zoho.salesiq.ready = function() {
    $zoho.salesiq.floatbutton.visible("hide");
    $zoho.salesiq.floatwindow.minimize(function() {
        jQuery('#arcontactus').contactUs('show');
    });
    $zoho.salesiq.floatwindow.close(function() {
        jQuery('#arcontactus').contactUs('show');
    });
}