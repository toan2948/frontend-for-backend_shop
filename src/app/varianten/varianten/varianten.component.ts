import { Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../service/token.service";
import {OptionService} from "../../service/option.service";
import ProductOptionValue from "../../Model/productOptionValue";
import Option from "../../Model/option";

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-varianten',
  templateUrl: './varianten.component.html',
  styleUrls: ['./varianten.component.css']
})
export class VariantenComponent implements OnInit {


  optionCodes: string[] = []; // t_shirt_size,dress_size,dress_height,jeans_size,t_shirt_color
  // ProductOptionValue is a typescript model
  optionValues: ProductOptionValue[][] = []; //S, M, L, XL, Petite, tall, regular, white, black
  sizeArray: string[] = []; // hold the values of selected sizes

  selectedOptionValues: string[]=[]; // // hold all selected values and sent to the function ˇaddVariant()

  flagCheckbox: boolean [] = [];
  checkStatusCheckboxPreis: boolean []=[];
  checkStatusCheckboxSalePreis: boolean []=[];
  disableStatusCheckboxPreis: boolean [] = [];
  disableStatusCheckboxSalePreis: boolean [] = [];
  preis: number [] = [];
  salePreis: number [] = [];


  // properties of chips
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes = [ENTER] as const;

  //test variables
  categories: Option[] =[
  ];
  //
  // codeValue = new FormControl( '',[
  //   Validators.required]);
  //

  codeValue = this.fb.control( '',[
    Validators.required]);
  //


  addCategory(){
    let newOption: Option ={code:'', values: []};
    newOption.code = this.codeValue.value;
    this.categories.push(newOption);
    this.codeValue.setValue(null);
    console.log('categories', this.categories);
  }

  removeCategory(cat: Option){
    let i = this.categories.indexOf(cat);
    this.categories.splice(i,1);
    this.updateVariant();
  }

  updateVariant(){
    //todo: deal with the case in which 2 empty categories are added, then add a value to one category (no variant will display)
    //make the list of variant empty
    this.selectedOptionValues.splice(0,this.selectedOptionValues.length);
    let length: number = this.categories.length;
    if(length == 1){
      console.log('cat[0] = ', this.categories[0].values);
      this.selectedOptionValues = this.categories[0].values.slice();
    }
    else if(length > 1){
      let bufferArray: string[] =[];
      let bufferArray2: string[] =[];
      bufferArray = this.categories[0].values.slice();
      for(let i: number= 0; i < (length -1); i ++){
        bufferArray.forEach(element => {
          this.categories[i+1].values.forEach(element2 => {
            let k = element.concat(' ', element2);
            console.log('new element from cross product ', k);
            bufferArray2.push(k);
          })
        })
        //make the bufferArray empty
        // @ts-ignore
        bufferArray.splice(0, bufferArray.length);
        //copy the bufferArray2 to bufferArray
        bufferArray = bufferArray2.slice();
        //empty the this.selectedOptionValues
        this.selectedOptionValues.splice(0,this.selectedOptionValues.length);
        //copy the bufferArray2 to this.selectedOptionValues
        this.selectedOptionValues = bufferArray2.slice();
        // @ts-ignore
        //empty the bufferArray2
        bufferArray2.splice(0, bufferArray2.length);
      }
    }
    console.log('selectedArray', this.selectedOptionValues);
    this.addVariant();
  }

  addValue(category: Option, event: MatChipInputEvent): void {

    //trim() will remove all spaces in a string
    const value = (event.value || '').trim();

    // Add the value to our optionValue
    if (value) {
      category.values.push(value);
    }

    // Clear the input value (clear the inputted character from the input field.
    //chipInput!, ! is a typescript syntax,
    event.chipInput!.clear();
    console.log('the added cat::', category.values);
    this.updateVariant();
  }

  removeValue(category: Option, value: string): void {
    console.log('code:', category);
    //let i = this.categories.findIndex((element) => element.code == code);
    //console.log(i, ': ', this.categories[i]);
    console.log(this.categories);
    let x = category.values.indexOf(value);
    if (x >= 0) {
      category.values.splice(x, 1);
    }
    if(category.values.length == 0) {
      let i = this.categories.findIndex((element) => element.code == category.code);
      this.categories.splice(i, 1);
    }
    this.updateVariant();
  }

  submitVariantArray(){
    // this.optionService.postNewOption()
  }


  constructor(
    private tokenService: TokenService,
    private optionService: OptionService,
    private fb: FormBuilder,
  ) {

  }
  ngOnInit(): void {
    this.runGetProductOptionCodes();
  }
  optionForm = new FormGroup({
    option: new FormControl()
  });

  variantArrayForm = this.fb.group({
    variant: this.fb.array([
    ]),
  });

  get variant() {
    return this.variantArrayForm.get('variant') as FormArray;
  }

  addVariant() {
    // get the array
    let variantArr = this.variantArrayForm.get('variant') as FormArray;

    // make the old array empty first
    variantArr.clear();

    //create the entries of the array
    this.selectedOptionValues.forEach(
        (element) => {
        let newVariant = this.fb.group({
          // [] below is not array, it holds only one value
          selectedOptionValueControl2: [null],
          preis2: [null],
          sale_preis2: [null]
        });
        variantArr.push(newVariant);
      }
    );
  }

  changeCheckboxOption(event: Event, i:number) {
    let variantArr = this.variantArrayForm.get('variant') as FormArray;
    console.log(i);
    // @ts-ignore
    console.log(event.target.checked);
    // @ts-ignore
    if(event.target.checked) {
      // change the value of selectedOptionValueControl2 of this entry i-th
      // @ts-ignore
      variantArr.at(i).patchValue({selectedOptionValueControl2: event.target.value});
      this.flagCheckbox[i] = true;
      this.disableStatusCheckboxPreis[i] = false;
      this.disableStatusCheckboxSalePreis[i] = false;
      // @ts-ignore
      this.preis[i] = null;
      // @ts-ignore
      this.salePreis[i] = null;
      console.log( this.checkStatusCheckboxPreis[i], this.checkStatusCheckboxSalePreis[i]);
    }
    // @ts-ignore
    if (event.target.checked == false){
            variantArr.at(i).patchValue({selectedOptionValueControl2: '', preis2:'', sale_preis2:''});

            this.checkStatusCheckboxPreis[i]=false;
            this.checkStatusCheckboxSalePreis[i] = false;
            this.flagCheckbox[i] = false;

            this.disableStatusCheckboxPreis[i] = true;
            this.disableStatusCheckboxSalePreis[i] = true;
            console.log('checked', this.checkStatusCheckboxPreis, this.checkStatusCheckboxSalePreis);
          }
  }
  changeCheckboxPreis(event: Event, i: number){

    let variantArr = this.variantArrayForm.get('variant') as FormArray;
    // @ts-ignore
    if (event.target.checked == true) {
        // // @ts-ignore
        // variantArr.at(i)['controls'].preis2.value = event.target.value;
        // @ts-ignore
        variantArr.at(i).patchValue({sale_preis2:null});
        // @ts-ignore
        this.checkStatusCheckboxPreis[i] = true;
        this.checkStatusCheckboxSalePreis[i] = false;
        // @ts-ignore
        this.salePreis[i] = null;
        // @ts-ignore
      console.log(event.target.checked, variantArr.at(i)['controls'].preis2.value);
      }
      // @ts-ignore
      if (event.target.checked == false){
        // @ts-ignore
        variantArr.at(i).patchValue({preis2: null});
        // @ts-ignore
        console.log(event.target.checked, variantArr.at(i)['controls'].preis2.value);

      }

  }
  changeCheckboxSalePreis(event: Event, i:number){
    let variantArr = this.variantArrayForm.get('variant') as FormArray;
    // @ts-ignore
    if (event.target.checked == true) {
      // // @ts-ignore
      // variantArr.at(i)['controls'].preis2.value = event.target.value;
      // @ts-ignore
      variantArr.at(i).patchValue({preis2:null});
      // @ts-ignore
      this.checkStatusCheckboxPreis[i] = false;
      this.checkStatusCheckboxSalePreis[i] = true;
      // @ts-ignore
      this.preis[i] = null;
      // @ts-ignore
      console.log(event.target.checked, variantArr.at(i)['controls'].sale_preis2.value);
    }
    // @ts-ignore
    if (event.target.checked == false){
      // @ts-ignore
      variantArr.at(i).patchValue({sale_preis2: null});
      // @ts-ignore
      console.log(event.target.checked, variantArr.at(i)['controls'].sale_preis2.value);
    }
  }
  getPreis(event: Event, i: number){
       let variantArr = this.variantArrayForm.get('variant') as FormArray;
      if(this.checkStatusCheckboxPreis[i]){
        //@ts-ignore
        variantArr.at(i).patchValue({preis2: event.target.value});
      }
  }
  getSalePreis(event: Event, i: number){
    let variantArr = this.variantArrayForm.get('variant') as FormArray;
    if(this.checkStatusCheckboxSalePreis[i]){
      //@ts-ignore
      variantArr.at(i).patchValue({sale_preis2: event.target.value});
    }
  }
  runGetProductVariants(){
      this.optionService.getProductVariants().subscribe(
        res => {
          console.log(res);
    }
      );
  }

  runGetProductOptionCodes(){
    this.optionService.getProductOptions().subscribe
    (
      res => {
        console.log(res);
        // map() is not RXJS operator, it is a javascript
        this.optionCodes = res.map(option => option.code );
      }
  );
    console.log('option codes:' + this.optionCodes);
  }
  runGetProductOptionValues() {
    // optionValues: ProductOptionValue[][] = []; //S, M, L, XL, Petite, tall, regular, white, black
    for ( let optionCode of this.optionCodes) {
      this.optionService.getProductOptionValues(optionCode).subscribe(
        res => {
          // @ts-ignore
          this.optionValues[optionCode] = res;
          // @ts-ignore
          console.log('option values' + this.optionValues);
        });
      //** click on 'get Option values' then click on 'show option values' to display the option values
      // see the function showArrayOfOptionValues()
    }
  }

  showArrayOfOptionValues(){
    // @ts-ignore
    console.log(this.optionValues['t_shirt_size'][1].translations.de_DE.value);
    // the console will result the string "M"

    console.log('array of option values', this.optionValues);
  }

}
