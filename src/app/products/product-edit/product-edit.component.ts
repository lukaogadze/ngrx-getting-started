import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {Product} from '../product';
import {GenericValidator} from '../../shared/generic-validator';
import {NumberValidators} from '../../shared/number.validator';
import {select, Store} from '@ngrx/store';

import * as fromProductReducer from '../state/product.reducer';
import {getCurrentProductSelector, getErrorSelector} from '../state/product.selector';
import {ClearCurrentProductAction, CreateProductAction, DeleteProductAction, UpdateProductAction} from '../state/product.action';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'pm-product-edit',
    templateUrl: './product-edit.component.html',
    styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
    pageTitle: string;
    errorMessage$: Observable<string | undefined> | undefined;
    productForm: FormGroup | undefined;

    product: Product | undefined;


    displayMessage: { [key: string]: string } = {};
    private readonly _validationMessages: { [key: string]: { [key: string]: string } };
    private readonly _genericValidator: GenericValidator;

    constructor(private readonly fb: FormBuilder,
                private readonly _store: Store<fromProductReducer.State>) {
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

        // TODO Refactor
        this._store.pipe(select(getCurrentProductSelector)).subscribe(
            currentProduct => this.displayProduct(currentProduct)
        );


        this.productForm.valueChanges.subscribe(
            () => this.displayMessage = this._genericValidator.processMessages(this.productForm!)
        );

        this.errorMessage$ = this._store.pipe(select(getErrorSelector));
    }


    // Also validate on blur
    // Helpful if the user tabs through required fields
    blur(): void {
        this.displayMessage = this._genericValidator.processMessages(this.productForm!);
    }

    displayProduct(product: Product | undefined): void {
        // Set the local product property
        this.product = product;

        if (this.product) {
            // Reset the form back to pristine
            this.productForm!.reset();

            // Display the appropriate page title
            if (this.product.id === 0) {
                this.pageTitle = 'Add Product';
            } else {
                this.pageTitle = `Edit Product: ${this.product.productName}`;
            }

            // Update the data on the form
            this.productForm!.patchValue({
                productName: this.product.productName,
                productCode: this.product.productCode,
                starRating: this.product.starRating,
                description: this.product.description
            });
        }
    }

    cancelEdit(): void {
        // Redisplay the currently selected product
        // replacing any edits made
        this.displayProduct(this.product);
    }

    deleteProduct(): void {
        if (this.product && this.product.id) {
            if (confirm(`Really delete the product: ${this.product.productName}?`)) {
                this._store.dispatch(new DeleteProductAction(this.product.id));
            }
        } else {
            this._store.dispatch(new ClearCurrentProductAction());
        }
    }

    saveProduct(): void {
        if (this.productForm!.valid) {
            if (this.productForm!.dirty) {
                const p = {...this.product, ...this.productForm!.value};

                if (p.id === 0) {
                    this._store.dispatch(new CreateProductAction(p));
                } else {
                    this._store.dispatch(new UpdateProductAction(p));
                }
            }
        } else {
            this.errorMessage$ = of('Please correct the validation errors.');
        }
    }

}
