import { AbstractControl, FormGroup } from "@angular/forms";
import { OrderItem } from "../models/orderItem";
import { PriceRange } from "../models/priceRange";
import { ShipCalculate } from "../models/shipCalculate";

export class funtions {
    static calculateOrderItemsInternal(orderItem: AbstractControl<OrderItem>): void {
        const flavorPriceRanges = orderItem.get("flavor")?.value?._id
            ? orderItem.get("flavor")?.value?.priceRanges
            : [];

        const quantity = orderItem.get("quantity")?.value;
        const product = orderItem.get("product")?.value;
        if (quantity && product && flavorPriceRanges) {
            const quantityPrice = this.calculatePriceByQuantity(quantity, product?.basePrice, flavorPriceRanges);
            orderItem.get("totalPrice")?.setValue(quantityPrice);
        }
    }

    static calculatePriceByQuantity(quantity: number, basePrice: number, flavorPriceRanges: PriceRange[]): number {
        let pricePerUnit = basePrice;
        let applicablePrice = basePrice;

        const sortedRanges = flavorPriceRanges?.sort((a, b) => a.minQuantity - b.minQuantity);

        for (const range of sortedRanges) {
            if (quantity >= range.minQuantity) {
                applicablePrice = range.price;
            }
        }

        pricePerUnit += applicablePrice;
        return pricePerUnit * quantity;
    }

    static shipCalculate(cartForm: FormGroup): ShipCalculate {
        const orderItems = cartForm.get("orderItems")?.value as OrderItem[];
        const totalWeight = orderItems.reduce((acc, item) => acc + item.product.weight * item.quantity, 0);

        let totalHeight = 0;
        let maxHeight = 0;
        let maxWidth = 0;
        let totalLength = 0;

        for (const item of orderItems) {
            const { height, width, length } = item.product;
            const { quantity } = item;

            maxHeight = Math.max(maxHeight, height);

            maxWidth = Math.max(maxWidth, width);

            totalLength += length * quantity;
        }

        totalHeight = maxHeight;

        const totalWidth = maxWidth;

        const totalBoxLength = totalLength;

        const volume = totalHeight * totalWidth * totalBoxLength;

        const boxDimensions = this.calculateCubicDimensions(volume);

        const ship = {
            to: {
                postal_code: cartForm.get("address.zipCode")?.value
            },
            package: {
                weight: totalWeight,
                height: boxDimensions.height,
                width: boxDimensions.width,
                length: boxDimensions.length
            }
        } as ShipCalculate;

        return ship;
    }

    static calculateCubicDimensions(volume: number): { height: number; width: number; length: number } {
        const side = Math.cbrt(volume);

        return {
            height: side,
            width: side,
            length: side
        };
    }
}
