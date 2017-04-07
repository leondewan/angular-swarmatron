import { SwarmPage } from './app.po';

describe('swarm App', () => {
  let page: SwarmPage;

  beforeEach(() => {
    page = new SwarmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
