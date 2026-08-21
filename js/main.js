/* =========================================
   ELPIDA'S EDEM
   GLOBAL JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       CURRENT YEAR
       ========================================= */

    const yearElements = document.querySelectorAll("[data-current-year]");

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    /* =========================================
       SMOOTH INTERNAL LINKS
       ========================================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       MOBILE MENU
       ========================================= */

    const menuButton = document.querySelector("[data-menu-button]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const isOpen =
                mobileMenu.classList.toggle("is-open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        mobileMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove("is-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =========================================
       ACTIVE NAVIGATION
       ========================================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href.split("#")[0]
                .split("/")
                .pop()
                .toLowerCase();

        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /* =========================================
       BACK TO TOP
       ========================================= */

    const backToTop =
        document.querySelector("[data-back-to-top]");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                backToTop.classList.add("is-visible");

            } else {

                backToTop.classList.remove("is-visible");

            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       SIMPLE GALLERY
       ========================================= */

    const galleryItems =
        document.querySelectorAll("[data-gallery-item]");

    const galleryModal =
        document.querySelector("[data-gallery-modal]");

    const galleryModalImage =
        document.querySelector("[data-gallery-modal-image]");

    const galleryClose =
        document.querySelector("[data-gallery-close]");

    if (
        galleryItems.length &&
        galleryModal &&
        galleryModalImage
    ) {

        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                const image =
                    this.getAttribute("data-gallery-item");

                if (!image) {
                    return;
                }

                galleryModalImage.src = image;

                galleryModal.classList.add("is-open");

                document.body.classList.add("modal-open");

            });

        });


        function closeGallery() {

            galleryModal.classList.remove("is-open");

            document.body.classList.remove("modal-open");

        }


        if (galleryClose) {

            galleryClose.addEventListener(
                "click",
                closeGallery
            );

        }


        galleryModal.addEventListener(
            "click",
            function (event) {

                if (event.target === galleryModal) {
                    closeGallery();
                }

            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeGallery();
                }

            }
        );

    }


    /* =========================================
       LANGUAGE SELECTOR
       ========================================= */

    const languageSelector =
        document.querySelector("[data-language-selector]");

    if (languageSelector) {

        languageSelector.addEventListener(
            "change",
            function () {

                const language =
                    this.value;

                if (!language) {
                    return;
                }

                localStorage.setItem(
                    "elpidas-edem-language",
                    language
                );

            }
        );


        const savedLanguage =
            localStorage.getItem(
                "elpidas-edem-language"
            );

        if (savedLanguage) {

            languageSelector.value =
                savedLanguage;

        }

    }


    /* =========================================
       CONTACT FORM
       ========================================= */

    const contactForm =
        document.querySelector(
            "[data-contact-form]"
        );

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                /*
                 * The form will later be connected
                 * to the real email/backend system.
                 */

                event.preventDefault();

                const message =
                    document.querySelector(
                        "[data-form-message]"
                    );

                if (message) {

                    message.textContent =
                        "Thank you. Your message is ready to be sent.";

                    message.classList.add(
                        "is-visible"
                    );

                }

            }
        );

    }


    /* =========================================
       BOOKING DATE HELPERS
       ========================================= */

    const checkIn =
        document.querySelector(
            "[data-check-in]"
        );

    const checkOut =
        document.querySelector(
            "[data-check-out]"
        );

    if (checkIn && checkOut) {

        checkIn.addEventListener(
            "change",
            function () {

                if (!this.value) {
                    return;
                }

                checkOut.min = this.value;

                if (
                    checkOut.value &&
                    checkOut.value <= this.value
                ) {

                    checkOut.value = "";

                }

            }
        );

    }


    /* =========================================
       BOOKING GUEST COUNTER
       ========================================= */

    const guestInput =
        document.querySelector(
            "[data-guests]"
        );

    const guestPlus =
        document.querySelector(
            "[data-guests-plus]"
        );

    const guestMinus =
        document.querySelector(
            "[data-guests-minus]"
        );

    if (guestInput) {

        const minGuests = 1;
        const maxGuests = 4;

        if (guestPlus) {

            guestPlus.addEventListener(
                "click",
                function () {

                    let value =
                        parseInt(
                            guestInput.value,
                            10
                        ) || minGuests;

                    value =
                        Math.min(
                            value + 1,
                            maxGuests
                        );

                    guestInput.value =
                        value;

                }
            );

        }


        if (guestMinus) {

            guestMinus.addEventListener(
                "click",
                function () {

                    let value =
                        parseInt(
                            guestInput.value,
                            10
                        ) || minGuests;

                    value =
                        Math.max(
                            value - 1,
                            minGuests
                        );

                    guestInput.value =
                        value;

                }
            );

        }

    }


    /* =========================================
       SCROLL REVEAL
       ========================================= */

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );

    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );

        revealElements.forEach(
            function (element) {

                observer.observe(element);

            }
        );

    }


    /* =========================================
       CONSOLE MESSAGE
       ========================================= */

    console.log(
        "Elpida's Edem website initialized."
    );

});
