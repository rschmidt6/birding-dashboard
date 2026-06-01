import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesMapComponent } from './species-map.component';

describe('SpeciesMapComponent', () => {
  let component: SpeciesMapComponent;
  let fixture: ComponentFixture<SpeciesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
