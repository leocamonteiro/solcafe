import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coffee } from '../../models/models';

@Component({
  selector: 'app-add-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './add-product-dialog.html',
  styleUrl: './add-product-dialog.scss'
})
export class AddProductDialog {
  form: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialog>,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0)]],
      imagem: ['', Validators.required],
      availableInStock: [0, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.form.invalid || this.isSaving) return;

    this.isSaving = true;
    const newProduct: Coffee = this.form.value;

    this.productService.addNewProduct(newProduct).subscribe({
      next: () => {
        this.snackBar.open('Produto adicionado com sucesso!', 'FECHAR', {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close(newProduct);
      },
      error: () => {
        this.snackBar.open('Erro ao adicionar produto!', 'FECHAR', {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: ['snackbar-failure']
        });
        this.isSaving = false;
      }
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}