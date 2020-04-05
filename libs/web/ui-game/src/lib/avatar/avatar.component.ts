import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent {
  @ViewChild('avatar', { static: true })
  avatar: ElementRef<HTMLDivElement>;

  @Input()
  set image(image: string) {
    this._image = `url(${image})`;
    this.avatar.nativeElement.style.backgroundImage = this._image;
    this._changeDetectorRef.markForCheck();
  }
  private _image: string;

  @Input() size: 'small' | 'large' | 'xlarge';

  @Input() gold: number;
  @Input() fire: number;
  @Input() empty: number;

  @Input() name: string;

  @HostBinding('class.is-small')
  get isSmall(): boolean {
    return (this.size && this.size === 'small') ?? !Boolean(this.name);
  }

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}
}
