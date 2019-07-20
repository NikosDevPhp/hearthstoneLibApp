import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {

    private loader: HTMLIonLoadingElement;

    constructor(private loadingController: LoadingController) {}

        public async presentLoading(text: string) {
            this.loader = await this.loadingController.create({
                content: text,
                translucent: true
            });

            this.loader.present();
        }

        public dismissLoading() {
            if (this.loader) {
                this.loader.dismiss();
            }
        }
}
