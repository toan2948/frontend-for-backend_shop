import {ChangeDetectorRef, Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenService} from "../../service/token.service";
import {OptionService} from "../../service/option.service";
import {Observable} from "rxjs";
import ProductOptionValue from "../../Model/productOptionValue";
import Option from "../../Model/option";
import {buffer, last} from "rxjs/operators";
import {MatCheckbox} from "@angular/material/checkbox";
import set = Reflect.set;
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-varianten',
  templateUrl: './varianten.component.html',
  styleUrls: ['./varianten.component.css']
})
export class VariantenComponent implements OnInit {


  optionCodes: string[] = []; // t_shirt_size,dress_size,dress_height,jeans_size,t_shirt_color
  // ProductOptionValue is a typescript model
  optionValues: ProductOptionValue[][] = []; //S, M, L, XL, Petite, tall, regular, white, black
  optionValue_Size_Buffer: string[] = ['X','S','M']; //S, M, L, XL,
  optionValue_Color_Buffer: string [] = ['white', 'black'];
  sizeArray: string[] = []; // hold the values of selected sizes
  colorArray: string[] = []; // hole the values of selelcted colors

  selectedOptionValues: string[]=[]; // // hold all selected values and sent to the function ˇaddVariant()

  flagCheckbox: boolean [] = [];
  checkStatusCheckboxPreis: boolean []=[];
  checkStatusCheckboxSalePreis: boolean []=[];
  disableStatusCheckboxPreis: boolean [] = [];
  disableStatusCheckboxSalePreis: boolean [] = [];
  // test: FormControl = this.variantArrayForm.get('selectedOptionValueControl2') as FormControl;
  preis: number [] = [];
  salePreis: number [] = [];


  // properties of chips
  selectable = true;
  removable = true;
  addOnBlur = false;
  readonly separatorKeysCodes = [ENTER] as const;
  //
  otherOption: string[] = [
  ];
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

  optionValueCtrl = new FormControl();
  sizeValueCtrl = new FormControl();
  filteredValues: Observable<string[]> | undefined;
  filteredSizeValues: Observable<string[]> | undefined;
  allSuggestedValues: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  allSuggestedSizes: string[] = ['XXS','XS','S', 'M','L', 'XL', 'XXL'];
  allSuggestedColor: string[] = ['red', 'orange', 'yellow', 'chartreuse green','spring green','cyan', 'azure', 'blue', 'violet', 'magenta', 'rose'];
  @ViewChild('valueOptionInput') valueOptionInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('valueSizeInput') valueSizeInput: ElementRef<HTMLInputElement> | undefined;

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
    // const index = this.sizeArray.indexOf(value);
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


  constructor(
    private tokenService: TokenService,
    private optionService: OptionService,
    private fb: FormBuilder,
  ) {
    this.filteredValues = this.optionValueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filter(value) : this.allSuggestedValues.slice()));

    this.filteredSizeValues = this.sizeValueCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => value ? this._filterSize(value) : this.allSuggestedSizes.slice()));

  }
  // options: string[] = ['One', 'Two', 'Three'];
  ngOnInit(): void {
    this.runGetProductOptionCodes();
  }

  // the function is to select one value from Autocomplete
  selected(event: MatAutocompleteSelectedEvent): void {
    this.otherOption.push(event.option.viewValue);
    // @ts-ignore
    this.valueOptionInput.nativeElement.value = '';
    this.optionValueCtrl.setValue(null);
    //todo: remove the selected value from the allSuggestedValues
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSuggestedValues.filter(value => value.toLowerCase().includes(filterValue));
  }


  private _filterSize(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allSuggestedSizes.filter(value => value.toLowerCase().includes(filterValue));
  }
  selectedSize(event: MatAutocompleteSelectedEvent): void {
    this.sizeArray.push(event.option.viewValue);
    // @ts-ignore
    this.valueSizeInput.nativeElement.value = '';
    this.sizeValueCtrl.setValue(null);
  }
  // a simple form array
  // tForm = new FormArray([
  //   new FormControl('ar'),
  //   new FormControl('2')
  // ]);

  // profileForm = this.fb.group({
  //   email: [''],
  //   userName: new FormArray([
  //    this.fb.group({
  //      name:[''],
  //      age:['']
  //    })
  //   ])
  // });

  //
  // get getUserName() {
  //   return this.profileForm.get('userName') as FormArray;
  // }
  //
  // addUsername() {
  //   let userNameArr = this.profileForm.get('userName') as FormArray;
  //   let newUserNAme = this.fb.group({
  //     name: [''],
  //     age: ['']
  //   });
  //   userNameArr.push(newUserNAme);
  //   // this.getUserName.push(this.fb.group({}));
  // }
  //
  // removeUserName(i: number){
  //   let userNameArr = this.profileForm.get('userName') as FormArray;
  //   userNameArr.removeAt(i);
  // }


  optionForm = new FormGroup({
    option: new FormControl()
  });

  OptionValueForm = new FormGroup({
    optionValues: new FormControl()
  });

  // variantForm = new FormGroup({
  //   selectedOptionValueControl: new FormControl(''),
  //   preis: new FormControl(),
  //   sale_preis: new FormControl()
  // });

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
  // select an option and then assign its values to a buffer, ths buffer will be shown in the option values area.
  selectOption(){
    console.log(this.optionForm.value);
    this.optionService.getProductOptionValues(this.optionForm.value.option).subscribe(
      res => {
        console.log(res);
        this.optionValue_Size_Buffer = res.map((option: { translations: { de_DE: { value: string; }; }; }) => option.translations.de_DE.value);
      console.log('optionValue_Size_Buffer: '+ this.optionValue_Size_Buffer);
      }
    )
  }

  // select the values of
  // and then use those values for adding entries of the variant form.
  selectOptionValues(){
    this.selectedOptionValues = this.OptionValueForm.value.optionValues;
    console.log(this.selectedOptionValues);
    this.addVariant();
  }

  // @@ used with checkboxes

  //search for an array of an option depending the name of the array, then add and remove values to/from that array by
  // the function addToOneOptionArray()
  selectOptionValues2(event: Event){
    //if the option is size
    // @ts-ignore
    if((event.target.name).substring(0,4) == "size") {
      this.addToOneOptionArray(event, this.sizeArray);
    }
    //if option is color
    // @ts-ignore
    if((event.target.name).substring(0,4) == "colo") {
      this.addToOneOptionArray(event, this.colorArray);
    }
    }

    //add and remove values to/from an array of an option
    addToOneOptionArray(event:Event, array: string[]){
      // @ts-ignore
      if (event.target.checked) {
        // @ts-ignore
        array.push(event.target.value);
        this.renewSelectedValueArray();
      }
      // @ts-ignore
      if (!event.target.checked) {
        //return the index of the lement satisfying the condition
        // @ts-ignore
        let i = array.findIndex(element => element == event.target.value);
        //*** or: let i = array.indexOf(event.target.value)
        //remove 1 item at the position i
        array.splice(i, 1);
        this.renewSelectedValueArray();
      }
      // console.log('add/remove: ',array);
    }

    renewSelectedValueArray(){
    //make the array empty first
      this.selectedOptionValues.splice(0,this.selectedOptionValues.length);
      let optionArray: string [][] = [];
      if(this.sizeArray.length !=0 ){
       optionArray.push(this.sizeArray);
      }
      if(this.colorArray.length !=0){
        optionArray.push(this.colorArray);
      }
      let arrTest = ['a', 'b'];
      optionArray.push(arrTest);
      if(optionArray.length==1){
        this.selectedOptionValues =  optionArray[0].slice();
      }
      if(optionArray.length > 1){
        let bufferArray =[];
        let bufferArray2: string[] =[];
        bufferArray = optionArray[0].slice();
      for(let i= 0; i< optionArray.length -1; i++){
        bufferArray.forEach(element => {
            optionArray[i+1].forEach(element2 => {
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


  // runGetProductOptionValues() {
  //   for (let optionCode of this.optionCodes) {
  //     this.optionService.getProductOptionValues(optionCode).subscribe(
  //       res => {
  //         // *** use push to create a multi-dimensions array
  //         this.optionValues.push(res);
  //          console.log(this.optionValues);
  //       });
  //   }
  // }
  //
  // showArrayOfOptionValues(){
  //   console.log(this.optionValues[0][1].translations.de_DE.value);
  //   // the abloce will result the string "M"
  // }

  // end block @@ used with checkboxes

  //@@ used with Chips


  //@@end: use with Chip

  runGetProductOptionCodes(){
    this.optionService.getProductOptions().subscribe
    (
      res => {
        console.log(res);
        this.optionCodes = res.map(option => option.code );
        console.log('option codes:' + this.optionCodes);
      }
    );
  }
  runGetProductOptionValues() {
    for ( let optionCode of this.optionCodes) {
      this.optionService.getProductOptionValues(optionCode).subscribe(
        res => {
          // @ts-ignore
          this.optionValues[optionCode] = res;
           console.log('option values' + this.optionValues);
        });
    }
  }

  showArrayOfOptionValues(){
    // @ts-ignore
    console.log(this.optionValues['t_shirt_size'][1].translations.de_DE.value);
    // the abloce will result the string "M"
    console.log(this.optionValues);
  }

  submitVariantArray(){

  }

}
