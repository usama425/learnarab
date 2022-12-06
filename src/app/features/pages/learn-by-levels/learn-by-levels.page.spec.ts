import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LearnByLevelsPage } from './learn-by-levels.page';

describe('LearnByLevelsPage', () => {
  let component: LearnByLevelsPage;
  let fixture: ComponentFixture<LearnByLevelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnByLevelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LearnByLevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
