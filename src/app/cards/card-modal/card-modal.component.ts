import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CardModalComponent>,
    private fb: FormBuilder,
    private cardService: CardService,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public dialogData: Card
  ) { }

  ngOnInit(): void {
    console.log(this.dialogData);
    this.cardForm = this.fb.group({
      name: [this.dialogData?.name || '', Validators.maxLength(50)],
      title: [this.dialogData?.title || '', [Validators.required, Validators.maxLength(255)]],
      phone: [this.dialogData?.phone || '', [Validators.required, Validators.maxLength(20)]],
      email: [this.dialogData?.email || '', [Validators.email, Validators.maxLength(50)]],
      address: [this.dialogData?.address || '', Validators.maxLength(255)]
    })
  }

  addCard(): void {
    this.showSpinner = true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe({
        next: (res: any) => {
          this.getSucces(res || 'Kartvizit başarıyla eklendi.');
        },
        error: (err: any) => {
          this.getError(err.message || 'Bir hata oluştu.');
        }
      });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cardService.updateCard(this.cardForm.value, this.dialogData.id)
      .subscribe({
        next: (res: any) => {
          this.getSucces(res || 'Kartvizit başarıyla güncellendi.');
        },
        error: (err: any) => {
          this.getError(err.message || 'Bir hata oluştu.');
        }
      });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cardService.deleteCard(this.dialogData.id)
      .subscribe({
        next: (res: any) => {
          this.getSucces(res || 'Kartvizit başarıyla silindi.');
        },
        error: (err: any) => {
          this.getError(err.message || 'Bir hata oluştu.');
        }
      });
  }

  getSucces(message: string): void {
    this.snackbarService.createSnackBar('success', message);
    this.cardService.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar('error', message);
    this.showSpinner = false;
  }
}
