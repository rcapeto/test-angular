import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UsePaginationParams, PaginationState } from './pagination.types'

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() page: number = 1
  @Input() registersPerPage: number = 10
  @Input() totalCountOfRegisters: number = 0

  state: PaginationState = { 
    initialPageItem: 0, 
    lastPage: 0, 
    maxItemPerPage: 0, 
    nextPages: [], 
    previousPages: [], 
    siblingsCount: 0 
  }

  ngOnInit() {
    this.state = this.usePagination({ 
      currentPage: this.page, 
      registersPerPage: this.registersPerPage, 
      totalCountOfRegisters: this.totalCountOfRegisters  
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("@@ changes", changes)
  }

  usePagination({ currentPage, registersPerPage, totalCountOfRegisters }: UsePaginationParams) {
    const siblingsCount = 1;

    const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

    const previousPages = currentPage > 1 ? this.generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : [];
    const nextPages = currentPage < lastPage ? this.generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : [];

    const maxItemPerPage = registersPerPage * currentPage;
    const initialPageItem = currentPage > 1 ? (currentPage * registersPerPage + 1) - registersPerPage : 1;

    return {
      previousPages,
      nextPages,
      lastPage,
      maxItemPerPage,
      initialPageItem,
      siblingsCount
    };
  }

  generatePagesArray(to: number, from: number) {
    return [...new Array(to - from)]
      .map((_, index) => from + index + 1)
      .filter(page => page > 0);
  }
}
