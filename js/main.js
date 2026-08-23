/* =========================================
   ELPIDA'S EDEM
   GLOBAL JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* CURRENT YEAR */
    document.querySelectorAll("[data-current-year]").forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    /* SMOOTH INTERNAL LINKS */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* MOBILE MENU */
    const menuButton = document.querySelector("[data-menu-button]");
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const isOpen = mobileMenu.classList.toggle("is-open");

            mobileMenu.classList.toggle("open", isOpen);

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                mobileMenu.classList.remove(
                    "is-open",
                    "open"
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            });
        });
    }

    /* ACTIVE NAVIGATION */
    const currentPage =
        window.location.pathname.split("/").pop().toLowerCase()
        || "index.html";

    document.querySelectorAll(".nav-links a").forEach(function (link) {

        const href = link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("#")[0]
               .split("/")
               .pop()
               .toLowerCase();

        if (linkPage && linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    /* BACK TO TOP */
    const backToTop =
        document.querySelector("[data-back-to-top]");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            backToTop.classList.toggle(
                "is-visible",
                window.scrollY > 500
            );
        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* GALLERY MODAL */
    const galleryModal =
        document.querySelector("[data-gallery-modal]");

    const galleryModalImage =
        document.querySelector("[data-gallery-modal-image]");

    const galleryClose =
        document.querySelector("[data-gallery-close]");

    function closeGallery() {

        if (!galleryModal) return;

        galleryModal.classList.remove("is-open");

        document.body.classList.remove("modal-open");
    }

    function openGallery(image) {

        if (
            !galleryModal ||
            !galleryModalImage ||
            !image
        ) {
            return;
        }

        galleryModalImage.src = image;

        galleryModal.classList.add("is-open");

        document.body.classList.add("modal-open");
    }

    if (galleryModal && galleryModalImage) {

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

        document
            .querySelectorAll("[data-gallery-item]")
            .forEach(function (item) {

                item.addEventListener(
                    "click",
                    function () {

                        openGallery(
                            this.getAttribute(
                                "data-gallery-item"
                            )
                        );
                    }
                );
            });
    }
    
        /* LANGUAGE SELECTOR */
    const languageSelector =
        document.querySelector(
            "[data-language-selector]"
        );

    if (languageSelector) {

        languageSelector.addEventListener(
            "change",
            function () {

                if (this.value) {

                    localStorage.setItem(
                        "elpidas-edem-language",
                        this.value
                    );
                }
            }
        );

        const savedLanguage =
            localStorage.getItem(
                "elpidas-edem-language"
            );

        if (savedLanguage) {
            languageSelector.value = savedLanguage;
        }
    }

    /* CONTACT FORM */
    const contactForm =
        document.querySelector("[data-contact-form]");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

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

    /* BOOKING DATE HELPERS */
    const checkIn =
        document.querySelector("[data-check-in]");

    const checkOut =
        document.querySelector("[data-check-out]");

    if (checkIn && checkOut) {

        checkIn.addEventListener(
            "change",
            function () {

                if (!this.value) return;

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

    /* BOOKING GUEST COUNTER */
    const guestInput =
        document.querySelector("[data-guests]");

    const guestPlus =
        document.querySelector("[data-guests-plus]");

    const guestMinus =
        document.querySelector("[data-guests-minus]");

    if (guestInput) {

        const minGuests = 1;
        const maxGuests = 4;

        if (guestPlus) {

            guestPlus.addEventListener(
                "click",
                function () {

                    guestInput.value =
                        Math.min(
                            (parseInt(
                                guestInput.value,
                                10
                            ) || minGuests) + 1,
                            maxGuests
                        );
                }
            );
        }

        if (guestMinus) {

            guestMinus.addEventListener(
                "click",
                function () {

                    guestInput.value =
                        Math.max(
                            (parseInt(
                                guestInput.value,
                                10
                            ) || minGuests) - 1,
                            minGuests
                        );
                }
            );
        }
    }

    /* SCROLL REVEAL */
    const revealElements =
        document.querySelectorAll("[data-reveal]");

    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }
                    });
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
       SUPABASE PROPERTY PHOTOS
       ========================================= */

    const SUPABASE_URL =
        "https://sducfanvyqokjngkuzyr.supabase.co";

    const SUPABASE_KEY =
        "sb_publishable_yQpc2rLBi98hBR0pDtjcYQ_pZxVXiuW";

    const PHOTO_BUCKET =
        "property-photos";

    function photoUrl(name) {

        return (
            SUPABASE_URL +
            "/storage/v1/object/public/" +
            PHOTO_BUCKET +
            "/" +
            name
                .split("/")
                .map(encodeURIComponent)
                .join("/")
        );
    }
    
            async function loadPropertyPhotos() {

        /*
         * EXPLICIT PHOTO MAPPING
         *
         * We do NOT use the order returned by Supabase.
         * Each page position receives a specific photo.
         */

        const PHOTO_LIVING =
            photoUrl(
                "1787445773858_IMG_5803.png"
            );

        const PHOTO_BEDROOM =
            photoUrl(
                "1787445824758_IMG_5803.png"
            );

        const PHOTO_KITCHEN =
            photoUrl(
                "1787447203859_IMG_5803.png"
            );

        const PHOTO_BALCONY =
            photoUrl(
                "IMG_5756.jpeg"
            );

        /*
         * Map the visible photo placeholders
         * according to their position in rooms.html.
         */

        const slots =
            Array.from(
                document.querySelectorAll(
                    ".hero-placeholder, " +
                    ".intro-image, " +
                    ".room-photo"
                )
            );

        if (!slots.length) return;

        /*
         * rooms.html order:
         *
         * 1. Main apartment       -> Living
         * 2. Master bedroom       -> Bedroom
         * 3. Second bedroom       -> Bedroom
         * 4. Living room         -> Living
         * 5. Kitchen             -> Kitchen
         * 6. Dining area         -> Kitchen
         * 7. Bathroom            -> no photo
         * 8. Balcony             -> Balcony
         * 9. Sea view            -> Balcony
         */

        const photoMapping = [
            PHOTO_LIVING,
            PHOTO_BEDROOM,
            PHOTO_BEDROOM,
            PHOTO_LIVING,
            PHOTO_KITCHEN,
            PHOTO_KITCHEN,
            null,
            PHOTO_BALCONY,
            PHOTO_BALCONY
        ];

        slots.forEach(function (slot, index) {

            const url =
                photoMapping[index];

            /*
             * If there is no assigned photo,
             * leave the placeholder untouched.
             */

            if (!url) return;

            slot.style.backgroundImage =
                "linear-gradient(" +
                "rgba(8,35,52,.18)," +
                "rgba(8,35,52,.18)" +
                "), url(\"" +
                url +
                "\")";

            slot.style.backgroundSize =
                "cover";

            slot.style.backgroundPosition =
                "center";

            slot.style.backgroundRepeat =
                "no-repeat";

            slot.classList.add(
                "has-property-photo"
            );

            const note =
                slot.querySelector(
                    ".photo-note"
                );

            if (note) {

                note.style.background =
                    "rgba(0,0,0,.28)";
            }
        });
    }
    
            /* LOAD PROPERTY PHOTOS */
    loadPropertyPhotos();

    console.log(
        "Elpida's Edem website initialized."
    );

});