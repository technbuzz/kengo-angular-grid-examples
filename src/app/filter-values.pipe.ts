import { Pipe, PipeTransform } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';

const flatten = (filter: CompositeFilterDescriptor): FilterDescriptor[] => {
    const filters = (filter || {}).filters;
    if (!filters) {
        return [];
    }

    return filters.reduce((result, current) =>
    // @ts-ignore
        result.concat(isCompositeFilterDescriptor(current) ? flatten(current) : [current]),
        []
    );
};

/**
 * A pure pipe used to extract the filter values from the provided filter descriptors.
 */
@Pipe({
    // eslint-disable-next-line @angular-eslint/pipe-prefix
    name: 'filterValues'
})
export class FilterValuesPipe implements PipeTransform {
    public transform(filter: CompositeFilterDescriptor): unknown[] {
    debugger
        return flatten(filter).map(descriptor => descriptor.value);

    }
}
