import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLoadingComponent } from './card-loading.component';

describe('CardLoadingComponent', () => {
  let component: CardLoadingComponent;
  let fixture: ComponentFixture<CardLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
