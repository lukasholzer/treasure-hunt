import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

@Injectable()
export class Countdown {


  /** The ref of the countdown overlay */
  private _overlayRef: OverlayRef | null;

  constructor(private overlay: Overlay) {}

  open() {
    const overlayConfig = new OverlayConfig({
      panelClass: ['count-down'],
    });

    this._overlayRef = this.overlay.create(overlayConfig);
    this._overlayRef.hostElement.classList.add('count-down');
    this._overlayRef.hostElement.style.setProperty('--progress-duration', '20s');
  }
}
