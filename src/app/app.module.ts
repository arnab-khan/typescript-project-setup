import { loadComponents } from "./app.router";

export class AppModule {
  constructor() {
  }

  bootstrap(){
    loadComponents();
  }
}