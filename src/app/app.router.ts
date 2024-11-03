import { getRouterInformation } from "../util/render.util";
import { AppComponent } from "./app.component";
import { AppCardDetailComponent } from "./components/card-detail/card-detail.component";
import { AppCardListComponent } from "./components/card-list/card-list.component";
import { AppCreateCardComponent } from "./components/create-card/create-card.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { AppHeaderComponent } from "./components/header/header.component";
import { AppHomeComponent } from "./components/home/home.component";
import { AppMainComponent } from "./components/main/main.component";


const routerLinkList: { [x: string]: any } = {
    '': new AppHomeComponent,
    'card-list': new AppCardListComponent,
    'create-card': new AppCreateCardComponent,
    'edit-card': new AppCreateCardComponent,
    'card-detail': new AppCardDetailComponent,
}

const removeElementIdsForChangeRouter = [
    'app-home',
    'app-card-list',
    'app-create-card',
    'app-card-detail'
]

function removeElement() {
    removeElementIdsForChangeRouter.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = '';
        }
    })
}

export function navigateTo(route: string, id: string | undefined | null) {
    const component = routerLinkList[route];
    if (component) {
        removeElement();
        history.pushState({}, '', `#${route}${id ? `?id=${id}` : ''}`); // Change the URL without reloading the page
        component?.render(); //render component based on router
    }
}

const elementsWithListener = new Set<Element>();
export function renderRouter() {
    // Select all elements with the `data-route` attribute
    const routerElements = document.querySelectorAll('[data-route]');

    routerElements.forEach(element => {
        // Only add an event listener if it hasn't been added already
        if (!elementsWithListener.has(element)) {
            element.addEventListener('click', (event: Event) => {
                const target = event.currentTarget as HTMLElement;
                const route = target.getAttribute('data-route') || '';
                const id = target.getAttribute('data-id');
                navigateTo(route, id);
            });

            // Add the element to the set to mark it as having a listener
            elementsWithListener.add(element);
        }
    });
}


export function loadComponents(): void {
    (new AppComponent()).render();
    (new AppHeaderComponent()).render();
    (new AppFooterComponent()).render();
    (new AppMainComponent()).render();
    renderRouter();
    initialPageLoad();
}

function initialPageLoad() {
    const urlInformation = getRouterInformation();
    navigateTo(urlInformation[0], urlInformation[1]);
    window.addEventListener('popstate', changeRouterBasedOnHistory);
}

function changeRouterBasedOnHistory() {
    const urlInformation = getRouterInformation();
    const component = routerLinkList[urlInformation[0]];
    if (component) {
        removeElement();
        component?.render(); //render component based on router
    }
}