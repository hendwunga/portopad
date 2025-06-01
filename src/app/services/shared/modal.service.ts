import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ModalData {
  isOpen: boolean;
  data?: any;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private readonly _modalState = new BehaviorSubject<ModalData>({ isOpen: false });
  public readonly modalState$ = this._modalState.asObservable();

  constructor() {}

  openModal(id: string, data?: any): void {
    this._modalState.next({
      isOpen: true,
      data,
      id,
    });
    // Add overflow hidden to body to prevent background scrolling
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this._modalState.next({
      isOpen: false,
    });
    // Restore scrolling
    document.body.style.overflow = '';
  }

  get isModalOpen(): boolean {
    return this._modalState.value.isOpen;
  }
}
