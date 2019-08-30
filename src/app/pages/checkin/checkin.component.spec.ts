import {async, TestBed} from '@angular/core/testing';
import {CheckinComponent} from './checkin.component';
import {FormsModule} from '@angular/forms';
import {WebcamComponent} from 'ngx-webcam';

describe('CheckinComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckinComponent,
        WebcamComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(CheckinComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(CheckinComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Ngx-Webcam Demo');
  }));
});
