import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import Option from "../Model/option";
import OptionValues from "../Model/optionValues";
import Taxon from "../Model/taxon";

@Injectable({
  providedIn: 'root'
})
export class OptionService {
   httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    accept: 'application/json'
  });
  urlProductOption = environment.apiBaseAdminUrl + 'product-options';
  urlProductOptionCodeValue = '';
  urlProductVariant = environment.apiBaseAdminUrl + 'product-variants';
  urlProductTaxon = environment.apiBaseAdminUrl + 'taxons';


  constructor(private http: HttpClient) { }

  //Retrieves the collection of ProductOptionValue resources.
  getUrlProductOptionCodeValue(codeforUrl: string){
    //ex of code: t_shirt_size
    this.urlProductOptionCodeValue =  environment.apiBaseAdminUrl + 'product-options/'+ codeforUrl +'/values';
    return this.urlProductOptionCodeValue;
  }

  getProductOptions(): Observable<Option[]> {

    return this.http.get<Option[]>(this.urlProductOption, {headers: this.httpHeaders});

  }

  getProductOptionValues(codeForUrl: string): Observable<any> {
    //ex of codeForURL: t_shirt_size
    this.getUrlProductOptionCodeValue(codeForUrl);
    return this.http.get<OptionValues[]>(this.urlProductOptionCodeValue, {headers: this.httpHeaders});
    //@@ result example:
    // {
    //   "@context": "/api/v2/contexts/ProductOptionValue",
    //   "@id": "/api/v2/admin/product-options/t_shirt_size/values",
    //   "@type": "hydra:Collection",
    //   "hydra:member": [
    //   {
    //     "@id": "/api/v2/admin/product-option-values/t_shirt_size_s",
    //     "@type": "ProductOptionValue",
    //     "id": 16901,
    //     "code": "t_shirt_size_s",
    //     "option": "/api/v2/admin/product-options/t_shirt_size",
    //     "translations": {
    //       "de_DE": {
    //         "@type": "ProductOptionValueTranslation",
    //         "@id": "_:9525",
    //         "id": 135090,
    //         "value": "S"
    //       }
    //     },
    //     "value": "S"
    //   },
    //   {
    //     "@id": "/api/v2/admin/product-option-values/t_shirt_size_m",
    //     "@type": "ProductOptionValue",
    //     "id": 16902,
    //     "code": "t_shirt_size_m",
    //     "option": "/api/v2/admin/product-options/t_shirt_size",
    //     "translations": {
    //       "de_DE": {
    //         "@type": "ProductOptionValueTranslation",
    //         "@id": "_:9561",
    //         "id": 135098,
    //         "value": "M"
    //       }
    //     },
    //     "value": "M"
    //   }
    //   ]
  }


  getProductVariants(){
    return this.http.get(this.urlProductVariant, {headers: this.httpHeaders});
  }

  postNewOption(data: Option){
    return this.http.post<Option>(this.urlProductOption,data, {headers: this.httpHeaders});
  }

  //update the values of an existing option
  putExistingOption(code: string, data: Option){
      return this.http.put(`${this.urlProductOption}/${code}`, data, {headers: this.httpHeaders} )
  }

  getTaxons(): Observable<Taxon[]>{
    return this.http.get<Taxon[]>(`${this.urlProductTaxon}`, {headers: this.httpHeaders})
  }

}
