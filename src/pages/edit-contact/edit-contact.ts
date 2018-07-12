import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContactProvider, Contact } from '../../providers/contact/contact';

@IonicPage()
@Component({
  selector: 'page-edit-contact',
  templateUrl: 'edit-contact.html',
})
export class EditContactPage {

  model: Contact;
  key: string;

  constructor(
    public navCtrl: NavController
    , public navParams: NavParams
    , private toast: ToastController
    , private contactProvider: ContactProvider
  ) {

    if (this.navParams.data.contact && this.navParams.data.key) {
      this.model = this.navParams.data.contact;
      this.key = this.navParams.data.key;
    } else {
      this.model = new Contact();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditContactPage');
  }

  save() {
    this.saveContact()
      .then(() => {
        this.toast.create(
          {
            message: 'Contato salvo.'
            , duration: 3000
            , position: 'bottom'
          }
        ).present();
        this.navCtrl.pop();
      })
    .catch(() => {
      this.toast.create(
        {
          message: 'Erro ao salvar o contato.'
          , duration: 3000
          , position: 'bottom'
        }
      ).present();
    });
}

  private saveContact() {
  if (this.key) {
    return this.contactProvider.update(this.key, this.model);
  } else {
    return this.contactProvider.insert(this.model);
  }
}

}
