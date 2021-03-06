/**
 * @Author: Nicolas Fazio <webmaster-fazio>
 * @Date:   14-06-2017
 * @Email:  contact@nicolasfazio.ch
 * @Last modified by:   webmaster-fazio
 * @Last modified time: 14-06-2017
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Store, Action } from '@ngrx/store'
import { Observable } from 'rxjs/Rx';

import { AppStateI } from "../../store/app-stats";
import { INavState } from "../../store/reducers/navigationReducer";
import { MainActions } from '../../store/actions/mainActions';

import { Validators, FormBuilder } from '@angular/forms';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage({
  name: 'SignInModal',
  segment: 'signin'
})
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  public userInfo:Observable<any>;
  public authForm:any;
  public formType:string|null = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private store: Store<any>,
    private mainActions: MainActions,
    private _formBuilder: FormBuilder
  ) {
    this.userInfo = this.store.select((state:AppStateI) => state.auth)
    this.userInfo.subscribe(state=>{
      console.log(state)
      if(state){
        this.dismiss()
      }
    })
    this.authForm = this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
    });
  }

  ionViewDidLoad() {
  }

  showForm(type:string|null):void {
    console.log('showForm-> ', type)
    this.formType = type
  }

  onLogin():void {
    if (this.authForm.valid) {
      console.log(this.authForm.valid)
      this.store.dispatch(<Action>this.mainActions.login(this.authForm));
    }
  }
  onSignup():void {
    if (this.authForm.valid) {
      this.store.dispatch(<Action>this.mainActions.create_user(this.authForm));
    }
  }

  dismiss():void {
    this.viewCtrl.dismiss();
    this.store.dispatch(<Action>{type: 'CLOSE_MODAL', payload:null})
  }
}
