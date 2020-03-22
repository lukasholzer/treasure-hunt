import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {

  @HostBinding('style.--avatar-image')
  @Input()
  get image(): string { return this._image; }
  set image(image: string) {
    this._image = `url(${image})`;
  }
  private _image: string;

  @Input() gold: number;
  @Input() fire: number;
  @Input() empty: number;

  @Input() name: string;

  @HostBinding('class.is-small')
  get isSmall(): boolean {
    return !Boolean(this.name);
  }
}
