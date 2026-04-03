import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private modalService = inject(NgbModal);

  public openForm(subject: string): void {
    const ref = this.modalService.open(ContactFormComponent, {
      size: 'md',
      centered: true,
      backdrop: true,
      windowClass: 'aura-modal',
    });
    ref.componentInstance.subject.set(subject);
  }
}
