import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPerson, faStore } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable, of, tap } from 'rxjs';
import { SalesPersonQueryListResponse } from '../../core/services/models/sales-person-query-list-response.model';
import { DistrictDetailsService } from './district-details.service';

@Component({
  selector: 'app-district-details',
  standalone: true,
  imports: [
    CommonModule,
    SplitterModule,
    CardModule,
    ButtonModule,
    TagModule,
    FontAwesomeModule,
    TableModule,
    DragDropModule,
  ],
  templateUrl: './district-details.component.html',
  styleUrl: './district-details.component.scss',
  host: { class: 'h-full w-full' },
})
export class DistrictDetailsComponent implements OnInit {
  @Input() id!: number;

  public faPerson = faPerson;
  public faStore = faStore;
  public salesPersons$: Observable<SalesPersonQueryListResponse[]> = of();
  public district$ = this.districtDetailsService.districtState$;
  public availableSalesPersons: SalesPersonQueryListResponse[] = [];
  public selectedPrimarySalesPerson!: SalesPersonQueryListResponse;
  public selectedSecondarySalesPerson: SalesPersonQueryListResponse[] = [];
  public isLoading = false;

  private draggedAvailableSalesPerson: SalesPersonQueryListResponse | undefined | null;
  private draggedSecondarySalesPerson: SalesPersonQueryListResponse | undefined | null;

  constructor(private districtDetailsService: DistrictDetailsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.district$ = this.districtDetailsService.districtState$.pipe(
      tap((district) => {
        this.selectedPrimarySalesPerson = district.primarySalesPerson;
        this.selectedSecondarySalesPerson = district.secondarySalesPersons;
        this.isLoading = false;
      }),
    );
    this.salesPersons$ = this.districtDetailsService
      .getSelectedSalesPersonsFromDistrict(this.district$)
      .pipe(tap((response) => (this.availableSalesPersons = response)));
    this.districtDetailsService.dispatchDistrict(this.id);
  }

  dragAvailableSalesPersonStart(salesPerson: SalesPersonQueryListResponse) {
    this.draggedAvailableSalesPerson = salesPerson;
  }

  dropAvailableSalesPerson(target: string) {
    if (this.draggedAvailableSalesPerson) {
      if (target === 'secondary') {
        if (!this.isSalesPersonUsed) {
          this.selectedSecondarySalesPerson = [
            ...this.selectedSecondarySalesPerson,
            this.draggedAvailableSalesPerson,
          ];
        }
      }
      if (target === 'primary') {
        if (!this.isSalesPersonUsed) {
          this.selectedPrimarySalesPerson = this.draggedAvailableSalesPerson;
        }
      }
      this.draggedAvailableSalesPerson = null;
    }
  }

  dragAvailableSalesPersonEnd() {
    this.draggedAvailableSalesPerson = null;
  }

  dragSecondarySalesPersonStart(salesPerson: SalesPersonQueryListResponse) {
    this.draggedSecondarySalesPerson = salesPerson;
  }

  dragSecondarySalesPersonEnd() {
    this.draggedSecondarySalesPerson = null;
  }

  removeSecondarySalesPerson() {
    if (this.draggedSecondarySalesPerson) {
      if (this.selectedSecondarySalesPerson.length > 1) {
        const removed = this.selectedSecondarySalesPerson.filter(
          (sp) => sp.id !== this.draggedSecondarySalesPerson?.id,
        );
        this.selectedSecondarySalesPerson = [...removed];
      }
      this.draggedSecondarySalesPerson = null;
    }
  }

  updateDistrictSalesPerson() {
    this.isLoading = true;
    this.districtDetailsService.updateDistrictSalesPersons(
      this.id,
      this.selectedPrimarySalesPerson,
      this.selectedSecondarySalesPerson,
    );
  }

  resetDistrictSalesPerson() {
    this.isLoading = true;
    this.districtDetailsService.dispatchDistrict(this.id);
  }

  private get isSalesPersonUsed() {
    if (this.draggedAvailableSalesPerson) {
      const hasSecondarySalesPerson = this.selectedSecondarySalesPerson.some(
        (sp) => sp.id === this.draggedAvailableSalesPerson!.id,
      );
      const hasPrimarySalesPerson =
        this.selectedPrimarySalesPerson.id === this.draggedAvailableSalesPerson.id;
      return hasPrimarySalesPerson || hasSecondarySalesPerson;
    }

    return false;
  }
}
