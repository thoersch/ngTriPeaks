import { TripeaksPage } from './app.po';

describe('tripeaks App', () => {
  let page: TripeaksPage;

  beforeEach(() => {
    page = new TripeaksPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
