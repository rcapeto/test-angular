import { Pipe, PipeTransform } from '@angular/core'
import { formatRelativeDate } from '~/app/utils/getRelativeDate'

@Pipe({
  name: 'relativeDate',
  standalone: true,
})
export class RelativeDatePipe implements PipeTransform {
  transform(value: Date | string | null, ...args: any[]) {
    if(!value) {
      return ''
    }
    
    return formatRelativeDate(value)
  }
}