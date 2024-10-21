import { AppComponent } from "./app.component";
import { AppFooterComponent } from "./components/footer/footer.component";
import { AppHeaderComponent } from "./components/header/header.component";

export class AppModule {
  constructor() {
  }

  bootstrap(): void {
    (new AppComponent()).render();
    (new AppHeaderComponent()).render();
    (new AppFooterComponent()).render();
  }
}