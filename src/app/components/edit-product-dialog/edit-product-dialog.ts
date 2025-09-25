import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { Coffee } from '../../models/models';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product-dialog',
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
  templateUrl: './edit-product-dialog.html',
  styleUrl: './edit-product-dialog.scss'
})
export class EditProductDialog {
  form: FormGroup;
  isSaving = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Coffee,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      titulo: [data.titulo, Validators.required],
      descricao: [data.descricao, Validators.required],
      preco: [data.preco, [Validators.required, Validators.min(0)]],
      imagem: [data.imagem, Validators.required],
      availableInStock: [data.availableInStock, [Validators.required, Validators.min(0)]]
    });
  }

  save() {
    if (this.form.invalid || this.isSaving) return;

    this.isSaving = true;
    const updatedProduct: Coffee = { ...this.data, ...this.form.value };

    this.productService.editProduct(updatedProduct).subscribe({
      next: () => {
        this.snackBar.open('Produto atualizado com sucesso!', 'FECHAR', {
          duration: 1500,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close(updatedProduct);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['menu']);
         });

      },
      error: () => {
        this.snackBar.open('Erro ao atualizar produto!', 'FECHAR', {
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