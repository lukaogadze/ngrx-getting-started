import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../../product';


@Component({
    selector: 'pm-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent{
    readonly pageTitle: string;
    @Input() readonly errorMessage!: string;
    @Input() readonly displayCode!: boolean;
    @Input() readonly products: ReadonlyArray<Product> | undefined;
    @Input() readonly selectedProduct: Product | undefined;

    @Output() readonly checked: EventEmitter<boolean>;
    @Output() readonly initializeNewProduct: EventEmitter<void>;
    @Output() readonly selected: EventEmitter<Product>;

    constructor() {
        this.pageTitle = 'Products';
        this.checked = new EventEmitter<boolean>();
        this.initializeNewProduct = new EventEmitter<void>();
        this.selected = new EventEmitter<Product>();
    }

    checkChanged(value: boolean): void {
        this.checked.emit(value);
    }

    newProduct(): void {
        this.initializeNewProduct.emit();
    }

    productSelected(product: Product): void {
        this.selected.emit(product);
    }

}
