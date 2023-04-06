import { Pipe, PipeTransform } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor, isCompositeFilterDescriptor } from '@progress/kendo-data-query';

const flatten = (filter: CompositeFilterDescriptor): FilterDescriptor[] => {
    const filters = (filter || {}).filters;
    if (!filters) {
        return [];
    }

    return filters.reduce((result, current) =>
    // @ts-ignore
        result.concat(isCompositeFilterDescriptor(current) ? flatten(current) : current),
        []
    );
};

/**
 * A pure pipe used to extract the filter values from the provided filter descriptors.
 */
@Pipe({
    // eslint-disable-next-line @angular-eslint/pipe-prefix
    name: 'filterValue'
})
export class FilterValuePipe implements PipeTransform {

  public transform(filter: CompositeFilterDescriptor): unknown {
    if (!filter.filters.length) {
      return null
    }

    return (filter.filters as FilterDescriptor[])[0].value
  }
}
