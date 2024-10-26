import { AppComponent } from "./app.component";
import { AppCardDetailComponent } from "./components/card-detail/card-detail.component";
import { AppCardListComponent } from "./components/card-list/card-list.component";
import { AppCreateCardComponent } from "./components/create-card/create-card.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { AppHeaderComponent } from "./components/header/header.component";
import { AppHomeComponent } from "./components/home/home.component";
import { AppMainComponent } from "./components/main/main.component";


const routerLinkList: { [x: string]: any } = {
    'home': new AppHomeComponent,
    'card-list': new AppCardListComponent,
    'create-card': new AppCreateCardComponent,
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

export function navigateTo(route: string) {
    history.pushState({}, '', `#${route}`); // Change the URL without reloading the page
    removeElement();
    const component = routerLinkList[route];
    if (component) {
        component?.render(); //render component based on router
    }
}

export function renderRouter() {
    document.body.addEventListener('click', (event: any) => {
        console.log(event.target);

        if (event.target.matches('.menu-item')) {
            const route = event.target.getAttribute('data-route');
            navigateTo(route)
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
    const router = window.location.hash.replace('#', '');
    navigateTo(router);
}