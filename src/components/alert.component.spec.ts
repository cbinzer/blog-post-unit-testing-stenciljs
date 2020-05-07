import { AlertComponent } from './alert.component';
import { newSpecPage } from '@stencil/core/testing';

declare var fetch: jest.Mock;

describe('AlertComponent', () => {
  beforeAll(() => {
    fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn(() => Promise.resolve('Unit Testing StencilJS')),
      })
    );
  });

  it('should change the visible state to true', () => {
    const alertComponent = new AlertComponent();
    expect(alertComponent.visible).toEqual(false);

    alertComponent.show();
    expect(alertComponent.visible).toEqual(true);
  });

  it('should render the alert', async () => {
    const page = await newSpecPage({
      components: [AlertComponent],
      html: '<cb-alert />',
    });

    expect(page.root).toEqualHtml(`
      <cb-alert class="alert">
        <mock:shadow-root>
          Unit Testing StencilJS
          <span class="close-btn">&times;</span>
        </mock:shadow-root>
      </cb-alert>
    `);
  });

  it('should make the alert visible', async () => {
    const page = await newSpecPage({
      components: [AlertComponent],
      html: '<cb-alert />',
    });
    const alertElement = page.root;
    expect(alertElement).not.toHaveClass('visible');

    const alertComponent: AlertComponent = page.rootInstance;
    alertComponent.show();
    await page.waitForChanges();
    expect(alertElement).toHaveClass('visible');
  });

  afterAll(() => {
    fetch.mockClear();
  });
});
