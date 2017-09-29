import { OtobotoChatUiPage } from './app.po';

describe('otoboto-chat-ui App', () => {
  let page: OtobotoChatUiPage;

  beforeEach(() => {
    page = new OtobotoChatUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
