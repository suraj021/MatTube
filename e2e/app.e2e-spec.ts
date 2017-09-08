import { MatTubePage } from './app.po';

describe('mat-tube App', () => {
  let page: MatTubePage;

  beforeEach(() => {
    page = new MatTubePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
