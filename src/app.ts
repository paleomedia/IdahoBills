import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Idaho Bills';
    config.map([
      { route: ['', 'Home'], name: 'Home', moduleId: './Home/home', nav: true, title: 'Home' },
      { route: ['About'], name: 'About', moduleId: './About/about', nav: true, title: 'About' },
      { route: ['Lawmakers'], name: 'Lawmakers', moduleId: './Lawmakers/lawmakers', nav: true, title: 'Lawmakers' },
      { route: ['Topics'], name: 'Topics', moduleId: './Topics/topics', nav: true, title: 'Topics' },
      { route: ['bills/:id'], name: 'BillDetails', moduleId: './BillDeails/billDetails' },
    ]);

    this.router = router;
  }
}