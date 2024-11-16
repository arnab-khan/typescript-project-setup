import { loadComponents } from "./app.router";

export class AppModule {
  constructor() {
  }

  bootstrap() { // initiall load of app
    loadComponents(); // initial point of router at app.router.ts file
  }
}