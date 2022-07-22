import { CacheService } from './../../services/cache/cache.service';
import { environment } from 'src/environments/environment';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CrudService } from './../../services/crud/crud.service';
import { Injectable } from '@angular/core';
import { ScreenService } from 'src/app/services/screen/screen.service';
import { TranslateService } from 'src/app/services/translate/translate.service';
import { User } from 'src/app/interfaces/auth/user';

@Injectable()
export class UserClass {
  private userInfo: User;
  private userInfoEdit: User;
  private cachePath = environment.global.cachePath.users;
  private collection: AngularFirestoreCollection;
  private ref = environment.global.firebasePath.users;
  private interfaceRef: User;
  private anon = false;

  constructor(
    private crud: CrudService,
    private screen: ScreenService,
    private translate: TranslateService,
    private cache: CacheService
  ) {
    this.collection = this.crud.collectionConstructor(this.ref);
  }

  getAllHttp() {
    return new Promise((resolve) => {
      this.crud.getAll(this.collection).subscribe({
        next: (res) => {
          const result = res;
          // this.deleteAll(res);
          // this.fix();
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getHttp(id: string): Promise<any> {
    return new Promise((resolve) => {
      this.crud.get(this.collection, this.interfaceRef, id).subscribe({
        next: (res) => {
          const result = res;
          resolve(result);
        },
        error: (err) => {
          this.screen.presentToast(this.translate.verifyErrors(err.code));
        },
      });
    });
  }

  getCache(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .get(this.cachePath)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get() {
    return this.userInfo;
  }

  getEdit() {
    return this.userInfoEdit;
  }

  getAnon() {
    return this.anon;
  }

  setCache(value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache
        .set(this.cachePath, value)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  set(value) {
    this.userInfo = value;

    if (this.get() === undefined) {
      this.setAnon(true);
    } else {
      this.setAnon(false);
    }
  }

  setEdit(value) {
    this.userInfoEdit = value;
  }

  setPicture(value) {
    this.userInfoEdit.avatar = value;
  }

  reset() {
    this.userInfo = null;
  }

  resetEdit() {
    this.userInfoEdit = null;
  }

  deleteAll(res) {
    for (const a of res) {
      this.crud.delete(this.collection, a.id);
    }
  }

  fix() {
    let fixjson = [];
    fixjson.push(
      this.myPush(
        'fleck.julio@gmail.com',
        '14vxtg7H6gfklbtz6WyDJTrXj6S2',
        'Jun 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marcus.vrprestes@gmail.com',
        'KEbMk0odMlPDVXGHNrtz3aMSU7H3',
        'Jun 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'samuelprezzi@yahoo.com.br',
        'pvNY4NnrEEe5DsAAgVnN6hozyYa2',
        'Jun 22, 2022'
      )
    );

    fixjson.push(
      this.myPush(
        'mauriciokwt@gmail.com',
        'yPSP3G6BBKeN41b7xIqwImfVUZj1',
        'Jun 21, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'paulorodrigues052022@gmail.com',
        '6MWuD3ZNCXbhaZ2s7X2x8gTfaqk2',
        'Jun 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'kainadacruz64@gmail.com',
        '9WqTqie17kaTXseXMGyVthKoV0r1',
        'Jun 17, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'asachetrs@terra.com.br',
        'oinVg7OsfFS6xpi6h6u9wcTUoM53',
        'Jun 16, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gilmargoes1963@hotmail.com',
        'qzcJdQ76h5fXqaFj7mA7HV6RSXi1',
        'Jun 14, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gui.1000.cab@gmail.com',
        'bMmTx9QsPiZZ7SHAMvByEupP2Sp1',
        'Jun 14, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'wellisondornelescesam@gmail.com',
        'S0JYyiPeg6XMF1S4v21beOUE6Dh2',
        'Jun 13, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'sthefanysilveira419@gmail.com',
        'YwvviE3ouRRDZ5hMEINd2ab6Ep83',
        'Jun 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'tiago.puhl@marcopolo.com.br',
        'yotjSiOnZiUgPe9GG9TR8jNcKey2',
        'Jun 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fruteiragaucho94@gmail.com',
        '2Pe7oYHzsLSDeRLyeQX3je384i73',
        'Jun 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'camilacenterplastika@gmail.com',
        'CZPQEof4bdYpSur85J5DhPY5a9E2',
        'Jun 7, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gomerlato@uol.com.br',
        'j6k3EPhuCLTxRdUdLb4gFG2PN442',
        'Jun 6, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'maumaga64@yahoo.com.br',
        'rWGKBVNUdkML40VdSFCUt3dYt6C2',
        'Jun 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mcribeiro71@gmail.com',
        'rEcEn1AUutQejr0sYpkrxhSJjcy1',
        'Jun 4, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'julianojacobs@hotmail.com',
        'fwV4w1VXbdgNWJd7jBUHClZC8tC2',
        'Jun 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'lucasboeiracxs@gmail.com',
        'lucasboeiracxs@gmail.com',
        'May 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'carlos-rodrigues007@outlook.com',
        'HcTnmPU4RXcLQe0z5MV3YlzAmM43',
        'May 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'annuel25@hotmail.com',
        'fhm0xnhj5KSwYeTXzHT2UorkV5W2',
        'May 25, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alessandrobulow62@gmail.com',
        'yP5q0rYZ0wUIZYfo6HpImdX06DQ2',
        'May 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'eletronicavanzin@gmail.com',
        'WDel2IfE9rYv8UvpKvG4QpXNsLf1',
        'May 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'xuxaval@gmail.com',
        'c1udNexwExeTmC8rjaUFirQhHkt2',
        'May 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fabiojn1987@outlook.com',
        'O0Vtmm3uhrXbHJ9eBBP5BBxRiBo1',
        'May 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'herikporto8@gmail.com',
        'gowKY3GDwSW0td4731Y4xJIgqmM2',
        'May 21, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'sehbe@terra.com.br',
        'mhbToXA5EqXQHBKw9lA2alk5MR73',
        'May 21, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'foca1231lol@gmail.com',
        'HDnq59xAmrhyunr0a2wc6Ie1YpF3',
        'May 20, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'velhoassis@outlook.com',
        'Z6ppWr9kPTc3wLrqk1QuFKdrhrI2',
        'May 20, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mapereira1@ucs.br',
        'kGcCAP5DPOh6AnKKqTKYSNmzJNF3',
        'May 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'waguinhosul@hotmail.com',
        'OLmnV9bsUdbWNcuaNCAnUNLa4MG3',
        'May 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'wo757614@gmail.com',
        'zRwR1bIr4HWVYt3nxkta3Z1TQgL2',
        'May 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alissonveigaoliveira13@gmail.com',
        'wNYoBSyGUTgThLv3s5NQlDwYkX62',
        'May 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'paaaaaawww@gmail.com',
        'DZnYKtDE1QYRR4Oc62XL94AdB6T2',
        'May 16, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'andremazzaro@hotmail.com',
        '3hetvaPuAtN65PlOBEvEgRH5Lbp1',
        'May 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jevertonmorales@outlook.com',
        'Li9ZU0xyo5gmeDedptkD9TmEfBR2',
        'May 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'matheuswendeer@gmail.com',
        'tkcFYEyleXdTpZH1ibvGv769oRv1',
        'May 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'luanaduartefr@outlook.com',
        'xcGRYEYcfAb2llRbSCJaUdbrvA13',
        'May 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'isadora.braztumelero@gmail.com',
        '24aeCoaOqOcgeUoJF8L01Z10aDD3',
        'May 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'joelbruto24@gmail.com',
        'U8ERgYvkEPQEnPrjMsIbyza7sJh2',
        'May 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'dani_scur@hotmail.com',
        'ypNFX6WdTJOGq7wXHPYNqdc7EQJ2',
        'May 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'luquinhasgui.23@hotmail.com',
        'RtJ657xjUgMK7gf3oSDQrNpYXpW2',
        'May 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fslovatel@gmail.com',
        'rrLZRmeux0a6XYzfm8pAynWHPFL2',
        'May 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'denis_ulian@hotmail.com',
        'EX2k8pNg2XSApBo19uiLsYCluXC3',
        'May 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'vilmar_lima@hotmail.com',
        'k4ydjeYCZ5fUIlvjS6705bCGMeu2',
        'May 4, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'eliahucardoso@gmail.com',
        'Vyy0YwO6cRUfb9HOQC1QBXcFXlf2',
        'May 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'lasartori2005@gmail.com',
        'ZZNQfieP7lgLuwsu5dkmgYywYHr1',
        'May 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'kliperrafael@gmail.com',
        'qkM22W1nuTevLUlBA7BRQHv6Nk83',
        'May 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'filipebortolato2012@gmail.com',
        'LEsqBJA5K8bf5ZJh3tStMNmEvxY2',
        'May 1, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'raquelfiorentin1895@gmail.com',
        '5I16cVVslBdQSudu2uljalAhJ2Y2',
        'Apr 29, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'josecarlosgiasson1@gmail.com',
        'BN9UHQLCpXSaTy8OQD57fwO7Bco1',
        'Apr 29, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'niva.tochetto@terra.com.br',
        '6muDblM7zrQoqBogNxgNGmyjYp03',
        'Apr 28, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jordantonet@hotmail.com',
        'AeJpF4VYbOeIePGdS8sVv69fA1h2',
        'Apr 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'magiacomin@gmail.com',
        'kcJlLpi5V1OneO0WJ7UoNpipmIp2',
        'Apr 25, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'cristophertavares96@gmail.com',
        'wGpdUeRqclR1ic10RADDZUVWXr32',
        'Apr 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'sampars0404@gmail.com',
        'JjGXMjT5BNXM6AHkF1mT4jbpbDW2',
        'Apr 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'filipegianni@hotmail.com',
        '2VIbItNMnpguu1QHAL8ATbF5nHj1',
        'Apr 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'sandrobuzzetto@hotmail.com',
        'XpwnZkhCNWOEcSvINKISjt3Ej4j1',
        'Apr 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'nicolasdebrito57@gmail.com',
        'C8H4lGNwJfeoyhT6SKxJkVskg0f2',
        'Apr 21, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'leti.caberlon10@gmail.com',
        'sRrNzVP7YIXDDz6Zv7CGNvhWod33',
        'Apr 20, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marina.oliveirapr@gmail.com',
        'TcxIpy8L8zYC9YjjBgSgLLfaLN63',
        'Apr 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'novaskierika@gmail.com',
        'LsuckfdegDdlDh0uBrmEpjFGfqx1',
        'Apr 17, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'edsonlawrenz@gmail.com',
        'HSNJrJMvrxfz0EnyUt5yF3t5ys03',
        'Apr 16, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anghinonicati@hotmail.com',
        'm90S7xt2W1bP7axa3s5LK9MBjos2',
        'Apr 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'ady_cristina@hotmail.com',
        '9B6Uysa7HMbndj6ywrABCvE5TOm1',
        'Apr 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'xandipertile@gmail.com',
        'AJ4gsmFo2COySRrfIgVIQ2vC5wL2',
        'Apr 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'paulodemais@hotmail.com',
        'PqUO646sBaU32kugldCRrQxj51t2',
        'Apr 14, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'pegoraro.mo@gmail.com',
        'FLcvU2tPP1X0BzjHkar7g89lDDB3',
        'Apr 13, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'evellynmaciel82@gmail.com',
        '2AWErmiTMneSMHvSxNhNkmeqdWy2',
        'Apr 13, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mballardin@gmail.com',
        'HjrKlQ4dDcgmmSTPhwBlk9bASFU2',
        'Apr 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'andreluisrossetti@terra.com.br',
        'aRxzxz5bciY47G133CPrIhjHf832',
        'Apr 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rodolfo.lima@guentner.com',
        'P0wNtg2mJKc8gZVcj0SjPf8R4MP2',
        'Apr 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'neidecrocoli@hotmail.com',
        '3zuF740kAKPi6kdy6kkWaFahQDz1',
        'Apr 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'brunosebastiao30121991@gmail.com',
        'Cc04PxxpItUfmk4jkkBVbGb6S0L2',
        'Apr 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'ryanelvinocarvalho@hotmail.com',
        'Frm7eWu2xkYZlN7VqmwH5m4MeJ92',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'eliani@duroline.com.br',
        'FNPeuvf54QT5vc6Qtd85yzjnTLG2',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'tomazzoni@live.com',
        'v6rvcUnxS6VtUXvuoWg2fCcZrmm2',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'miguelfantinel@hotmail.com',
        'Y3PbDVh27QguoszLmIq55GalRJb2',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'theoglodo@gmail.com',
        'oKTFcI4lcldO1MrAW7UrwLlKcqv1',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'elvis-kullmann@hotmail.com',
        'PPBT69JtX6d2MbYKhNdgkZYwf5I3',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'daipur@yahoo.com.br',
        'rFliioie60fg8dPwctmv37d5BAi2',
        'Apr 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'joaobsouza164@gmail.com',
        '6AykjAMFOHfNznY0Gnn4tKbh3q83',
        'Apr 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'williamrezer20@gmail.com',
        'Sk4wb19akcSSBy2K8pom59PQ6xg2',
        'Apr 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mecanicaribeirofr@hotmail.com',
        'H6OJktNUPwhlDSDtRoHL3HP0iT83',
        'Apr 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marculan94@gmail.com',
        'sUx0YEAdpwNIxGmVlw6aW10iy5h2',
        'Apr 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rafael-zanetti9@hotmail.com',
        'dmef77pB75eYv1eTDK0tf9g9Zaz2',
        'Apr 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rafael.reis@grupopardini.com.br',
        'rgC3BH4HbvQ2k6YFCYTT63s3xMG3',
        'Apr 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'andersondasilvapereramvj@gmail.com',
        '5D1hfoWpvdVXd7WzKnLyYnaseFT2',
        'Apr 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alexandre@arotecnologia.inf.br',
        'qOlOw2lK6gdxdjbEJ9jdDakBzrv2',
        'Apr 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'maubeuter@hotmail.com',
        'dJlYQ7WlfxasDN5vDx8394GP1ek1',
        'Apr 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'roni.martins1@gmail.com',
        'mC0RBOM5zzT0bzYItSulRQrAXYC2',
        'Apr 4, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'williands_santos@hotmail.com',
        'wmHFbVA9YnOkxFsNNrwdxdGxwsq1',
        'Apr 4, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'moveisobraprima@gmail.com',
        'JszWHX5ov4cnj22J0vB0iqAj7Im2',
        'Apr 4, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'nestortormen@gmail.com',
        'qurOWusEM9h8oV13gBsxk3R5Ho13',
        'Apr 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'adriano.valar@gmail.com',
        'b4xxxgnKXQbV4bzG5DfAWtW4Idm2',
        'Apr 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'tiago.dalmoro@gmail.com',
        'sjoo55MbeqdfZx5VarbKxoBe2OP2',
        'Apr 2, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'leonardo_benini@hotmail.com',
        'SXkLs3aq2LhFxC0fYvJ8GnipDW82',
        'Mar 31, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'vitinhomarti2006@gmail.com',
        'VsEbwSENqHObCm9dgtGACyJFk1i1',
        'Mar 31, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'wesley050998@gmail.com',
        'z6yUrLZlYGdWvRRLs7VVKC2j2dI3',
        'Mar 29, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'henriqueberteli81@gmail.com',
        'TR2BzBBr22eGaWdTUCTfBEWgRLE3',
        'Mar 29, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marcelosilveira210685@gmail.com',
        'gqkng1OjjXROp5pnUBnM5PUBNQY2',
        'Mar 25, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'diegogass16@gmail.com',
        'dDhfTqkHgrPIGzD9y5l7LndapTv2',
        'Mar 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'dpaim7402@gmail.com',
        'xf33FnGfzMdUoisdmjpFy0dBRJ62',
        'Mar 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'emersonkemerich3@gmail.com',
        'ZbeZflRKZEWlybuigk4g34q7slS2',
        'Mar 22, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'amonguspaia@gmail.com',
        '3CaVaEhiFPNjH8QKP5R5RqDXjkN2',
        'Mar 18, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jiloff82@gmail.com',
        '5oGsH9AMDFTCfbSjd0twhlPji5i1',
        'Mar 18, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anderson_hofmman@hotmail.com',
        'T4QecMmphYgXTvRVBvCQj3uBQW43',
        'Mar 17, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'barbozo12lorenzo@gmail.com',
        'iSVXE52IDuPNo5bfT8280psJFU22',
        'Mar 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'dalmagrolucas297@gmail.com',
        'NwE0R0VshgdaDKWhuA6wSm1Uqjv1',
        'Mar 7, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'cleberperuzzo.79@hotmail.com.br',
        '6YrDccSGVjaq0julkfU9rlMT91E2',
        'Mar 7, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'delvissimioni@hotmail.com',
        'ZGtKsJocY8OyiHNBr93Cdc9M9oF3',
        'Mar 6, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marcela_mattia@hotmail.com',
        'u8C1w4n2n0PVSG2tL1d9cNLIIak2',
        'Mar 6, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'silverioschneider11@gmail.com',
        'qaJVw5a8khfJZfxinAupFX0rz933',
        'Mar 6, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'brunosebastiao30121991',
        'dZnG1vpbUgZ7LrjOipBGIuKc0L02',
        'Mar 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marinabzancanaro@gmail.com',
        'qPxWRNhf4weFhUXJHhO4DsUQKBL2',
        'Mar 2, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'santos.jlb@gmail.com',
        'eCrIEvz2UFemfihWfGKm7ToQdm53',
        'Mar 2, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'branchinirafael@hotmail.com',
        'JCDuxsSmTWg4jegDRIyv9zSdwsb2',
        'Mar 1, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rodrigo.zimmermann@yahoo.com.br',
        'WyfHcyf8EiUfiwrcv2ZZg7PhGKs2',
        'Mar 1, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'lucashpaulino@icloud.com',
        'Tpi8N4Vk1YRBJThAReJzmiy6vuS2',
        'Mar 1, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'horacio.santini@gmail.com',
        'vAlIaWhBT3ap27k7Efn8edJ1IZj1',
        'Feb 28, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jjcassanego@hotmail.com',
        'gWh10pToeoRzNuIHLdJRKZbp15y1',
        'Feb 27, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'andvickmartins@gmail.com',
        'VYRSj0c25pNGmvdojdDfkkmKuA22',
        'Feb 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'kelvinluiz484@gmail.com',
        'LrdON4yGpYNoEWWKsF76d4mbRci1',
        'Feb 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'maurokoppe1412@gmail.com',
        '33UoEoBEIgcToq4wRUmYWz9ZHj03',
        'Feb 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'luiz59oliveira@hotmail.com',
        '2xVw1ef98ognC2bq08uJ3m1GY0W2',
        'Feb 25, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'volmir@itair.com.br',
        'Uw49lDVhxpX0G0mBmnocHuln9OJ3',
        'Feb 25, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fbegliardi1977@gmail.com',
        'WSEseL5Oe5Y0GwEQ09Z6VeukT0p2',
        'Feb 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'juniorvicenzi@gmail.com',
        '354lia5NwxVSkpQlgcLo8Mk7Nv52',
        'Feb 23, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'buckelsadi@gmail.com',
        'Ftn3UrMu9TbxDdlPztm3uTwmkJV2',
        'Feb 20, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jungles.serafini@gmail.com',
        'Nv9g7YF1dzQVa0Pjmh3gC8gED452',
        'Feb 17, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'lorenzobmascia01@gmail.com',
        '9MQhvyDe96PmSn75RHZ6XgtgwSv1',
        'Feb 16, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'stevan1913@gmail.com',
        '63ZcheByWsMgtu3KX9U8qpsOzbi1',
        'Feb 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anderboppsin@gmail.com',
        'wM9elko5C8XP03UJNUM6hxVwLFo2',
        'Feb 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'riquelmesgoncalves@gmail.com',
        'sxgETxhvSZOin21ofpuHAMZFoaW2',
        'Feb 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'juliano_bobi@hotmail.com',
        '2X4WMELBWsci2TCthcV2fBHK8k42',
        'Feb 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'hikepadilha12@gmail.com',
        'mildJCGknAgkiCVkChfyUUmlh1D2',
        'Feb 15, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anderson.re9@gmail.com',
        'Q8Ryom3xjqMk6aFmzcaHmAOHtcp1',
        'Feb 14, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'bruformolos@hotmail.com',
        'iDDf3BmuuuR9JY5mteRziMF9iEr1',
        'Feb 14, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'tuanystedile@outook.com',
        'wdbVWM28HeObrTldD8WJZilFDLw1',
        'Feb 13, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mader436@gmail.com',
        'I2kvcNDaS5ZxI5ucgTAXVuhLy3n1',
        'Feb 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fpossa08@gmail.com',
        'i5EKfJdxjkdyM5JfJOEj8AWJ5n42',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anacaldart@icloud.com',
        'ly79YeBtEcMKHIloOzsfJ0MsoWx1',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rodrigossantos1913@gmail.com',
        'fSFx3QP8UGa4w83IQQGG6yLDHvG3',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'caroline_mvj@hotmail.com',
        'n3qxskxmVmZucJnjL3aQhKyjHLg2',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alberto.sakata@hotmail.com',
        'KKNsg5vpoFfPSH8Yz93Qx8WItzm2',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'deiglianegaieski@gmail.com',
        '3eWdlanGI4Zabd2B4EVzmshVHZH2',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'zattievargasltda@hotmail.com',
        'dDx5hXHKcRMURh5roZl1RJYLrUF2',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'diego_feliciano@hotmail.com',
        'cakF5WwVCaPVxfGlQMYUj5uFNq12',
        'Feb 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'juventude1991a@gmail.com',
        'qLRzWZM4iuegFITbV3yeWcwxQcC2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'vande.conte@hotmail.com',
        'AMtu7C4mJIU2yC8UmZJVnBrMRDI3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'viriamancha@gmail.com',
        '5ibDWEwit7Z3jv0kaqGyW5W8ENT2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'taiscoelli1913@gmail.com',
        'B5SKRVqfXTMlsfTFeTvSbsZr4e32',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'carlosborges023@gmail.com',
        'MHt4oT5szDPRcaRyYAAWSXmP1KN2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jesusdecoracoesgesso@hotmail.com',
        'BlKLvXIFjdMEMAsTfQ8WxPNvXgf2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'adri28klaumann@gmail.com',
        'MfiZNoe3YsUllVaVmasvBEtP6s63',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'evanesmmartinelli1965@gmail.com',
        'qXlHDjCmHYc244tIYyG4NP8EKeD2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'isadoratg@hotmail.com',
        'd89VO8zcyvetJmUhH3UPpSgOfxv2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'luandrorech2@gmail.com',
        'NVEPTOpBozS2gsda9cujfvDkF9R2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alexandreoliveira1913@gmail.com',
        'tY0AASae5XObNgnmGwThLzuWjml1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'taii.forlin14@gmail.com',
        '7ravPTDVL6fbi84vDlU2onDjveW2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'simoneselaub@gmail.com',
        '4H1qPfwnibUhpi4mtyiBsxrLYUE3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mauro1033@hotmail.com',
        '828UUXFfY7RIlROGqwZmnSZGFCO2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'kalvendacosta90@hotmail.com',
        'FeqYqJOsXfMdFUsCVCV2eLnYe9j2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'willdafazer@gmail.com',
        'vHEZY6Brh0NTT8BrcUl1LvQGfyJ3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gui_moicano2004@live.com',
        'IwUOryBtvjcGf8rPDEWHNnyZyCO2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marqueskassiano95@gmail.com',
        'YohGgvnLGlWljwlpkceLCJbFjGH2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'ninepavan@gmail.com',
        'rGaxhnFAQTTyE10zRfnQl69r6DC2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'brayan_fontana@hotmail.com',
        'JUYovX3W2MYWPmPWsPKzrN9HCqE2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jcarbonerajc@gmail.com',
        'dowsh4oWSwVX2f3LR32GaWSV8DN2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'andersonsilva.pacheco@gmail.com',
        'a9G8Ndm5cJRzuN4TFvUnL3uf5i93',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'joaozinhoszn@gmail.com',
        'ixYDWvcoMMbTw5UKyVRUcYrceEP2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'everton-terres@hotmail.com',
        'KnyvMleavmUoIDaCSzKACtEjIB23',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gilmarcampanholo5@gmail.com',
        'h4jnrKi4RrVG29RllmxyQks4OXs2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jeferson.maffer@bol.com.br',
        'NdDPPgEsVqbgDuULSDX639NCSC83',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gabriel.dallomo10@gmail.com',
        'xwbi9JsL8MbIKP9x5S1P4SDjPZy2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'eaperuchin@gmail.com',
        'gSHV4ObLwHd5wg6EQiw53S6wco72',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'paatiw@outlook.com',
        'g0Vp8Bs6GFSnsIThrhQdrHrsnYo1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mateustrentin1@gmail.com',
        'Po5OJ5bPUzceCjGITmiNhuB0uNt2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gerocisimioni41@gmail.com',
        '0XNfGAgcdhTEhzo6BbNZv1yKas03',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'capellinimichael@gmail.com',
        'ZLyUavnAYFZWhKB0dLmuJpA9mtq1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fabiio.martinelli@gmail.com',
        'uB4MiGvnZjbqSb7acR3BkrvhJ5h1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'cmoncani@gmail.com',
        'sTo7kfe6X6SOqzUfmcljNAZYYNm2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gilmarkaiper@yahoo.com.br',
        'DOiWNM53BBVBkOXvlIciDWTSB832',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'vinicius_konrath@hotmail.com',
        'L3Akc5F1CpRZDRlu6gQiCTfn9hq2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'allceuvieira@icloud.com',
        'cEUKpBU9M4XGIN8DRUqZrHljYzU2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'miguelmarcon89@gmail.com',
        'aPQrHc0Y8CRnV2IYKAUBOO1XovH3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'guimattos1311@gmail.com',
        'jMTACoHKNDVZVSgB62W782hWGJ92',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'bordinmanu77@gmail.com',
        'NIH0LXn1EbZmYCDevRmcUeomD2y1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anderson.rauch@gmail.com',
        'bSL6uS1mWadLuFsxYPPJGdLZEaT2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'matheusfrosidebrittto@gmail.com',
        'EwXImIEZdbMZVbNsYbrqXK56eRw1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'buenodelfino@gmail.com',
        'Vc5O0ix3g0ZKPyzlBqxsxtKxHpQ2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'atacadaodamoda18@gmail.com',
        'OxqUrlaIX9eAWcWxQuVNfRx8Bb03',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'veri.gabrielli@gmail.com',
        'PvYbNrAhdhchjXgY0QkvUZF5tJ23',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'vilnei.pimmel@bol.com.br',
        'EzWDFc97nPV2GORTu8NyYWzN6Nk1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'renaan1913@gmail.com',
        '7PS3qVbm9Laii2frn1Bvk7blwRs1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'geissondeon159@gmail.com',
        '3CAYHVOgB2YuGDWjf1WgDYOCLqz2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mbitelbron@yahoo.com.br',
        'EEz9LUhoC6dNwEhrwTem6U9MrAD3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'dalmorojuliana@gmail.com',
        '7sn8Ywi2DcTwAWmdwBb8GrqRGvt1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'mectonezer@gmail.com',
        'WJzSSKoNekaQk8SqnLVaUZ0y5Ij1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'lucas.moschen@live.com',
        '3Q89Xs2VUXP906gaDUF5ZOaMXa32',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fabinho1992.fr@gmail.com',
        'Ycjv5oKQUEc1KnlUJBTJywRX5zp2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'caali.b@hotmail.com',
        'Qetk8dE8PGcA0gSfJvG83DSSyUf2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'eduardo@visaocont.com.br',
        'u4AWjp2exZYoGUsmTZnLJvJWoCK2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'ldjacobi1975@gmail.com',
        'kbeG571i6LeXAndtw2gXRIfzXeI3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fernandostasimartini@gmail.com',
        'eh55BO8X8EQdWKVC5sywmXArHlI2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'anderjaconero1@gmail.com',
        '2hlTXU4MMDf5INGvbazEMs39Elm1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'frankiel_m@hotmail.com',
        'b7wzNwPFSPcPnX2EITlha0XN7vZ2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'claudio1508@yahoo.com',
        'CYs30eQOlgQjZRbvBq2l97WEDUH3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alex.boff@yahoo.com.br',
        'YLMqvZYwh5WTIdiASfjcNlChoUS2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'alexgilmardelima@gmail.com',
        'GZoZ8RTS7edshrxB4I5EBhQkK0x2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'emer.denis@gmail.com',
        'DwBwxE6dTRdytyGZRz3DTHWAsY83',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'andersonmoschen97@gmail.com',
        '7GXlArafLNX1gm8LYXdEtefemhV2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'cacaballestro@gmail.com',
        'qAlBHdfnlNZS2ZQxJCJkJAbPl8y1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jonatanpontin@gmail.com',
        'qjqmK5JSXkQxqJPccNPdsbNgoXl1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'daniel.bio@gmail.com',
        'kHE2Hvw6JXeaI5oomIZLVFzNvs72',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'raul.casla@hotmail.com',
        'zvpUJmr9g9PFioBJonJ6LHXup8a2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'loisboff@gmail.com',
        'ClVt0t0meMeDUbx6MELQrxm9CjB3',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gustavo-juventude@hotmail.com',
        'WaK0yzVwwhPzBRNzHlVoHfFj7Ru2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'beeto-f@hotmail.com',
        'ZvbD6xDSyQaAdpU1wwsltltURNo2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'dalton_bene@hotmail.com',
        'IlwGkKNdwah5Svdm9QEpPQJ4PMo1',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'filipeconcer@gmail.com',
        'kBw6vM9HeNeRqX7zFuZviTcqesQ2',
        'Feb 9, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'edupescefilho@gmail.com',
        'on83M4KH5AQ50RNr6Z7xdPM9UnZ2',
        'Feb 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jeverson_facchin@hotmail.com',
        'l9Ir48lHhwUOh1sJPfRGf8xK2Q12',
        'Feb 8, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'pollyanna.spido@yahoo.com.br',
        'IgW0zjKSEHPYyGQk92eWzMBwbyy2',
        'Feb 7, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'juliabmachado@yahoo.com',
        'tMb75KeWjGVPVm1rtUH5bljnYG72',
        'Feb 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'paulo.oleias@hotmais.com',
        'YDlGPk4HqUeATwFAqhccstis1pi1',
        'Feb 5, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'madu12luz@icloud.com',
        'PhRi7iZLEnemn5n3UrEPZnqJjHh2',
        'Feb 4, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gabiibrando93@gmail.com',
        'nYc0wO3VUQOUxGqXeD7WrWVqfR62',
        'Feb 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'tadiotto2000@juventude.com.br',
        '1t4nv5yzUdWi3CIvcbgbcxp88iE2',
        'Feb 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'bruno_zaballa@hotmail.com',
        'OPInsgVulJN5D8ADysegbDSbFx53',
        'Feb 2, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fpizetta@gmail.com',
        'lC47OXrVh4TldfNdOYO4ZIfHAGA3',
        'Feb 2, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rodrigoperochin@gmail.com',
        'npv2f76sW9W3Gmb0KxRcSo1JBew2',
        'Feb 1, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'tzattera@tecnimig.com.br',
        '1buPhbZOhvUhlmkUiz8WGFqnJl03',
        'Jan 31, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'judessanti@hotmail.com',
        'rtoxEmLqg9fTL2CTzlK5Ge9BsjJ2',
        'Jan 31, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'fabio@efficienza.com.br',
        'rhR7CeNY0gYSWtNWPWuTauDyJpH3',
        'Jan 31, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'czattera@hotmail.com',
        '0e79CyxbowgcfrjNxtAmkO5fiLk1',
        'Jan 29, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'cristophertavares2@gmail.com',
        '13iAZINft6P3fuyIptD5x0BwdXk2',
        'Jan 27, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'dinhomvdiretoria@hotmail.com',
        'RZ8G7z3lO5V9bBxSUhF29ziNIsy2',
        'Jan 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'bragachicon@gmail.com',
        'ZRecNuFm3re69AnqHdNtowzQjcZ2',
        'Jan 26, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jp.ribeiro.silva98@gmail.com',
        'vIYJMRjlkmX6szlrZkXoavfee6n2',
        'Jan 25, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'infobastos@yahoo.com.br',
        '8Lu0GDDhAqYnhRjDOcPwcjZGjEe2',
        'Jan 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'lilijuchem@hotmail.com',
        'pjpffPEnxKfWRvptxFHysJE6otH2',
        'Jan 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'max.hennicka@gmail.com',
        'HHR9kaMfWTgaP422BU6ZvvM6NqT2',
        'Jan 24, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'filipekloss@gmail.com',
        'VPthzZjWXnXqAplJ2Dcs65rylEJ2',
        'Jan 22, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'camargodesene@gmail.com',
        '6FzYAs7BEhe4QAwgq0b5XtotoUh1',
        'Jan 21, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'rodrigocesardecamargoc@gmail.com',
        'VuRuQMb0NfSx1QBsiBbn6CYEJMy2',
        'Jan 21, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'marketing@juventude.com.br',
        'HkHXC4XaqpPgfI9MaKXxlUIbVHD2',
        'Jan 20, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'ramonvicenzi@hotmail.com',
        'MT93KzXgJxhV42228pdvKztQZGT2',
        'Jan 19, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'wellisondornelescesam@gmail.co',
        '0PkbzySlc1Rv6sJSa6AYiGxtwrr1',
        'Jan 18, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'reinaldooliveirars23@gmail.com',
        'mMuFUH4nBQO3Y7G2v5q1IeRVJGz2',
        'Jan 14, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'cstahlschmidt@hotmail.com',
        'H753tRe81vTaK7qdOjNlnYzaubx1',
        'Jan 12, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'borgesramon715@gmail.com',
        'PZYe4FKehKffPzbuOLwCiIpUvj73',
        'Jan 11, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gumaeski@gmail.com',
        '5ekOonHR0cZY94pWxm7Pjy1DuHO2',
        'Jan 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'gabrielcoracinidesouza@gmail.com',
        'AkStLEdSTmO3S60psleXcj4wP8k2',
        'Jan 10, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'guilhermeborba1010@gmai.com',
        'BrvgXU51DlTHLPYCrvIR6XSqHJK2',
        'Jan 7, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'arthurantoniodeaguiarmacedo',
        'W33TZoUYrjSIGykgmgUrMR9HZty2',
        'Jan 3, 2022'
      )
    );
    fixjson.push(
      this.myPush(
        'jose.bonfada.jr@hotmail.com',
        'KldYakc8oYcXKNlInxZJG5UCdhm2',
        'Dec 28, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'lazaroruan2609@gmail.com',
        'ZP8FFngiO2WymOgL1Mm82XsDYax2',
        'Dec 27, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'romualdowagner@gmail.com',
        'JuQFqZYo4cMcauR7FDFXbhBb23b2',
        'Dec 26, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'schiavolorenzo9@gmail.com',
        'zyBq6RzXdWZAHx0mvBpP0Kj0IXi2',
        'Dec 24, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'josenobrek@outlook.com',
        'nL7sdta7TRNRc6XrHlCYKX3frSP2',
        'Dec 22, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'rafinhatome@gmail.com',
        'ncZLnc5oQ5NnupcWC3kMZvjjxuU2',
        'Dec 13, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'test@test.com',
        'bEqwBETEd1M1udon5MsswwYKgP52',
        'Dec 13, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'carlanecuca@yahoo.com.br',
        'CmKIlJniBddIRXDWIRzMz6nlYJn2',
        'Oct 28, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'apdalleg@gmail.com',
        'qbR9wNr0QqfIuJ1gjWsH2BVRzJK2',
        'Oct 26, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'gabrint@hotmail.com',
        'r5LE7BHocRPhfWJwBoaEAwUVaZL2',
        'Oct 26, 2021'
      )
    );
    fixjson.push(
      this.myPush(
        'renan-martins-gouvea@hotmail.com',
        'gPDtdxnxSUf5URQioVNpOPBlHA93',
        'Oct 23, 2021'
      )
    );
    for (const a of fixjson) {
      const user: User = {
        userId: a.id,
        userEmail: a.email,
        userCreatedAt: a.createdAt,
      };
      this.add(user, a.id);
    }
  }

  myPush(email, id, date) {
    return {
      email,
      id,
      createdAt: Date.parse(date),
    };
  }

  setClass(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.getCache().then((cache) => {
        if (!cache) {
          this.getHttp(id)
            .then((http) => {
              this.set(http);
              this.setEdit(http);
              this.setCache(http);
              resolve(http);
            })
            .catch((err) => {
              console.warn(err);
              reject(err);
            });
        } else {
          this.getHttp(id)
            .then((http) => {
              this.set(http);
              this.setEdit(http);
              this.setCache(http);
              resolve(http);
            })
            .catch(() => {
              console.warn('Failed to update');
              resolve(cache);
            });
        }
      });
    });
  }

  add(user: User, id: string, withDate = true) {
    if (withDate) {
      user.userCreatedAt = Date.now();
    }
    this.crud.addUser(this.collection, user, id);
  }

  update(user: User): Promise<any> {
    console.log(user);
    return new Promise((resolve, reject) => {
      this.crud
        .update(this.collection, user, user.userId)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  setAnon(bool) {
    if (bool) {
      this.userInfo = {
        userEmail: 'Venha fazer parte da Papada!',
        userName: 'Usuário anônimo',
      };
    }
    this.anon = bool;
    console.log('anon - ', bool);
  }

  updateSocioInfo(socioInfo) {
    this.userInfo.status = socioInfo.status;
    if (socioInfo.contrato) {
      this.userInfo.ultimoContrato = socioInfo.contrato;
    }
  }
}
