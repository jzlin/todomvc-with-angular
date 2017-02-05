import { TodomvcWithAngularPage } from './app.po';

describe('todomvc-with-angular App', function() {
  let page: TodomvcWithAngularPage;

  beforeEach(() => {
    page = new TodomvcWithAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
