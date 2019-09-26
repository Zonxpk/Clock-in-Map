import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else pinIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #pinIcon>
      <nb-icon icon="pin-outline"></nb-icon>
    </ng-template>
  `,
})
export class TreeGridIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}