import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoadingComponent } from './user-loading.component';

describe('UserLoadingComponent', () => {
  let component: UserLoadingComponent;
  let fixture: ComponentFixture<UserLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
