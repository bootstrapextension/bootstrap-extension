/*
 * Bootstrap Extension v5.2.1 (https://bootstrap-extension.com)
 * Copyright 2018-2022 The Bootstrap Extension Author: Peter Joiner
 * Copyright 2018-2023 A.K.K., Inc.
 * Licensed under MIT
 */
docReady = (fn) => {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
};

docReady(() => {

    /* --------
     *  cookie
     * -------- */

    setCookie = (cName, cValue, exDays) => {
        var d = new Date();
        d.setTime(d.getTime() + exDays * 24 * 60 * 60 * 1000);
        var expires = "expires=" + d.toUTCString();
        document.cookie = cName + "=" + cValue + ";" + expires + ";path=/";
    };

    getCookie = (cName) => {
        var name = cName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(";");
        for (var i = 0; i < cookieArray.length; i++) {
            var anyCookie = cookieArray[i];
            while (anyCookie.charAt(0) === ' ') {
                anyCookie = anyCookie.substring(1);
            }
            if (anyCookie.indexOf(name) === 0) {
                return anyCookie.substring(name.length, anyCookie.length);
            }
        }
        return "";
    };

    if (document.querySelector('#alert-cookie button') !== null) {
        document.querySelector('#alert-cookie button').addEventListener('click', function () {
            var dataCookie = document.getElementById('alert-cookie').getAttribute('data-cookie');
            setCookie(dataCookie, '1', '10000');
            document.getElementById('alert-cookie').remove();
        });
    }

    if (document.getElementById('alert-cookie') !== null) {
        var dataCookie = document.getElementById('alert-cookie').getAttribute('data-cookie');
        if (getCookie(dataCookie) === '1') {
            document.getElementById('alert-cookie').remove();
        } else {
            document.getElementById('alert-cookie').style.display = 'flex';
        }
    }

    /* ----------------------------
     *  input file change to image
     * ---------------------------- */

    var imageForInputs = document.getElementsByClassName('image-for-input');
    for (var i = 0; i < imageForInputs.length; i++) {
        imageForInputs[i].style.display = 'none';
        imageForInputs[i].nextElementSibling.addEventListener('click', function () {
            this.previousElementSibling.click();
        });
        imageForInputs[i].addEventListener('change', function () {
            var aktImageForInput = this;
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    aktImageForInput.nextElementSibling.setAttribute('src', e.target.result);
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    /* ------------------------------
     *  select form item placeholder
     * ------------------------------ */

    var selects = document.getElementsByClassName('form-select');
    for (var i = 0; i < selects.length; i++) {
        if (selects[i].hasAttribute('required') && selects[i].firstElementChild.value === '') {
            selects[i].firstElementChild.setAttribute('hidden', 'hidden');
        }
        if (selects[i].options[selects[i].selectedIndex].text !== selects[i].firstElementChild.innerHTML) {
            selects[i].classList.add('normalColor');
        }
        selects[i].addEventListener('change', function () {
            if (!this.classList.contains('normalColor')) {
                this.classList.add('normalColor');
            }
        });
    }

    /* ------------
     *  hover-zoom
     * ------------ */

    var hoverZoomDiv = document.querySelectorAll('.hover-zoom, .hover-zoom-sm, .hover-zoom-lg');
    var hoverZoomImages = document.querySelectorAll('.hover-zoom img, .hover-zoom-sm img, .hover-zoom-lg img');
    for (var i = 0; i < hoverZoomImages.length; i++) {
        hoverZoomBox = document.createElement('div');
        hoverZoomBox.classList.add('o-hidden');
        hoverZoomBox.innerHTML = hoverZoomImages[i].outerHTML;
        hoverZoomDiv[i].replaceChild(hoverZoomBox, hoverZoomImages[i]);
    }

    /* ---------------
     *  offset-border
     * --------------- */
    
    var offsetBorderTimer = null;
    var allOBILoaded = null;
    var offsetBorderData = null;
    var offsetBorderImages = document.querySelectorAll('.offset-border');

    offsetBorderImages.forEach((item, i) => {
        item.insertAdjacentHTML('afterend', '<div style="position: absolute;"></div>');
    });
    
    offsetBorderTimer = setInterval(() => {
        allOBILoaded = true;
        offsetBorderImages.forEach((item, i) => {
            if (parseInt(getComputedStyle(item).getPropertyValue('width')) === 0) {
                allOBILoaded = false;
            }
        });
        if (allOBILoaded) {
            clearInterval(offsetBorderTimer);
            offsetBorderTimer = setInterval(() => {
                offsetBorderImages.forEach(function (item, i) {
                    if (item.getAttribute('data-border')) {
                        offsetBorderData = item.getAttribute('data-border').split(' ');
                        item.nextElementSibling.style.left = (item.offsetLeft + parseInt(offsetBorderData[0])) + 'px';
                        item.nextElementSibling.style.top = (item.offsetTop + parseInt(offsetBorderData[1])) + 'px';
                        item.nextElementSibling.style.width = (parseInt(getComputedStyle(item).getPropertyValue('width')) + parseInt(offsetBorderData[2])) + 'px';
                        item.nextElementSibling.style.height = (parseInt(getComputedStyle(item).getPropertyValue('height')) + parseInt(offsetBorderData[3])) + 'px';
                        item.nextElementSibling.style.border = 'solid ' + offsetBorderData[4] + 'px ' + offsetBorderData[5];
                    }
                });
            }, 10);
        }
    }, 10);
    
    /* ----------
     *  parallax
     * ---------- */

    var parallaxes = document.querySelectorAll('.parallax');

    parallaxScroll = () => {
        for (var i = 0; i < parallaxes.length; i++) {
            if (parallaxes[i].getAttribute('data-speed') < 0 || parallaxes[i].getAttribute('data-speed') > 1) {
                parallaxes[i].setAttribute('data-speed', 0);
            }
            parallaxes[i].originalPosY = parallaxes[i].offsetTop;
            parallaxes[i].style.backgroundPositionY = -parallaxes[i].getAttribute('data-speed') * (window.pageYOffset - parallaxes[i].originalPosY) + 'px';
        }
    };

    for (var i = 0; i < parallaxes.length; i++) {
        parallaxes[i].style.backgroundImage = 'url('+parallaxes[i].getAttribute('data-img-src')+')';
    }

    parallaxScroll();
    window.addEventListener('scroll', parallaxScroll);
    window.addEventListener('resize', parallaxScroll);

    /* ---------------------
     *  horizontal parallax
     * --------------------- */

    var root = document.querySelector(':root');
    var multi_navbar = document.querySelector('.multi-navbar');
    var multi_navbar_Nav = document.querySelector('.multi-navbar nav');
    var hp = document.querySelectorAll('.horizontal-parallax')[0];
    var hpSections = document.querySelectorAll('.horizontal-parallax section');
    var hpSectionNum = hpSections.length;

    setParallaxHorizontal = () => {
        if (getComputedStyle(hp).getPropertyValue('display') === 'flex') {
            if (multi_navbar && multi_navbar.classList.contains('multi-navbar-aside') && getComputedStyle(multi_navbar_Nav).getPropertyValue('display') === 'block') {
                document.body.style.height = hpSectionNum * window.innerWidth - (window.innerWidth - window.innerHeight) - (hpSectionNum - 1) * parseInt(getComputedStyle(root).getPropertyValue('--multinavbar-aside-Width')) + 'px';
            } else {
                document.body.style.height = hpSectionNum * window.innerWidth - (window.innerWidth - window.innerHeight) + 'px';
            }
            hp.style.height = window.innerHeight + 'px';
            hpSections.forEach(function (section, i) {
                if (multi_navbar && multi_navbar.classList.contains('multi-navbar-aside') && getComputedStyle(multi_navbar_Nav).getPropertyValue('display') === 'block') {
                    section.style.width = window.innerWidth - parseInt(getComputedStyle(root).getPropertyValue('--multinavbar-aside-Width')) + 'px';
                } else {
                    section.style.width = window.innerWidth + 'px';
                }
                section.style.height = window.innerHeight + 'px';
            });
        } else {
            document.body.style.height = 'auto';
            hp.style.width = 'auto';
            hp.style.height = 'auto';
            hpSections.forEach(function (section, i) {
                section.style.width = 'auto';
                section.style.height = 'auto';
            });
        }
    };

    if (typeof(hp) !== 'undefined') {
        document.body.style.overflowX = 'hidden';

        window.addEventListener('scroll', function () {
            hp.style.left = -window.scrollY + 'px';
        });

        setParallaxHorizontal();
        window.addEventListener('resize', setParallaxHorizontal);
    }

    /* --------------
     *  multi-navbar
     * -------------- */

    var multi_navbar_Nav = document.querySelector('.multi-navbar nav');
    var multi_navbar_Nav_Ul = document.querySelector('.multi-navbar nav ul');
    var multi_navbar_topbar = document.querySelector('.multi-navbar .topbar');
    var multi_navbar_topbar_Collapsable = document.querySelector('.multi-navbar .topbar.collapsable');
    var subMenus = document.querySelectorAll('.multi-navbar nav li ul');

    setInterval(() => {
        if (multi_navbar && multi_navbar_Nav_Ul && subMenus) {
            if (parseInt(getComputedStyle(multi_navbar_Nav_Ul).getPropertyValue('--multi-navbar-nav-ul-Right')) === 0 || multi_navbar.classList.contains('multi-navbar-aside')) {
                subMenus.forEach(function (subMenu, i) {
                    subMenu.style.position = 'relative';
                    subMenu.style.marginTop = -13 + 'px';
                });
            } else {
                var subMenuTop = parseInt(getComputedStyle(multi_navbar).getPropertyValue('height')) + 'px';
                subMenus.forEach(function (subMenu, i) {
                    subMenu.style.position = 'absolute';
                    subMenu.style.marginTop = '0';
                });
            }
            multi_navbar.style.setProperty('--multi-navbar-submenu-top', subMenuTop);
        }
    }, 10);

    multi_navbar_addButtons = () => {
        if (multi_navbar_Nav_Ul) {
            multi_navbar_Nav_Ul.insertAdjacentHTML('afterbegin', '<li><a style="float: right;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"/></svg></a></li>');
        }
        if (multi_navbar_Nav) {
            multi_navbar_Nav.insertAdjacentHTML('beforeend', '<a class="btn-hamburger"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg></a>');
        }
        subMenus.forEach(function (subMenu, i) {
            subMenu.insertAdjacentHTML('beforebegin', '<div class="menu-arrow"></div>');
        });
    };

    set_multi_navbar = () => {
        var rootStyle = getComputedStyle(root);
        root.style.setProperty('--multi-navbar-nav-ul-Right', -parseInt(getComputedStyle(root).getPropertyValue('--multinavbar-offcanvas-Width')) + 'px');
        if (window.scrollY > 150 || getComputedStyle(document.querySelector('.multi-navbar .btn-hamburger')).getPropertyValue('display') === "block") {
            root.style.setProperty('--multinavbar-menu-PaddingY', rootStyle.getPropertyValue('--multinavbar-menu-MinPaddingY'));
        } else
        if (window.scrollY < 50) {
            root.style.setProperty('--multinavbar-menu-PaddingY', rootStyle.getPropertyValue('--multinavbar-menu-MaxPaddingY'));
        }
        if (window.scrollY > 150 && multi_navbar_topbar && multi_navbar_topbar_Collapsable) {
            multi_navbar_topbar.style.height = '0px';
            multi_navbar_topbar.style.paddingTop = '0px';
            multi_navbar_topbar.style.paddingBottom = '0px';
        } else
        if (window.scrollY < 50 && multi_navbar_topbar) {
            multi_navbar_topbar.style.height = '24px';
            multi_navbar_topbar.style.paddingTop = '10px';
            multi_navbar_topbar.style.paddingBottom = '10px';
        }
    };

    if (multi_navbar) {
        multi_navbar_addButtons();
        set_multi_navbar();
        window.addEventListener('resize', set_multi_navbar);
        window.addEventListener('scroll', set_multi_navbar);

        document.querySelectorAll('.multi-navbar nav ul li a').forEach(function (menuItem, i) {
            menuItem.addEventListener('click', (event) => {
                root.style.setProperty('--multi-navbar-nav-ul-Right', -parseInt(getComputedStyle(root).getPropertyValue('--multinavbar-offcanvas-Width')) + 'px');
                if (i > 0 && menuItem.getAttribute('href').substring(0, 1) === '#') {
                    event.preventDefault();
                    if (hp && getComputedStyle(hp).getPropertyValue('display') === 'flex') {
                        var offset = multi_navbar.classList.contains('multi-navbar-aside') && getComputedStyle(multi_navbar_Nav).getPropertyValue('display') === 'block' ? parseFloat(getComputedStyle(multi_navbar).getPropertyValue('width')) : 0;
                        var posY = document.querySelector(menuItem.getAttribute('href')).offsetLeft - offset;
                    } else {
                        var offset = multi_navbar.classList.contains('multi-navbar-aside') && getComputedStyle(multi_navbar_Nav).getPropertyValue('display') === 'block' ? 0 : parseFloat(getComputedStyle(multi_navbar).getPropertyValue('height'));
                        var posY = document.querySelector(menuItem.getAttribute('href')).offsetTop - offset;
                    }
                    window.scrollTo({
                        top: posY,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        subMenus.forEach(function (subMenu, i) {
            subMenu.addEventListener('mouseover', (event) => {
                if (multi_navbar && multi_navbar_Nav_Ul && subMenus) {
                    if (parseInt(getComputedStyle(multi_navbar_Nav_Ul).getPropertyValue('--multi-navbar-nav-ul-Right')) === 0 || multi_navbar.classList.contains('multi-navbar-aside')) {
                        subMenus.forEach(function (subMenu, i) {
                            subMenu.style.position = 'relative';
                            subMenu.style.marginTop = -13 + 'px';
                        });
                    } else {
                        var subMenuTop = parseInt(getComputedStyle(multi_navbar).getPropertyValue('height')) + 'px';
                        subMenus.forEach(function (subMenu, i) {
                            subMenu.style.position = 'absolute';
                            subMenu.style.marginTop = '0';
                        });
                    }
                    multi_navbar.style.setProperty('--multi-navbar-submenu-top', subMenuTop);
                }
            });
        });

        document.querySelector('.btn-hamburger').addEventListener('click', () => {
            root.style.setProperty('--multi-navbar-nav-ul-Right', '0');
        });
    }

    /* ---------
     *  counter
     * --------- */

    const COUNTERTIMESEC = getComputedStyle(root).getPropertyValue('--counter-TimeSeconds');

    var countersTimers = [];
    var cTi = [];
    var counters = document.getElementsByClassName('counter');
    for (var i = 0; i < counters.length; i++) {
        counters[i].innerHTML = '0';
        countersTimers.push(null);
        cTi.push(0);
    }

    function getOffset(obj) {
        var _x = 0;
        var _y = 0;
        while(obj && !isNaN(obj.offsetLeft) && !isNaN(obj.offsetTop)) {
            _x += obj.offsetLeft - obj.scrollLeft;
            _y += obj.offsetTop - obj.scrollTop;
            obj = obj.offsetParent;
        }
        return { top: _y, left: _x };
    }
    
    function counterPosListener() {
        for (var i = 0; i < counters.length; i++) {
            if (COUNTERTIMESEC >= 1 && COUNTERTIMESEC <= 10 && countersTimers[i] === null && parseInt(window.scrollY) + parseInt(window.innerHeight) > getOffset(counters[i]).top) {
                let aktCounter = counters[i];
                let aktcTi = cTi[i];
                let targetValue = parseInt(aktCounter.getAttribute("data-target"));
                countersTimers[i] = setInterval(function () {
                    if (parseInt((targetValue / (COUNTERTIMESEC * 1000 / 4)) * aktcTi) > targetValue) {
                        clearInterval(countersTimers[i]);
                    } else {
                        aktCounter.innerHTML = parseInt((targetValue / (COUNTERTIMESEC * 1000 / 4)) * aktcTi);
                    }
                    aktcTi++;
                }
                , COUNTERTIMESEC / 2);
            }
        }
    }

    window.addEventListener("scroll", counterPosListener);
    window.addEventListener("resize", counterPosListener);

    /* --------
     *  slider
     * -------- */

    var sliders = document.querySelectorAll('.slider');

    sliders.forEach((sliderTag, i) => {
        sliderTag.children[0].style.display = 'flex';
        sliderTag.style.overflow = 'hidden';
        // aTags duplicate
        aTags = sliderTag.children[0].children;
        aTags[aTags.length - 1].insertAdjacentHTML('afterend', sliderTag.children[0].innerHTML);
    });
    
    setSlidersImagesSize();
    window.addEventListener('resize', setSlidersImagesSize);
    
    function setSlidersImagesSize() {
        sliders.forEach((sliderTag, i) => {
            aTags = sliderTag.children[0].children;
            for (j = 0; j < aTags.length; j++) {
                if (window.innerWidth < 576) {
                    aTags[j].children[0].style.width = 246 + 'px';
                } else
                if (window.innerWidth < 768) {
                    aTags[j].children[0].style.width = 246 + 'px';
                } else
                if (window.innerWidth < 992) {
                    aTags[j].children[0].style.width = 216 + 'px';
                } else
                if (window.innerWidth < 1200) {
                    aTags[j].children[0].style.width = 296 + 'px';
                } else
                if (window.innerWidth < 1400) {
                    aTags[j].children[0].style.width = 261 + 'px';
                } else {
                    aTags[j].children[0].style.width = 306 + 'px';
                }
            }
        });
    }

    var sliderTimer = setInterval(function() {
        sliders.forEach((sliderTag, i) => {
            scrollLeft = parseFloat(getComputedStyle(sliderTag.children[0]).getPropertyValue('left'));
            sliderTag.children[0].style.left = (scrollLeft - 1) + 'px';
            if (window.innerWidth >= 1400) {
                if (Math.abs(scrollLeft) >= 330 * sliderTag.children[0].children.length / 2) {
                    sliderTag.children[0].style.left = '0';
                }
            } else
            if (window.innerWidth >= 1200) {
                if (Math.abs(scrollLeft) >= 285 * sliderTag.children[0].children.length / 2) {
                    sliderTag.children[0].style.left = '0';
                }
            } else
            if (window.innerWidth >= 992) {
                if (Math.abs(scrollLeft) >= 320 * sliderTag.children[0].children.length / 2) {
                    sliderTag.children[0].style.left = '0';
                }
            } else
            if (window.innerWidth >= 768) {
                if (Math.abs(scrollLeft) >= 240 * sliderTag.children[0].children.length / 2) {
                    sliderTag.children[0].style.left = '0';
                }
            } else
            if (Math.abs(scrollLeft) >= 270 * sliderTag.children[0].children.length / 2) {
                sliderTag.children[0].style.left = '0';
            }
        });
    }, 10);

    /* -------
     *  toTop
     * ------- */

    var toTopDiv = document.getElementById('toTop');

    if (toTopDiv) {
        var toTopStyle = getComputedStyle(document.getElementById('toTop'));
        var toTopInnerDiv = document.createElement('div');

        toTopInnerDiv.style.width = "0px";
        toTopInnerDiv.style.height = "0px";

        toTopDiv.style.position = "fixed";
        toTopDiv.style.right = "0px";
        toTopDiv.style.bottom = "0px";
        toTopDiv.style.zIndex = getComputedStyle(root).getPropertyValue('--totop-zIndex');
        toTopDiv.style.display = "none";

        var toTopLink = document.createElement('a');
        toTopLink.setAttribute('href', '#');
        toTopDiv.before(toTopLink);
        toTopLink.appendChild(toTopDiv);

        setToTop();
        window.addEventListener("scroll", setToTop);
        window.addEventListener("resize", setToTop);

        function setToTop() {
            if (hp && getComputedStyle(hp).getPropertyValue('display') === 'flex') {
                toTopInnerDiv.style.borderRight = "solid "+toTopStyle.color+" 20px";
                toTopInnerDiv.style.borderLeft = '0px';
                toTopInnerDiv.style.borderTop = "solid transparent 10px";
                toTopInnerDiv.style.borderBottom = "solid transparent 10px";
            } else {
                toTopInnerDiv.style.borderTop = '0px';
                toTopInnerDiv.style.borderBottom = "solid "+toTopStyle.color+" 20px";
                toTopInnerDiv.style.borderLeft = "solid transparent 10px";
                toTopInnerDiv.style.borderRight = "solid transparent 10px";
            }
            toTopDiv.innerHTML = toTopInnerDiv.outerHTML;
            toTopDiv.style.display = window.scrollY >= 200 ? "block" : "none";
        }
    }

    /* ----------
     *  whitebox
     * ---------- */

    var wbLinks = document.getElementsByClassName('wb-link');

    for (var i = 0; i < wbLinks.length; i++) {
        wbLinks[i].addEventListener('click', function (event) {
            event.preventDefault();
            document.body.style.overflow = 'hidden';

            lgImgFadeInTimer = setInterval(function () {}, 1);
            lgImgFadeOutTimer = setInterval(function () {}, 1);
            lgImgLoadTimer = setInterval(function () {}, 1);

            var firstScriptTag = document.querySelectorAll('body script')[0];

            // WhiteBox Container
            var whiteBoxContainer = document.createElement('div');
            whiteBoxContainer.setAttribute('id', 'wb-container');
            whiteBoxContainer.style.position = 'absolute';
            whiteBoxContainer.style.top = window.scrollY + 'px';
            whiteBoxContainer.style.left = 0;
            whiteBoxContainer.style.width = '100%';
            whiteBoxContainer.style.height = '100%';
            whiteBoxContainer.style.zIndex = 10000;
            document.body.insertBefore(whiteBoxContainer, firstScriptTag);

            // Background
            var wbBg = document.createElement('div');
            wbBg.setAttribute('id', 'wb-bg');
            wbBg.style.position = 'absolute';
            wbBg.style.top = 0;
            wbBg.style.left = 0;
            wbBg.style.width = '100%';
            wbBg.style.height = '100%';
            wbBg.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            wbBg.style.zIndex = 10001;
            document.body.insertBefore(wbBg, firstScriptTag);
            whiteBoxContainer.appendChild(wbBg);

            // Wait
            var wbWait = document.createElement('div');
            wbWait.classList.add('spinner-grow');
            wbWait.classList.add('text-light');
            wbWait.setAttribute('role', 'status');
            wbWait.style.position = 'absolute';
            wbWait.style.left = 'calc(50% - 25px)';
            wbWait.style.top = 'calc(50% - 25px)';
            wbWait.style.width = '50px';
            wbWait.style.height = '50px';
            wbWait.style.zIndex = 10008;
            wbWait.style.display = 'none';
            whiteBoxContainer.appendChild(wbWait);

            // wbData
            var lgImgLink = event.target.parentElement;
            while (lgImgLink.getAttribute('data-whitebox') === null) {
                lgImgLink = lgImgLink.parentElement;
            }
            var wbGroupName = lgImgLink.getAttribute('data-whitebox'); // pl. #group-1, #group-2...
            wbGroupName = wbGroupName.substring(1); // pl. group-1, group-2...
            var wbData = [];
            var j = 0;
            for (var i = 0; i < wbLinks.length; i++) {
                if (wbLinks[i].getAttribute('data-whitebox') === '#' + wbGroupName) {
                    wbData.push({href: wbLinks[i].getAttribute('href'), title: wbLinks[i].getAttribute('title')});
                    if (wbLinks[i].getAttribute('href') === lgImgLink.getAttribute('href')) {
                        var aktImgNum = j;
                    }
                    j++;
                }
            }

            // Close Button
            var wbCloseBtn = document.createElement('button');
            wbCloseBtn.classList.add('btn-close');
            wbCloseBtn.classList.add('btn-close-white');
            wbCloseBtn.style.position = 'absolute';
            wbCloseBtn.style.right = '2%';
            wbCloseBtn.style.top = '3%';
            wbCloseBtn.style.zIndex = 10005;
            whiteBoxContainer.appendChild(wbCloseBtn);
            wbCloseBtn.addEventListener('click', function () {
                onLoad = false;
                clearInterval(lgImgLoadTimer);
                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);
                window.removeEventListener('resize', setLgImg);
                whiteBoxContainer.remove();
                document.body.style.overflow = 'auto';
            });

            // Left Button
            var wbLeftBtn = document.createElement('a');
            wbLeftBtn.classList.add('carousel-control-prev-icon');
            wbLeftBtn.style.position = 'absolute';
            wbLeftBtn.style.left = '2%';
            wbLeftBtn.style.top = 'calc(50% - 13px)';
            wbLeftBtn.style.cursor = 'pointer';
            wbLeftBtn.style.zIndex = 10006;
            whiteBoxContainer.appendChild(wbLeftBtn);
            wbLeftBtn.addEventListener('click', function () {
                aktImgNum -= 1;
                if (aktImgNum < 0) {
                    aktImgNum = wbData.length - 1;
                }
                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);
                lgImgFadeOutTimer = setInterval(function () {
                    lgImg.style.opacity = parseFloat(lgImg.style.opacity) - 0.02;
                    if (parseFloat(lgImg.style.opacity) <= 0) {
                        lgImg.style.opacity = 0;
                        clearInterval(lgImgFadeOutTimer);
                        refreshLgImg();
                    }
                }, 10);
            });

            // Right Button
            var wbRightBtn = document.createElement('a');
            wbRightBtn.classList.add('carousel-control-next-icon');
            wbRightBtn.style.position = 'absolute';
            wbRightBtn.style.right = '2%';
            wbRightBtn.style.top = 'calc(50% - 13px)';
            wbRightBtn.style.cursor = 'pointer';
            wbRightBtn.style.zIndex = 10007;
            whiteBoxContainer.appendChild(wbRightBtn);
            wbRightBtn.addEventListener('click', function () {
                aktImgNum += 1;
                if (aktImgNum > wbData.length - 1) {
                    aktImgNum = 0;
                }
                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);
                lgImgFadeOutTimer = setInterval(function () {
                    lgImg.style.opacity = parseFloat(lgImg.style.opacity) - 0.02;
                    if (parseFloat(lgImg.style.opacity) <= 0) {
                        lgImg.style.opacity = 0;
                        clearInterval(lgImgFadeOutTimer);
                        refreshLgImg();
                    }
                }, 10);
            });

            // Title
            var wbTitle = document.createElement('p');
            wbTitle.classList.add('wb-title');
            wbTitle.style.textAlign = 'center';
            wbTitle.style.width = '100%';
            wbTitle.style.position = 'absolute';
            wbTitle.style.left = 0;
            wbTitle.style.zIndex = 10003;
            whiteBoxContainer.appendChild(wbTitle);

            // Number Label
            var wbNumberLabel = document.createElement('p');
            wbNumberLabel.classList.add('wb-numberlabel');
            wbNumberLabel.style.textAlign = 'center';
            wbNumberLabel.style.width = '100%';
            wbNumberLabel.style.position = 'absolute';
            wbNumberLabel.style.left = 0;
            wbNumberLabel.style.zIndex = 10004;
            whiteBoxContainer.appendChild(wbNumberLabel);

            var lgImg = document.createElement('img');
            window.addEventListener('resize', setLgImg);
            refreshLgImg();

            function refreshLgImg() {
                lgImg.remove();
                wbWait.style.display = 'block';
                lgImg = document.createElement('img');

                wbTitle.innerHTML = wbData[aktImgNum].title;
                wbNumberLabel.innerHTML = (aktImgNum + 1) + ' / ' + wbData.length;

                // Large Image
                lgImg.style.display = 'none';
                lgImg.style.opacity = 0;
                lgImg.setAttribute('src', wbData[aktImgNum].href);
                lgImg.setAttribute('alt', wbData[aktImgNum].title);
                lgImg.style.position = 'absolute';
                lgImg.style.width = 'auto';
                lgImg.style.zIndex = 10002;
                lgImg.classList.add('wb-lg-img');
                whiteBoxContainer.appendChild(lgImg);

                clearInterval(lgImgFadeInTimer);
                clearInterval(lgImgFadeOutTimer);

                onLoad = true;
                setLgImg();
            }

            function setLgImg() {
                clearInterval(lgImgLoadTimer);
                lgImgLoadTimer = setInterval(function () {
                    if (lgImg.naturalWidth > 0) {
                        if (onLoad) {
                            onLoad = false;
                            clearInterval(lgImgLoadTimer);
                            clearInterval(lgImgFadeInTimer);
                            clearInterval(lgImgFadeOutTimer);
                            lgImgFadeInTimer = setInterval(function () {
                                lgImg.style.opacity = parseFloat(lgImg.style.opacity) + 0.02;
                                if (parseFloat(lgImg.style.opacity) >= 1) {
                                    lgImg.style.opacity = 1;
                                    clearInterval(lgImgFadeInTimer);
                                }
                            }, 10);
                        }
                        wbWait.style.display = 'none';
                        lgImg.style.maxWidth = 4/5 * window.innerWidth + 'px';
                        lgImg.style.maxHeight = 4/5 * window.innerHeight + 'px';
                        lgImg.style.display = 'block';
                        lgImg.style.top = Math.round((window.innerHeight - lgImg.clientHeight) / 2) - 6 + 'px';
                        lgImg.style.left = Math.round((window.innerWidth - lgImg.clientWidth) / 2 - 6) + 'px';
                        wbNumberLabel.style.top = Math.round((window.innerHeight - lgImg.clientHeight) / 2 - 4 - 2 * parseFloat(getComputedStyle(root).getPropertyValue('--wb-FontSize'))) + 'px';
                        wbTitle.style.top = Math.round(lgImg.clientHeight + (window.innerHeight - lgImg.clientHeight) / 2 + 10) + 'px';
                        whiteBoxContainer.style.top = Math.round(window.scrollY) + 'px';
                    }
                }, 10);
            }
        });
    }

});