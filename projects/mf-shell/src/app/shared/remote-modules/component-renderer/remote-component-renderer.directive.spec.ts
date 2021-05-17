import { RemoteComponentRenderer } from './remote-component-renderer.directive';

describe('RemoteComponentRendererDirective', () => {
  it('should create an instance', () => {
    const directive = new RemoteComponentRenderer(null, null, null);
    expect(directive).toBeTruthy();
  });
});
