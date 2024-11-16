import { getRouterInformation } from "../util/render.util";
import { AppComponent } from "./app.component";
import { AppCardDetailComponent } from "./components/card-detail/card-detail.component";
import { AppCardListComponent } from "./components/card-list/card-list.component";
import { AppCreateCardComponent } from "./components/create-card/create-card.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { AppHeaderComponent } from "./components/header/header.component";
import { AppHomeComponent } from "./components/home/home.component";
import { AppMainComponent } from "./components/main/main.component";
import { AppPageNotFoundComponent } from "./components/page-not-found/page-not-found.component";


const routerLinkList: { [x: string]: any } = { // router url and the corresponding export class of component
    '': new AppHomeComponent, // new [class_name] has used to get instance of class, in this case export class of component
    'card-list': new AppCardListComponent,
    'create-card': new AppCreateCardComponent,
    'edit-card': new AppCreateCardComponent,
    'card-detail': new AppCardDetailComponent,
    'page-not-found': new AppPageNotFoundComponent
}

const routerElementIdList = [ // ids of element which has used to display component based on router
    'app-home',
    'app-card-list',
    'app-create-card',
    'app-card-detail',
    'app-page-not-found'
]

function removeElement() {
    routerElementIdList.forEach(id => { // For each time router change, remove component which display earlier. Here I have removed all component whose id present at 'routerElementIdList'
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = ''; // remove innerHTML at parent element of component to hide a component
        }
    })
}

export function navigateTo(route: string, id: string | undefined | null) { // move router based on 'route' and if 'id' present will add as params
    const component = routerLinkList?.[route]; // current component instance which will display
    if (component) {
        removeElement(); // remove older component
        history.pushState({}, '', `#${route}${id ? `?id=${id}` : ''}`); // Change the URL without reloading the page and id added as a params
        component?.render(); // here 'render()' present indide each component which responsiable to add 'innerHTML' of component inside correspond parents element based on id. If any function present inside 'render()' of class then that will also run
    } else {
        navigateTo('page-not-found', null);
    }
}

const elementsWithListener = new Set<Element>();
export function renderRouter() { // This function has used to find 'data-route attribute and value of this attribute has used as a router path.
    const routerElements = document.querySelectorAll('[data-route]'); // Select all elements with the `data-route` attribute
    routerElements.forEach(element => {
        if (!elementsWithListener.has(element)) { // Only add an event listener if it hasn't been added already
            element.addEventListener('click', (event: Event) => { // add a click event function on 'routerElements' element on click redirect
                const target = event.currentTarget as HTMLElement; // 'event.currentTarget' give element on which click event apply
                const route = target.getAttribute('data-route') || ''; // get 'data-route' attribute value
                const id = target.getAttribute('data-id'); // get 'data-id' attribute value if present
                navigateTo(route, id);
                setActiveClassForRouter();
            });
            elementsWithListener.add(element); // Add the element to the set to mark it as having a listener
        }
    });
}


export function loadComponents(): void { // Tis function is the initial point for router, this function has called inside 'app.module.ts' 
    (new AppComponent()).render();
    (new AppHeaderComponent()).render();
    (new AppFooterComponent()).render();
    (new AppMainComponent()).render();
    renderRouter();
    initialPageLoad();
}

function initialPageLoad() { // Set router when first time load page at browser
    const urlInformation = getRouterInformation(); // ger router path and 'id' params
    navigateTo(urlInformation[0], urlInformation[1]);
    window.addEventListener('popstate', changeRouterBasedOnHistory); // // Add function on 'popstate' event, means change router based on browser router history
    setActiveClassForRouter();
}

function changeRouterBasedOnHistory() { // This function call when router change based on browser router history. It will call when clich on browser's default 'go back' and 'go forward' button 
    const urlInformation = getRouterInformation(); // ger router path and 'id' params
    const component = routerLinkList[urlInformation[0]]; // get component based on router
    if (component) {
        removeElement(); // remove older component
        component?.render(); // render component based on router
    }
}

function setActiveClassForRouter() { // This has used to add a class 'router-active' to router element which is currently active
    const activeRouterClass = 'router-active';
    const routerElements = document.querySelectorAll('[data-route]');
    const urlInformation = getRouterInformation(); // ger router path and 'id' params
    routerElements.forEach(element => {
        const route = element.getAttribute('data-route');
        if (urlInformation[0] == route) {
            element.classList.add(activeRouterClass);
        } else {
            element.classList.remove(activeRouterClass);
        }
    });
}