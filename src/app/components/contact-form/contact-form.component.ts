import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  imports: [FormsModule],
})
export class ContactFormComponent {
  public subject = signal<string>('');

  public name = signal('');
  public phoneNumber = signal('');
  public message = signal('');
  public isLoading = signal(false);
  public formSubmitted = signal(false);
  public errorMessage = signal('');

  private modalService = inject(NgbModal);

  public onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 15) value = value.substring(0, 15);
    this.phoneNumber.set(value);
    input.value = value;
  }

  public onPhoneKeyPress(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  public onSubmit(): void {
    this.errorMessage.set('');

    if (!this.name().trim()) {
      this.errorMessage.set('Please enter your name');
      return;
    }
    if (this.phoneNumber().length < 7) {
      this.errorMessage.set('Please enter a valid phone number');
      return;
    }

    this.isLoading.set(true);

    const templateParams = {
      subject: this.subject(),
      from_name: this.name(),
      phone: this.phoneNumber(),
      message: this.message(),
      date: new Date().toLocaleString('ru-RU'),
      to_email: environment.emailjs.toEmail,
    };

    emailjs
      .send(
        environment.emailjs.serviceId,
        environment.emailjs.templateId,
        templateParams,
        environment.emailjs.publicKey,
      )
      .then((_response: EmailJSResponseStatus) => {
        this.isLoading.set(false);
        this.formSubmitted.set(true);
      })
      .catch(() => {
        this.isLoading.set(false);
        this.errorMessage.set('Sending error. Please try again or contact us directly.');
      });
  }

  public close(): void {
    this.modalService.dismissAll();
  }
}
