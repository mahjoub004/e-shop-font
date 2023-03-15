import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {

  // white espace validation
  static notOnlyWithespace(control : FormControl) : ValidationErrors{

    //check if string only contais whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {
        //invalid return error object
        return {'notOnlyWithespace': true}
    }else{
      //valid ; return null
      return null as any;
    }

  }
}
