import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Product} from '../../product';
import {GenericValidator} from '../../../shared/generic-validator';
import {NumberValidators} from '../../../shared/number.validator';

@Component({
    selector: 'pm-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnChanges {
    pageTitle: string;
    @Input() errorMessage: string | undefined;
    @Input() selectedProduct: Product | undefined;
    @Output() create = new EventEmitter<Product>();
    @Output() update = new EventEmitter<Product>();
    @Output() delete = new EventEmitter<Product>();
    @Output() clearCurrent = new EventEmitter<void>();

    productForm: FormGroup | undefined;
    product: Product | undefined;


    displayMessage: { [key: string]: string } = {};
    private readonly _validationMessages: { [key: string]: { [key: string]: string } };
    private readonly _genericValidator: GenericValidator;

    constructor(private readonly fb: FormBuilder) {
        this.pageTitle = 'Product Edit';

        this._validationMessages = {
            productName: {
                required: 'Product name is required.',
                minlength: 'Product name must be at least three characters.',
                maxlength: 'Product name cannot exceed 50 characters.'
            },
            productCode: {
                required: 'Product code is required.'
            },
            starRating: {
                range: 'Rate the product between 1 (lowest) and 5 (highest).'
            }
        };


        this._genericValidator = new GenericValidator(this._validationMessages);
    }

    ngOnInit(): void {
        this.productForm = this.fb.group({
            productName: ['', [Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)]],
            productCode: ['', Validators.required],
            starRating: ['', NumberValidators.range(1, 5)],
            description: ''
        });

        this.productForm.valueChanges.subscribe(
            () => this.displayMessage = this._genericValidator.processMessages(this.productForm!)
        );
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.selectedProduct) {
            const product: any = changes.selectedProduct.currentValue as Product;
            this.displayProduct(product);
        }
    }


    // Also validate on blur
    // Helpful if the user tabs through required fields
    blur(): void {
        this.displayMessage = this._genericValidator.processMessages(this.productForm!);
    }

    displayProduct(product: Product | undefined): void {
        // Set the local product property
        this.product = product;

        if (this.product && this.productForm) {
            // Reset the form back to pristine
            this.productForm.reset();

            // Display the appropriate page title
            if (this.product.id === 0) {
                this.pageTitle = 'Add Product';
            } else {
                this.pageTitle = `Edit Product: ${this.product.productName}`;
            }

            // Update the data on the form
            this.productForm.patchValue({
                productName: this.product.productName,
                productCode: this.product.productCode,
                starRating: this.product.starRating,
                description: this.product.description
            });
        }
    }

    cancelEdit(): void {
        this.displayProduct(this.product);
    }

    deleteProduct(): void {
        if (this.product && this.product.id) {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this.delete.emit(this.product);
            }
        } else {
            this.clearCurrent.emit();
        }
    }

    saveProduct(): void {
        if (this.productForm!.valid) {
            if (this.productForm!.dirty) {
                const p = {...this.product, ...this.productForm!.value};

                if (p.id === 0) {
                    this.create.emit(p);
                } else {
                    this.update.emit(p);
                }
            }
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }
}
