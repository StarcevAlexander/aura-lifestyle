import { Component, inject, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { translations, Lang } from './i18n/translations';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private modalService = inject(NgbModal);
  private document = inject(DOCUMENT);

  public lang = signal<Lang>('en');
  public t = computed(() => translations[this.lang()]);
  public year = new Date().getFullYear();

  public toggleLang(): void {
    this.lang.set(this.lang() === 'en' ? 'ru' : 'en');
  }

  public scrollTo(id: string): void {
    const el = this.document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public openForm(subject: string): void {
    const ref = this.modalService.open(ContactFormComponent, {
      size: 'md',
      centered: true,
      backdrop: true,
      windowClass: 'amani-modal',
    });
    ref.componentInstance.subject.set(subject);
    ref.componentInstance.t.set(this.t().form);
  }
}
