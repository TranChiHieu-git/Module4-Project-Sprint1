import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormGroup} from '@angular/forms';
import {NotificationService} from '../../../../services/notification.service';
import {Product} from '../../../../models/product';

@Component({
  selector: 'app-delete-product-hai',
  templateUrl: './delete-product-hai.component.html',
  styleUrls: ['./delete-product-hai.component.scss']
})
export class DeleteProductHaiComponent implements OnInit {
  @ViewChild('closeDeleteModal') closeDeleteModal;
  productId: string;
  form: FormGroup;
  product: Product;
  public productName;
  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private dialogRef: MatDialogRef<DeleteProductHaiComponent>,
              @Inject(MAT_DIALOG_DATA) {id}) {
    this.productId = id;
    this.productService.findProductById(id).subscribe(next => {

        this.productName = next.productName;
        this.product = next;
      },
      error => {
        this.notificationService.edit('Mặt hàng này đã bị xóa');
        // this.getData();
      });
  }

  ngOnInit(): void {
  }


  close(): void {
    this.dialogRef.close();
  }

  OnDelete(): void {
    this.productService.deleteProduct(this.product).subscribe(
      next => {
        this.close();
        // this.closeDeleteModal.nativeElement.click();
        this.notificationService.delete('Xóa thành công');
      },
      error => console.log(error)
    );
  }
}
