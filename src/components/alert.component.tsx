import { Component, ComponentInterface, h, Host, State } from '@stencil/core';

@Component({
  tag: 'cb-alert',
  styleUrl: './alert.component.css',
  shadow: true,
})
export class AlertComponent implements ComponentInterface {
  @State() public visible: boolean = false;
  @State() public message: string;

  public async componentWillLoad(): Promise<void> {
    this.message = await fetch('https://cbinzer.de/blog/unit-testing-stenciljs')
      .then((response) => response.json());
  }

  public render() {
    return (
      <Host class={`alert ${this.visible ? 'visible' : ''}`}>
        {this.message}
        <span class="close-btn">&times;</span>
      </Host>
    );
  }

  public show() {
    this.visible = true;
  }
}
