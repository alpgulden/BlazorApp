const verita = {
    mobileHeader: () => {
        const root = document.documentElement
        const header = document.querySelector('.vt-header')
        const navbarContainer = document.querySelector('.vt-header__navigation')
        const navbar = document.getElementById('vt-navbar')

        if(navbar && navbarContainer){
            navbar.addEventListener('show.bs.collapse', () => {
                navbarContainer.style.maxHeight = `calc(100vh - ${header.offsetHeight}px)`
                navbarContainer.style.top = `${header.offsetHeight}px`
                root.classList.add('disable-scroll')
            })
            navbar.addEventListener('hidden.bs.collapse', () => {
                root.classList.remove('disable-scroll')
            })        
        }

    },

    homeHero: () => {
        const hero = document.querySelector('.js-hero-slider')

        if(hero){

            const prev = hero.querySelector('.js-slider-prev')
            const next = hero.querySelector('.js-slider-next')
            const pager = hero.querySelector('.swiper-pagination')

            const heroSlider = new Swiper(hero.querySelector('.swiper'), {
                slidesPerView: 3,
                spaceBetween: 8,
                navigation: {
                    prevEl : prev,
                    nextEl: next
                },
                pagination: {
                    el: pager,
                    //dynamicBullets: true,
                    //dynamicMainBullets: 3                    
                },
                breakpoints: {
                    // when window width is >= 480px
                    480: {
                        slidesPerView: 4,
                    },
                    640: {
                        slidesPerView: 5,
                        spaceBetween: 12
                    }
                }                
            })          
        }
    },    

    advancedSearch: () => {
        // Visibility Toggle
        const toggle = document.querySelector('.js-advanced-search-toggle');
        const panel = document.getElementById('vt-advanced-search')
        if(toggle && panel){
            const reset = panel.querySelector('.js-advanced-search-clear')

            // Toggle Label
            panel.addEventListener('show.bs.collapse', () => {
                toggle.textContent = 'Close Advanced Search'
            })
            panel.addEventListener('hide.bs.collapse', () => {
                toggle.textContent = 'Advanced Search'
            })                
            
            // Clear selection
            reset.addEventListener('click', () => {
                toggle.closest('form').reset();
            })

        }
        
        // Homepage Case Search
        const component = document.querySelector('.vt-case-search');
        if(component){
            const reset = panel.querySelector('.js-advanced-search-clear')
            // Case Status Toggles - Homepage
            const activeCasesCheck = component.querySelector('.js-case-search-active-check')
            const activeCasesPill = component.querySelector('.vt-pill-button--active')
            const nonActiveCasesCheck = component.querySelector('.js-case-search-nonactive-check')
            const nonActiveCasesPill = component.querySelector('.vt-pill-button--nonactive')

            activeCasesCheck.addEventListener('change', () => {
                if(activeCasesCheck.checked){
                    activeCasesPill.classList.remove('vt-pill-button--hide');
                } else {
                    activeCasesPill.classList.add('vt-pill-button--hide');
                }
            })

            activeCasesPill.addEventListener('click', () => {
                activeCasesPill.classList.add('vt-pill-button--hide')
                activeCasesCheck.checked = false;
            })

            nonActiveCasesCheck.addEventListener('change', () => {
                if(nonActiveCasesCheck.checked){
                    nonActiveCasesPill.classList.remove('vt-pill-button--hide');
                } else {
                    nonActiveCasesPill.classList.add('vt-pill-button--hide');
                }
            })

            nonActiveCasesPill.addEventListener('click', () => {
                nonActiveCasesPill.classList.add('vt-pill-button--hide')
                nonActiveCasesCheck.checked = false;
            })

            // Clear selection
            reset.addEventListener('click', () => {
                nonActiveCasesPill.classList.add('vt-pill-button--hide');
                activeCasesPill.classList.remove('vt-pill-button--hide');
            })            
        }

    },

    accordionSearch: () => {
        let timer        
        let interval = 500
        const accordionInputs = document.querySelectorAll('[vt-accordion-search]')
        
        if(accordionInputs){
            accordionInputs.forEach( (input) => {
                const parent = input.closest('.vt-accordion')
                const items = parent.querySelectorAll('.accordion-item')

                input.addEventListener('keyup', () => {
                    clearTimeout(timer)
                    timer = setTimeout(verita.liveSearch(input.value, items), interval)
                })                
            })
        }
    },

    caseUpdates: () => {
        const lists = document.querySelectorAll('.js-case-updates')
        if(lists){
            lists.forEach((list) => {
                const items = list.querySelectorAll('.vt-update')
                if(items){
                    const count = items.length;
                    const toggle = list.parentNode.querySelector('.js-cases-expand');
                    let open = true;

                    if(count > 3){
                        toggle.parentNode.classList.add('show');
                        toggleItems();
                    }
                    
                    function toggleItems(){
                        if(open){   
                            toggle.innerText = 'Show More'
                            toggle.classList.remove('toggle-open')
                            const hiddenItems = list.querySelectorAll('.vt-update:nth-child(n+4)');
                            hiddenItems.forEach(item => {
                                item.classList.add('hide')
                            })
                            open = false
                        } else {
                            toggle.innerText = 'Show Less'
                            toggle.classList.add('toggle-open')
                            items.forEach(item => {
                                item.classList.remove('hide')
                            })
                            open = true
                        }
                    }
                    
                    toggle.addEventListener('click', () => {
                        toggleItems();
                    })

                }
            })
        }
    },    

    updatesList: () => {
        const lists = document.querySelectorAll('.js-updates-list')
        if(lists){
            lists.forEach((list) => {
                const items = list.querySelectorAll('.vt-update')
                if(items){
                    items.forEach((item) => {
                        const toggle = item.querySelector('.js-update-expand')
                        const copy = item.querySelector('.vt-update__copy')

                        if(copy.offsetHeight > 130){
                            copy.classList.add('clipped')
                            toggle.classList.add('visible')

                            toggle.addEventListener('click', () => {
                                copy.classList.toggle('clipped')
                                if(!toggle.classList.contains('show-less')){
                                    toggle.classList.add('show-less')
                                    toggle.innerText = 'Show less'
                                } else {
                                    toggle.classList.remove('show-less')
                                    toggle.innerText = 'Show more'
                                }
                            })
                        }
                    })
                }
            })
        }
    },

    listViewToggle: () => {
        const toggle = document.querySelector('.js-list-view-toggle');
        const list = document.querySelector('.js-list-view');

        if(toggle && list){
            toggle.addEventListener('change', ()=> {
                list.classList.remove('vt-table-view');
                list.classList.remove('vt-list-view');
                list.classList.add(toggle.value);
            })
        }
    },

    stickyTableScroll: () => {
        const tables = document.querySelectorAll('.vt-sticky-table');
        if(tables){
            tables.forEach(table => {
                const prev = table.querySelector('.js-sticky-table-prev')
                const next = table.querySelector('.js-sticky-table-next')
                let currentPage = 0;

                if(prev && next){
                    const tableEl =  table.querySelector('table');
                    const tableWrapper =  table.querySelector('.vt-sticky-table__wrapper');
                    const headerCells = tableEl.querySelectorAll('thead th');
                    let cells = [];
                    let offsetLeft = 0;
                    let offsetCells = 0;
                    let scrollWidth;
                    let calculated;
                

                    prev.addEventListener('click', () => {
                        if(currentPage > 0){
                            currentPage--;
                            scrollTableTo(currentPage);
                        }
                    })

                    next.addEventListener('click', () => {
                        getDimensions();
                        if(tableWrapper.scrollLeft < scrollWidth){
                            currentPage++;
                            scrollTableTo(currentPage);                       
                        }
                    })                    

                    function getDimensions(){
                        if(!calculated){
                            scrollWidth = table.querySelector('thead').offsetWidth - tableWrapper.offsetWidth;
                            headerCells.forEach(cell => {
                                cells.push(cell);
                                if(getComputedStyle(cell).position == 'sticky'){
                                    offsetLeft += cell.offsetWidth
                                    offsetCells++;
                                }
                            })                           
                        }
                        calculated = true;
                    }

                    function scrollTableTo(pos){
                        const cellToScroll = cells[pos+offsetCells];
                        tableWrapper.scrollTo({
                            top: 0,
                            left: cellToScroll.offsetLeft - offsetLeft,
                            behavior: "smooth",
                        })
                    }
                }


            })
        }
    },

    ePOCForm: {
        init: function(){
            this.el = document.querySelector('.vt-epoc-form')
            if(this.el){
                this.steps = this.el.querySelectorAll('.vt-epoc-step')
                this.navs = document.querySelectorAll('.js-epoc-form-nav')
                this.footerNav = this.el.querySelector('.vt-epoc-form__nav')
                this.prevButton = this.footerNav.querySelector('.js-epoc-prev')
                this.nextButton = this.footerNav.querySelector('.js-epoc-next')
                this.submitButton = this.footerNav.querySelector('.js-epoc-submit')
                this.buildNavigation();
                this.goTo(1)
            }
        },

        buildNavigation: function(){
            this.navs.forEach(nav => {
                let i = 1;
                this.steps.forEach(step => {
                    const label = step.getAttribute('vt-epoc-step-title')
                    nav.innerHTML += `<li><a href="#" data-step="${i}">Step ${i}: ${label}</a></li>`
                    i++
                })
            })

            document.querySelectorAll('.js-epoc-form-nav').forEach(nav => {
                const links = nav.querySelectorAll('li a');
                links.forEach(link => { 
                    const anchor = link.getAttribute('data-step');
                    link.addEventListener('click', () => {
                        this.goTo(parseInt(anchor))
                    })
                })

                // Disable last step link
                links[links.length-1].parentNode.classList.add('vt-menu-item--disabled');
            })
        },
        
        updateNavigation: function(){
            // Previous button disable
            if(this.currentStep == 1){
                this.prevButton.setAttribute('disabled', true)
            } else {
                this.prevButton.removeAttribute('disabled')
            }

            // Update Nav Elements
            document.querySelectorAll('.js-epoc-form-nav').forEach(nav => {
                const items = nav.querySelectorAll('li');
                items.forEach(item => { item.classList.remove('vt-menu-item--current'); })
                items[this.currentStep-1].classList.add('vt-menu-item--current');
            })   
            
            // End of Form
            if(this.currentStep == this.steps.length){
                this.footerNav.classList.add('last-step')
                this.submitButton.removeAttribute('disabled')

                // Enable last step link
                document.querySelectorAll('.js-epoc-form-nav').forEach(nav => {
                    const links = nav.querySelectorAll('li a');
                    links[links.length-1].parentNode.classList.remove('vt-menu-item--disabled');
                })
            } else {
                this.footerNav.classList.remove('last-step')
                this.submitButton.setAttribute('disabled', true)

                // Disable last step link
                document.querySelectorAll('.js-epoc-form-nav').forEach(nav => {
                    const links = nav.querySelectorAll('li a');
                    links[links.length-1].parentNode.classList.add('vt-menu-item--disabled');
                })                
            }
        },

        goTo: function(step){
            if(step < 1) step = 1
            if(step > this.steps.length) step = this.steps.length

            this.currentStep = step

            // Update Status
            this.updateNavigation();

            // Show Step
            this.steps.forEach(step => {
                step.classList.remove('vt-epoc-step--active')
            })
            this.steps[this.currentStep - 1].classList.add('vt-epoc-step--active')

            // Scroll back to top
            window.scroll({ top: 0, left: 0, behavior: 'smooth' })
        },

        next: function(){
            this.goTo(this.currentStep + 1)
        },
        
        prev: function(){
            this.goTo(this.currentStep - 1)
        }        

    },

    showMoreToggles: () => {
        const toggles = document.querySelectorAll('.js-show-more-toggle')
        if(toggles){
            toggles.forEach(toggle => {
                const collapsingEl = document.querySelector(toggle.getAttribute('data-bs-target'));
                collapsingEl.addEventListener('show.bs.collapse', () => {
                    toggle.innerText = 'Show Less';
                    toggle.classList.add('toggle-open');
                })
                
                collapsingEl.addEventListener('hide.bs.collapse', () => {
                    toggle.innerText = 'Show More';
                    toggle.classList.remove('toggle-open');
                })                
            })
        }
    },

    multiselect: () => {
        const selects = document.querySelectorAll('.vt-multiselect')
        if(selects){
            selects.forEach(select => {
                const selectAll = select.querySelector('.selectall');
                const inputs = select.querySelectorAll('input[type=checkbox]:not(.selectall)')
                if(selectAll){
                    selectAll.addEventListener('change', () => {
                        if(selectAll.checked == true){
                            inputs.forEach(input => {
                                input.checked = false;
                            })
                        }
                    })
    
                    inputs.forEach(input => {
                        input.addEventListener('change', () => {
                            if(input.checked == true){
                                selectAll.checked = false;
                            }
                        })
                    })
                }
            })
        }
    },    
}

document.addEventListener("DOMContentLoaded", function() {
    verita.mobileHeader()
    verita.homeHero()
    verita.advancedSearch()
    verita.accordionSearch()
    verita.listViewToggle()
    verita.multiselect()
    verita.caseUpdates()
    verita.updatesList()
    verita.stickyTableScroll()
    verita.showMoreToggles()
    verita.ePOCForm.init()
}) 