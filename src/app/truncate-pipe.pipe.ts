
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class TruncatePipePipe implements PipeTransform {

   //  transform(value: string, args: string) : string {
	  //   let limit = args ? parseInt(args, 10) : 10;
	  //   let trail = '...';
	  //   return value.length > limit ? value.substring(0, limit) + trail : value;
  	// }

  	 constructor(private sanitizer: DomSanitizer) { }
  		transform(url:any) {
   		 return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  	}

}
